import React from 'react';
import { Button } from "../Button";
import { getAxios } from './get-axios';

export default {
  title: 'Axios / Fetch',
}

export const FetchExample = () => {
  const onClick = () => {
    getAxios().get('/fetch');
  };

  return <Button onClick={onClick} label='Fetch'></Button>;
}
