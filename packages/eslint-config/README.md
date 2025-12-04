# @repo/eslint-config

Internal shareable ESLint configurations used across this monorepo.

Exports:
- `@repo/eslint-config/base`
- `@repo/eslint-config/next-js`
- `@repo/eslint-config/react-internal`

> Note: This package is private (not published). It’s consumed by other workspace packages/apps via workspace resolution.

## Usage

In a package/app within this workspace, create `.eslintrc.cjs` or `.eslintrc.json` and extend one of the presets:

```json
{
  "extends": ["@repo/eslint-config/base"]
}
```

Next.js projects can use:
```json
{
  "extends": ["@repo/eslint-config/next-js"]
}
```

Internal React settings (for internal libs):
```json
{
  "extends": ["@repo/eslint-config/react-internal"]
}
```

Run lint from the repo root:
```bash
npm run lint
```

## Peer dependencies
This config relies on ESLint 9 and related plugins already present in the workspace. See `package.json` for exact versions.
