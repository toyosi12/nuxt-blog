import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

interface ApiResponse<T> {
  data: T;
  status: number;
}

interface ApiError {
  message: string;
  status: number;
}

export async function useHttp<T>(
  config: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<T> = await axios(config);
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    const apiError: ApiError = {
      message:
        (axiosError.response?.data as any)?.message || "An error occurred",
      status: axiosError.response?.status || 500,
    };
    throw apiError;
  }
}
