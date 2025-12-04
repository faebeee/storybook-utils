import React, { FC, useEffect } from 'react';
import { AddonPanel, Table } from 'storybook/internal/components';
import { useAddonState, useChannel } from 'storybook/manager-api';
import { EVENTS, IDS } from '../config';
import { ValidationResult } from '../types';

export type Props = {
  active?: boolean;
};

export const Addon: FC<Props> = ({ active }) => {
  const [{ code }, setState] = useAddonState(IDS.ADDON, {
    code: null
  });
  const [{ result }, setValidationResult] = useAddonState<{result: ValidationResult | null}>(IDS.ADDON, {
    result: null
  });

  // https://storybook.js.org/docs/react/addons/addons-api#usechannel
  useChannel({
    [EVENTS.CODE_UPDATE]: ({ code }) => {
      setState((state) => ({ ...state, code }));
    }
  });

  const validate = async () => {
    if (!code) {
      return;
    }

    const url = new URL('https://validator.w3.org/nu/');
    url.searchParams.set('out', 'json');
    url.searchParams.set('doctype', 'Inline');
    const response = await fetch(url, {
      method: 'POST',
      body: code,
      headers: {
        'Content-Type': 'text/html'
      }
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const result = (await response.json()) as ValidationResult;
    setValidationResult({ result });
  };

  useEffect(() => {
    validate();
  }, [code, active]);

  return (
    <AddonPanel active={active ?? false}>
      <Table>
        {result?.messages.map((message) => (
          <tr>
            <td>{message.type}</td>
            <td>{message.message}</td>
            <td>{message.extract}</td>
          </tr>
        ))}

      </Table>
    </AddonPanel>
  );
};
