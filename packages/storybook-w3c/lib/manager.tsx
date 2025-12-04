import React from 'react';
import { addons, types } from 'storybook/manager-api';
import { Addon } from './components/Addon';
import { IDS } from './config';


addons.register(IDS.ADDON, () => {
  addons.add(IDS.PANEL, {
    title: 'W3C',
    type: types.PANEL,
    render: ({ active }) => <Addon active={active}/>
  });
});
