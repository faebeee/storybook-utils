import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../../../apps/**/*.stories.@(ts|tsx)',
    // '../../../packages/**/*.stories.@(ts|tsx)',
    // '../../../packages/**/*.mdx',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-vitest',
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
