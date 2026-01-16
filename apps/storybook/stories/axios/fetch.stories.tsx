import React from 'react';
import { Button } from "../Button";
import { getAxios } from './get-axios';
import { Meta } from '@storybook/react-vite';
import { FetchButton } from './FetchButton';

export default {
  title: 'Axios / Examples',
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
} as Meta

export const FetchExample = () => {
  const onClick = () => {
    getAxios().get('/fetch');
  };
  return <Button onClick={onClick} label='GET'></Button>;
}

export const MockedResponse: StoryObj = {
  parameters: {
    axios: {
      mock: (mock) => {
        mock
      }
    }
  },
  render: () => {
    return <FetchButton />
  }
}
