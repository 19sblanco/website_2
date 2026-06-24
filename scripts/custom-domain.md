# Custom domain mapping (frontend only)

Map a public domain to the **portfolio-frontend** Cloud Run service after the first deploy.

## Prerequisites

- Domain verified in Google Cloud ([Search Console](https://search.google.com/search-console) or Cloud Domains).
- Frontend service deployed and healthy.

## Steps

1. Create the domain mapping:

```bash
gcloud run domain-mappings create \
  --service portfolio-frontend \
  --domain www.example.com \
  --region REGION \
  --project PROJECT_ID
```

2. Read the required DNS records:

```bash
gcloud run domain-mappings describe \
  --domain www.example.com \
  --region REGION \
  --project PROJECT_ID
```

3. Add the CNAME or A records at your DNS provider as shown in the command output.

4. Wait for certificate provisioning (typically 15–30 minutes). Mapping status becomes `Ready` when TLS is active.

## Notes

- Only the **frontend** service needs a custom domain. The backend stays private on its `*.run.app` URL.
- Root apex domains (`example.com` without `www`) may require A/AAAA records instead of CNAME; follow the records Google provides.
- No backend DNS or certificate changes are required.
