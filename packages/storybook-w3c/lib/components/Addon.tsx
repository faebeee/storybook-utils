import React, { FC, useEffect, useState } from 'react';
import { AddonPanel, Table,  } from 'storybook/internal/components';
import { useChannel, useStorybookApi } from 'storybook/manager-api';
import { EVENTS } from '../config';
import { ValidationResult } from '../types';

export type Props = {
  active?: boolean;
};

export const Addon: FC<Props> = ({ active }) => {
  const api = useStorybookApi();
  const [requestError, setRequestError] = useState<null | string>(null);
  const [{ code }, setState] = useState({
    code: null
  });
  const [{ result }, setValidationResult] = useState<{result: ValidationResult | null}>({
    result: null
  });

  useChannel({
    [EVENTS.CODE_UPDATE]: ({ code }) => {
      setState((state) => ({ ...state, code }));
    }
  });

  const validate = async () => {
    if (!code) {
      return;
    }

    setRequestError(null);
    setValidationResult({ result: null });

    try {
      const url = new URL(`${window.location.protocol}//html5.validator.nu/`);
      const formData = new FormData();
      formData.append('out', 'json');
      formData.append('doctype', 'Inline');
      formData.append('content', code);

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = (await response.json()) as ValidationResult;
      api.emit(EVENTS.MESSAGES, { count: result.messages.filter(msg => msg.type === 'error').length });
      setValidationResult({ result });
    } catch (e) {
      console.error(e);
      setRequestError((e as Error).message);
    }
  };

  useEffect(() => {
    if (!active) return;
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
