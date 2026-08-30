# Publishing `@michel005/ux-library`

Publishing is automated by [`.github/workflows/publish.yml`](../.github/workflows/publish.yml).

## One-time setup

1. Create an **automation** access token on npmjs.com
   (Account → Access Tokens → Generate New Token → *Automation*).
2. In the GitHub repo: **Settings → Secrets and variables → Actions → New repository secret**
   - Name: `NPM_TOKEN`
   - Value: the token from step 1
3. Make sure the npm scope `@michel005` exists (it is created automatically on the
   first `--access public` publish under your account).

## Releasing a new version

1. Bump the version in `ux-library/package.json` (e.g. `0.1.0`) and commit it to `main`.
2. Create a GitHub Release whose tag matches that version, prefixed with `v`
   (e.g. tag `v0.1.0`). The workflow verifies the tag matches `package.json`.
3. The workflow builds the package and runs `pnpm --filter ux-library publish`
   with npm provenance enabled.

## Testing without publishing

Run the **Publish ux-library to npm** workflow manually from the *Actions* tab with
the **dry-run** option checked. It builds and runs `npm publish --dry-run`.
