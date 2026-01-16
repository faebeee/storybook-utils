import { useState } from "react";
import { Button } from "../Button";
import { getAxios } from "./get-axios";
import React from "react";
import { AxiosError, AxiosResponse } from "axios";

export const FetchButton = () => {
  const [request, setRequest] = useState<AxiosResponse | null>(null);

  const fetch = async () => {
    try {
      setRequest(await getAxios().get('/'));
    } catch (axiosError) {
      return setRequest((axiosError as AxiosError).response)
    }
  }

  return <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <span>Response: {JSON.stringify(request?.data, null, 2)}</span>
    <span>Status: {request?.status}</span>
    <Button onClick={fetch} label='Request'></Button>
  </div>;
}
