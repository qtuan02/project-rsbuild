# CI/CD Setup Checklist

This repository uses:
- automatic CI checks on pull requests and pushes to `main`
- manual production deployments via GitHub Actions

Use this checklist once to complete platform settings that cannot be stored in git.

## 1) Add GitHub repository secrets

In GitHub: `Settings` -> `Secrets and variables` -> `Actions` -> `New repository secret`

Add:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

These are required by `.github/workflows/deploy-manual.yml`.

## 2) Enable branch protection for `main`

In GitHub: `Settings` -> `Branches` -> `Add rule`

Use:
- Branch name pattern: `main`
- Enable `Require a pull request before merging`
- Enable `Require status checks to pass before merging`
- Select the CI job check from workflow `CI`:
  - `Lint, Format Check, Typecheck`
- (Recommended) Enable `Require branches to be up to date before merging`
- (Optional) Enable `Restrict who can push to matching branches`

This ensures PRs cannot be merged when checks fail.

## 3) Disable Vercel automatic Git production deploys

In Vercel project:
- Open project `Settings` -> `Git`
- Disable automatic production deployments from `main`
  - If your UI shows `Auto Expose System Environment Variables` / deployment toggles, keep env settings as needed but disable automatic production trigger
  - If your project uses `Ignored Build Step`, configure it so Git pushes do not auto-build for production

Goal: only `.github/workflows/deploy-manual.yml` should deploy production.

## 4) Manual deployment flow

When you want to deploy:
- Go to GitHub `Actions` tab
- Open workflow `Deploy Manual`
- Click `Run workflow`
- Choose branch `main`
- Confirm run

The workflow performs:
- install with Bun
- Vercel pull
- Vercel build
- Vercel deploy (`--prebuilt --prod`)
