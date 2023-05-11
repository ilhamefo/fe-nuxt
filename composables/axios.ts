import axios, { AxiosInstance, AxiosResponse } from "axios";
import Cookies from "universal-cookie";

export const useAxiosInstance = () => {
  const config = useRuntimeConfig();

  const BACKEND_URL:string | undefined = config.public.backend_url

  const instance: AxiosInstance = axios.create({
    baseURL: BACKEND_URL,
  });

  instance.interceptors.request.use(
    function (config) {
      const cookies = new Cookies();
      const token = cookies.get("_token");
      const XSRF_TOKEN = cookies.get("XSRF-TOKEN");

      console.log(XSRF_TOKEN);

      if (config.method == "post" || "put") {
        axios
          .get(BACKEND_URL + "sanctum/csrf-cookie", {
            withCredentials: true,
          })
          .then((res) => {})
          .finally(() => {
            
          });
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // Handle error
      return Promise.reject(error);
    }
  );

  return instance;
};
