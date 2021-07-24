import axios from 'axios';

import { Request, Response } from '../types';

const axiosInstance = axios.create({
  baseURL: 'https://api.novaposhta.ua/v2.0/json/',
});

export const makeRequest = async <
  ResponseData = unknown,
  RequestData = unknown
>(
  apiKey: string,
  req: Request<RequestData>
): Promise<Response<ResponseData>> => {
  try {
    const { data } = await axiosInstance.post<Response<ResponseData>>('', {
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
