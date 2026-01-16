import { useState } from "react";
import { Button } from "../Button";
import { getAxios } from "./get-axios";
import React from "react";
import { AxiosResponse } from "axios";

export const FetchButton = () => {
  const [request, setRequest] = useState<AxiosResponse | null>(null);

  const fetch = async () => {
    setRequest(await getAxios().get('/'));
  }

  return <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <span>Response: {request?.data}</span>
    <span>Status: {request?.status}</span>
    <Button onClick={fetch} label='Request'></Button>
  </div>;
}
