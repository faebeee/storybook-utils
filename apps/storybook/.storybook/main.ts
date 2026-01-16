import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../**/*.stories.@(ts|tsx)',
    // '../../../packages/**/*.stories.@(ts|tsx)',
    '../../../packages/**/*.mdx',
  ],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-vitest"),
    import.meta.resolve('./local-preset.ts')

  ],
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
