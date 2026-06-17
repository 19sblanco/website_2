---
name: fix-gh-workflow
description: >-
  Investigates recent GitHub Actions CI failures, fixes the root cause, validates
  with Makefile targets, and recommends manual testing. Use when CI is failing,
  GitHub workflow errors need fixing, "fix the build", "fix CI", or the user
  references a failed GitHub Actions run.
---

# Fix GitHub Workflow Failure

End-to-end workflow: find the latest CI failure → fix → validate locally → recommend manual testing.

Work inside the **Dev Container**. Use the **Makefile** as the source of truth (`make help`).

## CI layout

| GitHub job | Workflow file | Local equivalent |
|------------|---------------|------------------|
| `frontend` | `.github/workflows/test.yml` | `make verify-frontend` then `make test-frontend` |
| `backend`  | `.github/workflows/test.yml` | `make verify-backend` then `make test-backend` |

CI does **not** run e2e; use `make test-e2e` only when the fix touches user flows worth browser coverage.

```
Task Progress:
- [ ] Step 1: Find the recent failure
- [ ] Step 2: Diagnose root cause
- [ ] Step 3: Implement fix
- [ ] Step 4: Validate with Makefile
- [ ] Step 5: Recommend manual testing
```

## Step 1: Find the recent failure

Use `gh` against `origin` (repo: `19sblanco/website_2`).

```bash
# Recent workflow runs (failures first)
gh run list --repo 19sblanco/website_2 --limit 10

# Failed run details + which job/step broke
gh run view <RUN_ID> --repo 19sblanco/website_2

# Failed step logs only (primary evidence)
gh run view <RUN_ID> --repo 19sblanco/website_2 --log-failed
```

If the user gave a PR or branch, scope to it:

```bash
gh pr checks <PR_NUMBER> --repo 19sblanco/website_2
gh run list --repo 19sblanco/website_2 --branch <BRANCH> --limit 5
```

**If `gh` is missing:** install it or open the Actions tab on GitHub and paste the failed log. Do not guess the failure — read the actual error output.

Record before fixing:
- Run URL / run ID
- Failed job (`frontend` or `backend`)
- Failed step name
- First actionable error line (file, line number, assertion, or command exit code)

## Step 2: Diagnose root cause

Map the failed CI step to local commands and reproduce:

| CI step | Reproduce locally |
|---------|-------------------|
| `npm run format:check` | `make format-frontend` (auto-fix), then re-run verify |
| `npm run lint` | `make lint-frontend` |
| `npm run build` | `make build-frontend` |
| `npm run unit` | `make test-frontend` |
| `dotnet format --verify-no-changes` | `make format-backend` (auto-fix), then re-run verify |
| `dotnet build` | `make build-backend` |
| `dotnet test` | `make test-backend` |

Read the failing test or build output. Identify whether the failure is:
- **Regression in app code** — fix the source
- **Missing/outdated test** — update test only if behavior change is intentional
- **Format/lint drift** — run the format target, commit the diff
- **Environment mismatch** — compare CI versions (Node 25, .NET 10) with local; prefer fixing code over weakening CI

**Do not** change `.github/workflows/` just to make a failure pass. Fix the underlying issue unless the workflow itself is wrong.

## Step 3: Implement fix

- Keep the diff minimal and scoped to the failure.
- Match existing code style and patterns in the touched area.
- If CI failed on `main`, fix on a branch; if on a PR branch, fix there.
- Do not commit unless the user asks.

## Step 4: Validate with Makefile

Run targets that mirror what CI runs. Prefer targeted runs first, then broader checks.

```bash
# After frontend failure
make verify-frontend && make test-frontend

# After backend failure
make verify-backend && make test-backend

# When unsure which job failed, or changes span both stacks
make verify-all && make test-frontend && make test-backend
```

If validation fails, read the new error, fix, and re-run until green. Do not report success without running these commands.

Optional broader gate before handing off:

```bash
make test-all   # includes e2e — slower; use when UI/routing changed
```

## Step 5: Recommend manual testing

End every fix with a **Manual testing** section tailored to what changed. Use this template:

```markdown
## Manual testing

**What changed:** [one sentence]

**Setup:**
1. `make backend` (API on http://localhost:5089)
2. `make frontend` (app on http://localhost:5173)

**Steps:**
1. [Specific action — page, button, API call]
2. [Expected result]

**API-only fixes** — example:
- `curl -s -X POST http://localhost:5089/api/... -H 'Content-Type: application/json' -d '...'`
- Expect HTTP 200 and [expected body field]

**If you cannot run the app** — note which `make` target already covers the fix and what a human should spot-check in the browser.
```

### Manual test hints by area

| Area | Suggested check |
|------|-----------------|
| Landing / portfolio cards | Open `/`, confirm cards render; click a project link |
| About page | Open `/about` |
| Contact / email | Submit contact form; check API response or logs (`LoggingContactEmailSender` in dev) |
| Analytics / events | Browser devtools → Network → `POST /api/web/event` on tracked clicks |
| Backend-only logic | `make test-backend` + targeted `curl` against `:5089` |

## Report format

When done, summarize:

1. **Failure** — run link, job, step, error summary
2. **Cause** — why it failed
3. **Fix** — files changed and what you did
4. **Validation** — which `make` commands passed
5. **Manual testing** — concrete steps from Step 5

If the failure cannot be reproduced or fixed (flaky CI, missing secrets, upstream outage), say so explicitly and list what you tried.

## Constraints

- Never weaken or skip CI checks to get green.
- Never commit or push unless the user asks.
- Prefer fixing application/test code over editing workflows.
- Use `make install` if dependencies are missing before re-running tests.
