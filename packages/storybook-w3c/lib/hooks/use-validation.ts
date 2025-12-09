import { useCallback, useEffect, useState } from 'react';
import { useStorybookApi } from 'storybook/manager-api';
import { EVENTS } from '../config';
import { ValidationResult } from '../types';

export const useValidation = (code?: string | null, active: boolean = false) => {
  const api = useStorybookApi();
  const [isRequested, setIsRequested] = useState(false);
  const [requestError, setRequestError] = useState<null | Error>(null);
  const [{ result }, setValidationResult] = useState<{result: ValidationResult | null}>({
    result: null
  });

  const load = useCallback(async () => {
    if (!code) {
      return;
    }

    setRequestError(null);
    setValidationResult({ result: null });
    const html = `<!DOCTYPE html><html lang="en"><head><title>Title</title></head><body>${code}</body></html>`;

    try {
      setIsRequested(true);
      const url = new URL(`${window.location.protocol}//html5.validator.nu/`);
      const formData = new FormData();
      formData.append('out', 'json');
      formData.append('doctype', 'Inline');
      formData.append('content', html);

      const response = await fetch(url, {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const result = (await response.json()) as ValidationResult;
      api.emit(EVENTS.MESSAGES, { count: result.messages.filter(msg => msg.type === 'error').length });
      setValidationResult({ result });
      console.log(result);
    } catch (e) {
      setIsRequested(false);
      console.error(e);
      setRequestError((e as Error));
    }
  }, [code]);

  useEffect(() => {
    if (!active) {
      return;
    }
    load();
  }, [code, active]);


  return { requestError, result, isValid: isRequested && result?.messages.length === 0 };
};
