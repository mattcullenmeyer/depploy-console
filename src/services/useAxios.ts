import axios, { AxiosError } from 'axios';
import { API_ENDPOINT } from '../constants/endpoints';

export enum RequestTypes {
  Get = 'get',
  Post = 'post',
  Put = 'put',
  Patch = 'patch',
  Delte = 'delete',
}

export interface ResponseBody<T> {
  status?: number;
  data?: T;
  error?: string;
}

export interface RequestParameters {
  path: string;
  method: RequestTypes;
  data?: any;
  headers?: any;
  params?: any;
}

export const useAxios = async <T>({
  path,
  method,
  data = {},
  headers = {},
  params = {},
}: RequestParameters): Promise<ResponseBody<T>> => {
  if (process.env.NODE_ENV === 'development') {
    const currentUrl = new URL(location.toString());

    currentUrl.searchParams.forEach((value, key) => {
      if (key.startsWith('mock_')) {
        params[key] = value;
      }
    });
  }

  try {
    const response = await axios({
      method,
      url: `${API_ENDPOINT}/${path}`,
      data,
      headers,
      params,
    });

    return {
      status: response.status,
      data: response.data as T,
    };
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof AxiosError) {
      return {
        status: error.response?.status,
        error: error.message,
      };
    }

    return {};
  }
};

export default useAxios;
