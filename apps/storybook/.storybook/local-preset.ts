import { fileURLToPath } from 'node:url';

/**
 * to load the built addon in this test Storybook
 */
export function previewAnnotations(entry = []) {
  return [...entry, fileURLToPath(import.meta.resolve('../../../packages/storybook-w3c/lib/preview.ts'))];
}

export function managerEntries(entry = []) {
  return [...entry, fileURLToPath(import.meta.resolve('../../../packages/storybook-w3c/lib/manager.tsx'))];
}

// export * from '../dist/preset.js';
