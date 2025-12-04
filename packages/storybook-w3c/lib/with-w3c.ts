import { useChannel } from 'storybook/internal/preview-api';
import type { PartialStoryFn as StoryFunction, Renderer } from 'storybook/internal/types';
import { EVENTS } from './config';

export const withW3c = (
  storyFn: StoryFunction<Renderer>
) => {
  const emit = useChannel({});

  setTimeout(() => {
    const rootSelector = '#storybook-root, #root';
    const root = document.querySelector(rootSelector);
    const code: string = root ? root.innerHTML : `${rootSelector} not found.`;

    emit(EVENTS.CODE_UPDATE, { code });
  }, 0);

  return storyFn();
};
