import type { ProjectAnnotations, Renderer } from 'storybook/internal/types';
import { withW3c } from './with-w3c';

const preview: ProjectAnnotations<Renderer> = {
  decorators: [withW3c]
};

export default preview;
