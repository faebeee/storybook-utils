import React, { useEffect, useState } from 'react';
import { STORY_CHANGED } from 'storybook/internal/core-events';
import { addons, types } from 'storybook/manager-api';
import { Addon } from './components/Addon';
import { EVENTS, IDS } from './config';

addons.register(IDS.ADDON, (api) => {
  addons.add(IDS.PANEL, {
    title: () => {
      const [actionsCount, setActionsCount] = useState(0);
      const onEvent = (data: {count: number}) => setActionsCount(data.count);
      const onChange = () => setActionsCount(0);

      useEffect(() => {
        api.on(EVENTS.MESSAGES, onEvent);
        api.on(STORY_CHANGED, onChange);
        return () => {
          api.off(EVENTS.MESSAGES, onEvent);
          api.off(STORY_CHANGED, onChange);
        };
      });
      const suffix = actionsCount === 0 ? '' : ` (${actionsCount})`;
      return `W3C ${suffix}`;
    },
    type: types.PANEL,
    render: ({ active, }) => active ? <Addon active={active}/> : null
  });
});
