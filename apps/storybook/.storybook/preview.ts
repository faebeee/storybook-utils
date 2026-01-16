import type { Preview } from '@storybook/react-vite';
import { withStorybookAxios } from 'storybook-axios/decorator';
import { getAxios } from '../stories/axios/get-axios';


const preview: Preview = {
  parameters: {
  },
  decorators: [
    withStorybookAxios(getAxios()),
  ]
};

export default preview;
