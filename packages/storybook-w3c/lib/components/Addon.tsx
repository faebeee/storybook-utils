import React, { FC, memo, useState } from 'react';
import { AddonPanel, Card, ErrorFormatter, P, Table } from 'storybook/internal/components';
import { useChannel } from 'storybook/manager-api';
import { EVENTS } from '../config';
import { useValidation } from '../hooks/use-validation';

export type Props = {
  active?: boolean;
};

export const Addon: FC<Props> = memo(({ active }) => {
  const [{ code }, setState] = useState({
    code: null
  });

  const { result, isValid, requestError } = useValidation(code, active);

  useChannel({
    [EVENTS.CODE_UPDATE]: ({ code }) => {
      setState((state) => ({ ...state, code }));
    }
  });

  return (
    <AddonPanel active={active ?? false}>
      <div style={{ padding: '1rem' }}>
        {requestError && <ErrorFormatter error={requestError}/>}
        {isValid && <Card>
          <P style={{ paddingLeft: '1rem' }}>No validation errors</P>
        </Card>}

        <Table>
          {result?.messages.map((message) => (
            <tr>
              <td>{message.type}</td>
              <td>{message.message}</td>
              <td>{message.extract}</td>
            </tr>
          ))}
        </Table>
      </div>
    </AddonPanel>
  );
});
