# Publishing to npm

The `perl-ads` package is published to [npm](https://www.npmjs.com/package/perl-ads).

## Via GitHub Actions (recommended)

The easiest way to publish a new version:

1. Go to **Actions** > **Publish to npm** > **Run workflow**
2. Pick a version bump type: `patch`, `minor`, or `major`
3. Click **Run workflow**

The workflow will:
- Bump the version in `package.json`
- Commit and tag the release
- Push the commit and tag to `main`
- Publish to npm with provenance

This uses [npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers/)
(OIDC) — no access tokens or secrets are needed.

## Manually

If you need to publish from your local machine:

```bash
npm login
npm version patch   # or: minor, major
git push --follow-tags
npm publish
```

You'll need to be listed as an npm owner (see below).

## Via tag push

If you prefer to bump the version locally and let CI publish:

```bash
npm version patch
git push --follow-tags
```

The tag push (`v*`) triggers the same publish workflow.

## Managing npm owners

To see who can publish:

```bash
npm owner ls perl-ads
```

To add a new owner:

```bash
npm owner add <npm-username> perl-ads
```

## Trusted Publishing setup

The GitHub Actions workflow authenticates to npm via OIDC, configured as a
[Trusted Publisher](https://docs.npmjs.com/trusted-publishers/) on npmjs.com.

If the trusted publisher link is ever removed or needs to be recreated:

1. Go to https://www.npmjs.com/package/perl-ads/access
2. Under **Trusted Publishers**, click **GitHub Actions**
3. Fill in:
   - **Organization/Owner**: `PerlToolsTeam`
   - **Repository**: `perl-ads`
   - **Workflow filename**: `publish-npm.yml`
   - **Environment**: leave blank
4. Save
