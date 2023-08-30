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
    const response: AxiosResponse<T> = await axios({
      ...config,
      timeout: 20000,
    });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    let dispError: string;
    switch (axiosError?.code) {
      case "ERR_NETWORK":
        dispError = "Please confirm you are connected to the internet";
        break;
      case "ECONNABORTED":
        dispError = "Request timed out";
        break;
      default:
        dispError =
          (axiosError.response?.data as any)?.message ||
          "An error occurred while fetching data from API";
    }
    const apiError: ApiError = {
      message: dispError,
      status: axiosError.response?.status || 500,
    };

    throw apiError;
  }
}
