import type { ProjectAnnotations, Renderer } from 'storybook/internal/types';
import { withStorybookAxios } from './decorator';
import { getAxios } from './utils/get-axios';

const preview: ProjectAnnotations<Renderer> = {
  decorators: [withStorybookAxios(getAxios())]
};

export default preview; 
