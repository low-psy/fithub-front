import React from 'react';
import { AxiosError } from 'axios';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { getDetailTraining } from '../../apis/trainig';
import { LoaderData } from '../../types/training';

export const loader = (async () => {
  try {
    const response = await getDetailTraining(Number(0));
    if (response && response.status === 200) {
      return response;
    }
    throw new Error(`Server responded with status: ${response.status}`);
  } catch (err) {
    const error = err as unknown as AxiosError;
    throw error;
  }
}) satisfies LoaderFunction;

export default function SuccessPage() {
  const res = useLoaderData() as LoaderData<typeof loader>;
  return <div>success</div>;
}
