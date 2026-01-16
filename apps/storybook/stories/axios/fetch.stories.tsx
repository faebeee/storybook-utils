import React from 'react';
import { Button } from "../Button";
import { getAxios } from './get-axios';
import { Meta, StoryObj } from '@storybook/react-vite';
import { FetchButton } from './FetchButton';
import AxiosMockAdapter from 'axios-mock-adapter';

export default {
  title: 'storybook-axios / Examples',
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
      mock: (mock: AxiosMockAdapter) => {
        mock.onGet('/')
          .reply(200, { message: 'hello world' })
      }
    }
  },
  render: () => {
    return <FetchButton />
  }
}
