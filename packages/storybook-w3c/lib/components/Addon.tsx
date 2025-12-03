import React, { FC } from 'react';
import { AddonPanel } from 'storybook/internal/components';

export type Props = {
  active?: boolean;
};

export const Addon: FC<Props> = ({ active }) => {
  return (
    <AddonPanel active={active ?? false}>
      <div>Hello world</div>
    </AddonPanel>
  );
};
