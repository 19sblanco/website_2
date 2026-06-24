#!/usr/bin/env bash
# One-time GCP bootstrap for Cloud Run deployment.
# Run from a machine with gcloud installed and billing enabled on the project.
#
# Usage:
#   export GCP_PROJECT_ID=your-project
#   export GCP_REGION=us-central1
#   export GITHUB_REPO=owner/repo   # e.g. slanco2465/2.0_website
#   bash scripts/gcp-bootstrap.sh
#
# After bootstrap, add these GitHub repository secrets:
#   GCP_PROJECT_ID, GCP_REGION, GCP_WORKLOAD_IDENTITY_PROVIDER, GCP_SERVICE_ACCOUNT, CLOUDSQL_INSTANCE

set -euo pipefail

: "${GCP_PROJECT_ID:?Set GCP_PROJECT_ID}"
: "${GCP_REGION:=us-central1}"
: "${GITHUB_REPO:?Set GITHUB_REPO (owner/repo)}"
: "${ARTIFACT_REPO:=portfolio}"
: "${CLOUDSQL_INSTANCE_NAME:=portfolio-mysql}"

PROJECT_NUMBER=$(gcloud projects describe "$GCP_PROJECT_ID" --format='value(projectNumber)')
DEPLOYER_SA="github-deployer@${GCP_PROJECT_ID}.iam.gserviceaccount.com"
BACKEND_SA="portfolio-backend@${GCP_PROJECT_ID}.iam.gserviceaccount.com"
FRONTEND_SA="portfolio-frontend@${GCP_PROJECT_ID}.iam.gserviceaccount.com"
WIF_POOL="github-pool"
WIF_PROVIDER="github-provider"
REGISTRY="${GCP_REGION}-docker.pkg.dev/${GCP_PROJECT_ID}/${ARTIFACT_REPO}"

echo "==> Enabling APIs"
gcloud services enable \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  sqladmin.googleapis.com \
  secretmanager.googleapis.com \
  iam.googleapis.com \
  iamcredentials.googleapis.com \
  --project="$GCP_PROJECT_ID"

echo "==> Creating Artifact Registry repository"
gcloud artifacts repositories create "$ARTIFACT_REPO" \
  --repository-format=docker \
  --location="$GCP_REGION" \
  --project="$GCP_PROJECT_ID" \
  2>/dev/null || echo "Artifact Registry repo already exists"

echo "==> Creating service accounts"
for SA in "$DEPLOYER_SA" "$BACKEND_SA" "$FRONTEND_SA"; do
  gcloud iam service-accounts create "${SA%%@*}" \
    --project="$GCP_PROJECT_ID" \
    2>/dev/null || echo "Service account ${SA%%@*} already exists"
done

echo "==> Granting deployer roles"
for ROLE in roles/run.admin roles/artifactregistry.writer roles/iam.serviceAccountUser roles/cloudsql.client; do
  gcloud projects add-iam-policy-binding "$GCP_PROJECT_ID" \
    --member="serviceAccount:$DEPLOYER_SA" \
    --role="$ROLE" \
    --quiet
done

echo "==> Creating Cloud SQL instance (may take several minutes)"
gcloud sql instances create "$CLOUDSQL_INSTANCE_NAME" \
  --database-version=MYSQL_8_0 \
  --tier=db-f1-micro \
  --region="$GCP_REGION" \
  --project="$GCP_PROJECT_ID" \
  2>/dev/null || echo "Cloud SQL instance already exists"

gcloud sql databases create portfolio \
  --instance="$CLOUDSQL_INSTANCE_NAME" \
  --project="$GCP_PROJECT_ID" \
  2>/dev/null || echo "Database portfolio already exists"

DB_PASSWORD="${DB_PASSWORD:-$(openssl rand -base64 24)}"
gcloud sql users create appuser \
  --instance="$CLOUDSQL_INSTANCE_NAME" \
  --password="$DB_PASSWORD" \
  --project="$GCP_PROJECT_ID" \
  2>/dev/null || echo "User appuser already exists (password not rotated)"

CLOUDSQL_CONNECTION="${GCP_PROJECT_ID}:${GCP_REGION}:${CLOUDSQL_INSTANCE_NAME}"
CONNECTION_STRING="Server=/cloudsql/${CLOUDSQL_CONNECTION};Database=portfolio;Uid=appuser;Pwd=${DB_PASSWORD}"

echo "==> Storing secrets in Secret Manager"
echo -n "$CONNECTION_STRING" | gcloud secrets create db-connection \
  --data-file=- \
  --project="$GCP_PROJECT_ID" \
  2>/dev/null || echo -n "$CONNECTION_STRING" | gcloud secrets versions add db-connection --data-file=-

for SECRET in contact-email-password contact-email-username; do
  gcloud secrets create "$SECRET" \
    --replication-policy=automatic \
    --project="$GCP_PROJECT_ID" \
    2>/dev/null || true
  echo -n "REPLACE_ME" | gcloud secrets versions add "$SECRET" --data-file=- 2>/dev/null || true
done

echo "==> Granting backend SA Cloud SQL and secret access"
gcloud projects add-iam-policy-binding "$GCP_PROJECT_ID" \
  --member="serviceAccount:$BACKEND_SA" \
  --role="roles/cloudsql.client" \
  --quiet

for SECRET in db-connection contact-email-password contact-email-username; do
  gcloud secrets add-iam-policy-binding "$SECRET" \
    --member="serviceAccount:$BACKEND_SA" \
    --role="roles/secretmanager.secretAccessor" \
    --project="$GCP_PROJECT_ID" \
    --quiet
done

echo "==> Setting up Workload Identity Federation for GitHub Actions"
gcloud iam workload-identity-pools create "$WIF_POOL" \
  --location=global \
  --display-name="GitHub Actions" \
  --project="$GCP_PROJECT_ID" \
  2>/dev/null || echo "WIF pool already exists"

gcloud iam workload-identity-pools providers create-oidc "$WIF_PROVIDER" \
  --location=global \
  --workload-identity-pool="$WIF_POOL" \
  --display-name="GitHub" \
  --issuer-uri="https://token.actions.githubusercontent.com" \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository" \
  --attribute-condition="assertion.repository=='${GITHUB_REPO}'" \
  --project="$GCP_PROJECT_ID" \
  2>/dev/null || echo "WIF provider already exists"

WIF_PROVIDER_ID="projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${WIF_POOL}/providers/${WIF_PROVIDER}"

gcloud iam service-accounts add-iam-policy-binding "$DEPLOYER_SA" \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${WIF_POOL}/attribute.repository/${GITHUB_REPO}" \
  --project="$GCP_PROJECT_ID" \
  --quiet

echo ""
echo "Bootstrap complete."
echo ""
echo "Add these GitHub repository secrets:"
echo "  GCP_PROJECT_ID=$GCP_PROJECT_ID"
echo "  GCP_REGION=$GCP_REGION"
echo "  GCP_WORKLOAD_IDENTITY_PROVIDER=$WIF_PROVIDER_ID"
echo "  GCP_SERVICE_ACCOUNT=$DEPLOYER_SA"
echo "  CLOUDSQL_INSTANCE=$CLOUDSQL_CONNECTION"
echo ""
echo "Artifact Registry: $REGISTRY"
echo "Cloud SQL connection: $CLOUDSQL_CONNECTION"
echo ""
echo "Update Secret Manager values for contact-email-* before production use."
echo "Deploy by pushing to main (after CI passes) or run the deploy workflow manually."
