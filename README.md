# storybook-utils

Monorepo for utilities around Storybook. It currently includes:

- storybook-w3c — a Storybook addon to validate the rendered story HTML with the official W3C Nu validator
- @repo/eslint-config — internal shareable ESLint configs for packages and apps in this repo

## Packages

- packages/storybook-w3c
  - NPM: https://www.npmjs.com/package/storybook-w3c
  - License: ISC
- packages/eslint-config
  - Private, internal-only (not published)

## Apps

- apps/storybook — local Storybook used for developing/testing addons and components

## Getting started (monorepo)

Requirements: Node 18+ (recommended), npm 10+.

Clone and install deps:
```bash
npm install
```

Common scripts (proxy to Turbo tasks):
```bash
# Develop everything
npm run dev

# Build all packages/apps
npm run build

# Lint across workspace
npm run lint

# Type-check across workspace
npm run check-types

# Format all code and markdown
npm run format
```

## Developing packages

Use Turbo filters to work on a single package:
```bash
# Build just the Storybook addon
npx turbo run build

# Dev just the Storybook app
npx turbo run dev
```

## Releases

This repo uses Changesets for versioning and publishing.

Typical flow:
```bash
# create a changeset (choose the affected packages)
npx changeset

# version packages (applies changeset versions)
npx changeset version

# publish (from package folders that are public)
npx changeset publish
```

Note: only public packages (e.g., storybook-w3c) are published. Private workspace packages (e.g., @repo/eslint-config) are not published.

## Contributing

- Use feature branches and pull requests.
- Keep commits small and focused.
- Run `npm run lint` and `npm run check-types` before pushing.
- If your change affects a published package, add a Changeset (`npx changeset`).

## License

ISC (same as storybook-w3c). If you prefer a different license at the root, let’s update accordingly.
