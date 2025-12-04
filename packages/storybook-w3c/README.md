# storybook-w3c

Validate your rendered Storybook stories with the W3C HTML Validator — right inside Storybook’s UI.

This addon collects the rendered HTML of the current story and sends it to the official W3C Nu validator (https://validator.w3.org/nu/) using the "Inline" doctype. Validation results (errors, warnings, and extracts) are displayed in a dedicated "W3C" panel.

> Note: This addon targets Storybook 10+ and React-based manager UI. It has peer dependencies on React 18+ and `storybook@^10.1.4`.

## Features

- One-click W3C validation of the currently rendered story
- Results panel with message type, message text, and source extract
- Framework-agnostic (validates final HTML, not framework code)

## Installation

```bash
# with npm
npm install --save-dev storybook-w3c

# with pnpm
pnpm add -D storybook-w3c

# with yarn
yarn add -D storybook-w3c
```

Peer dependencies you should already have in your Storybook project:

- `react >= 18`
- `react-dom >= 18`
- `storybook ^10.1.4`

## Usage

You need two parts:

1) Register the W3C panel in the Storybook manager UI
2) Add a preview decorator that collects the rendered HTML and emits it for validation

You can do this in two simple import lines.

### 1) Enable the W3C panel (manager)

Create (or update) `.storybook/manager.ts` and add:

```ts
// .storybook/manager.ts
import 'storybook-w3c/manager';
```

This registers a new panel named "W3C".

### 2) Enable the preview decorator

There are two common ways to wire the preview decorator:

A. Replace your preview annotations with the addon’s preset (simple)

```ts
// .storybook/preview.ts
import preview from 'storybook-w3c/preview';
export default preview;
```

B. Merge the addon’s decorator into your existing preview (if you already have decorators/parameters)

```ts
// .storybook/preview.ts
import type { Preview } from '@storybook/react';
import previewFromAddon from 'storybook-w3c/preview';

const preview: Preview = {
  // keep your existing config
  parameters: {
    // ...
  },
  decorators: [
    // addon’s decorator first to ensure it runs
    ...(previewFromAddon.decorators ?? []),
    // your other decorators
    // ...
  ],
};

export default preview;
```

That’s it. Start Storybook and open the W3C panel. When a story renders, the add-on captures the HTML of `#storybook-root` (or `#root` as a fallback) and validates it.

## How it works

- The preview decorator (`withW3c`) waits a microtask tick after the story renders, collects the innerHTML of the root container, and emits a `CODE_UPDATE` event.
- The manager-side addon listens for `CODE_UPDATE`, sends the HTML to `https://validator.w3.org/nu/?out=json&doctype=Inline` via `POST text/html`, and renders the returned messages in a table.

IDs and events used internally:

- Addon ID: `faebeee/storybook-w3c`
- Panel ID: `storybook-w3c/panel`
- Event: `faebeee/storybook-w3c/codeUpdate`

## Privacy and networking

This addon sends the rendered HTML of your story to the public W3C validation service over the network. Do not enable this addon when viewing proprietary or sensitive HTML you don’t want to share outside your environment. For offline or private validation, fork the addon and point it to a self-hosted instance of the Nu validator.

## Troubleshooting

- The panel is empty
  - Ensure you imported `storybook-w3c/manager` in `.storybook/manager.ts`.
  - Ensure the W3C panel is active/visible in the Storybook UI.
  - The decorator only validates when the panel is active; switch to the W3C panel to trigger validation.
- No root element found / "#storybook-root, #root not found."
  - The addon queries `#storybook-root` and then `#root`. If your environment is customized, ensure one of those exists.
- CORS or network errors
  - Corporate proxies or strict CSP may block requests to `validator.w3.org`. Check your network policies.
- I already have a `preview.ts` with config
  - Use the merge approach shown above to add the decorator without losing your existing configuration.

## API

Although not necessary for typical usage, the following internals are available:

- `default` from `storybook-w3c/preview` — a `ProjectAnnotations` object that adds the `withW3c` decorator.
- `withW3c` — decorator used by the preview (can be imported from `storybook-w3c/lib/with-w3c`).
- Manager registration — side-effect import `storybook-w3c/manager` registers the panel.

## Compatibility

- Storybook: 10.x (tested with `^10.1.4`)
- UI/Manager: React 18+
- Frameworks: Works with any framework because validation is on the final HTML, but the manager UI requires React.

## Development

This repo includes an example Storybook app under `apps/storybook`. During development, it uses the built `lib/manager.tsx` and `lib/preview.ts` files.

Build the addon package:

```bash
# from repo root
npm run build -w packages/storybook-w3c
```

## License

ISC © faebeee
