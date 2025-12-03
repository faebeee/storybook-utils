import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    // "storybook-w3c",
    // '../../../packages/storybook-w3c/lib/manager.tsx'
    import.meta.resolve('./local-preset.ts')

  ],
  // framework: getAbsolutePath("@storybook/react-vite")
  'framework': {
    'name': '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: 'vite.storybook.config.js'
      }
    }
  },

};
export default config;

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
