import React from 'react';
import { addons, types } from 'storybook/manager-api';
import { Addon } from './components/Addon';

export enum IDS {
  ADDON = 'faebeee/storybook-w3c',
  PANEL = 'storybook-w3c/panel',
}

addons.register(IDS.ADDON, () => {
  addons.add(IDS.PANEL, {
    title: 'W3C',
    type: types.PANEL,
    render: ({ active }) => <Addon active={active}/>
  });
});
