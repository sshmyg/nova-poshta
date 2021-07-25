import axios from 'axios';

import { RequestProps, ResponseProps } from '../types';

const axiosInstance = axios.create({
  baseURL: 'https://api.novaposhta.ua/v2.0/json/',
});

export const makeRequest = async <
  ResponseData = unknown,
  RequestData = unknown
>(
  apiKey: string,
  req: RequestProps<RequestData>
): Promise<ResponseProps<ResponseData>> => {
  try {
    const { data } = await axiosInstance.post<ResponseProps<ResponseData>>('', {
      apiKey,
      ...req,
    });

    if (!data.success) {
      throw new Error(data.errors.join(', '));
    }

    return data;
  } catch (error) {
    throw new Error(error);
  }
};
