import axios, { AxiosInstance, AxiosResponse } from "axios";
import Cookies from "universal-cookie";
// Create a new Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8099/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// axiosInstance.defaults.headers.common["X-XSRF-TOKENXXSAS"] = cookies.get("XSRF-TOKEN")

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response, "OOOOOOOOO");
    
    return response
  },
  (error) => {
    // Handle error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(
  function (config) {
    const cookies = new Cookies();
    const token = cookies.get("_token");
    const XSRF_TOKEN = cookies.get("XSRF-TOKEN");
    
    console.log(XSRF_TOKEN);
    
    if (config.method == "post" || "put") {
      axios
        .get("http://localhost:8099/sanctum/csrf-cookie", {
          withCredentials: true,
        })
        .then((res) => {
          console.log(cookies.get("XSRF-TOKEN"));
          config.headers.set("X-XSRF-TOKENXXSAS", "HOWWWWWWWWWWWW")
          // axiosInstance.defaults.headers.common["X-XSRF-TOKENXXSAS"] = "AHSUAHSUOAHSOUAHSUO" //.headers.common["X-XSRF-TOKENXXSAS"] = "AUISGIASIASIASIAGSIG"
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

export default axiosInstance;

// export default axios;
