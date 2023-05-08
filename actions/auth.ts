import axiosInstance from "@/actions/axios";
import axios, { AxiosResponse, CancelTokenSource } from "axios";
import {
  ApiResponse,
  EmploymentPayload,
  GenderModel,
  GenderResponse,
  HomeAddressPayload,
  LoginErrorResponse,
  LoginRequest,
  SubdistrictResponse,
  UserData,
  UserLanding,
} from "@/models/auth";
import useIndexStore from "@/store";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export async function doLogin(body: LoginRequest) {
  const router = useRouter();
  const state = useIndexStore();

  axiosInstance
    .post("api/login", body)
    .then((resLogin) => {
      // redirect to landing
      let errorData: LoginErrorResponse = {
        email: "",
        password: "",
      };

      state.handleIsValidationError(false);
      state.handleFailedLogin(false);
      state.handleValidationErrors(errorData);

      cookies.set("_token", resLogin.data.token, {
        path: "/",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      }); // Set a cookie with the name 'name', the value 'value', and a lifespan of 7 days

      router.push("/landing");
    })
    .catch((err) => {
      if (err.response.status === 422) {
        let errorData: LoginErrorResponse = {
          email: err.response.data.errors.email,
          password: err.response.data.errors.password,
        };

        state.handleIsValidationError(true);
        state.handleFailedLogin(false);
        state.handleValidationErrors(errorData);
      }
      if (
        err.response.status === 400 &&
        err.response.data.message === "credentials_mismatch"
      ) {
        let errorData: LoginErrorResponse = {
          email: "",
          password: "",
        };

        state.handleIsValidationError(false);
        state.handleFailedLogin(true);
        state.handleValidationErrors(errorData);
      }

      return false;
    });
}

export async function fetchUserData(): Promise<UserData> {
  const response: AxiosResponse<UserData> = await axiosInstance.get(
    "/api/user"
  );

  return response.data;
}

export async function fetchUserLanding(): Promise<UserLanding> {
  const response: AxiosResponse<UserLanding> = await axiosInstance.get(
    "/api/user/landing"
  );
  return response.data;
}

export async function fetchGenders(): Promise<GenderModel[]> {
  const response: AxiosResponse<GenderResponse> = await axiosInstance.get(
    "/api/gender"
  );
  return response.data.data;
}

export async function fetchOccupations(): Promise<ApiResponse> {
  const response: AxiosResponse<ApiResponse> = await axiosInstance.get(
    "/api/occupations"
  );
  return response.data;
}

export async function fetchLineOfBusiness(): Promise<ApiResponse> {
  const response: AxiosResponse<ApiResponse> = await axiosInstance.get(
    "/api/line-of-business"
  );
  return response.data;
}

export async function fetchJobTitles(): Promise<ApiResponse> {
  const response: AxiosResponse<ApiResponse> = await axiosInstance.get(
    "/api/job-titles"
  );
  return response.data;
}

export async function fetchSourceOfFund(): Promise<ApiResponse> {
  const response: AxiosResponse<ApiResponse> = await axiosInstance.get(
    "/api/source-of-fund"
  );
  return response.data;
}

export async function fetchIncome(): Promise<ApiResponse> {
  const response: AxiosResponse<ApiResponse> = await axiosInstance.get(
    "/api/incomes"
  );
  return response.data;
}

export function GetYear(rawTimestamp: string): number {
  const timestamp = new Date(rawTimestamp).getTime();
  const date = new Date(timestamp);
  return date.getFullYear();
}

export function GetDate(rawTimestamp: string): string {
  const timestamp = new Date(rawTimestamp).getTime();
  const date = new Date(timestamp);
  return date.toLocaleString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function MaskNPWP(input: string): string {
  let maskedInput = input.replace(
    /^(\d{2})(\d{4})(\d{3})(\d{2})$/,
    "$1 . $2 . $3 . $4"
  );

  return maskedInput;
}

export async function submitPersonalData(data: UserData): Promise<any> {
  const response: AxiosResponse<any> = await axiosInstance.put(
    "/api/user/personal-data",
    data
  );

  return response.data;
}

export async function submitEmployment(data: EmploymentPayload): Promise<any> {
  const response: AxiosResponse<any> = await axiosInstance.put(
    "/api/user/employment",
    data
  );

  return response.data;
}

export async function submitHomeAddress(
  data: HomeAddressPayload
): Promise<any> {
  const response: AxiosResponse<any> = await axiosInstance.put(
    "/api/user/home-address",
    data
  );

  return response.data;
}

let source: CancelTokenSource;

export async function searchSubdistrict(data: string): Promise<ApiResponse> {
  if (source) {
    source.cancel();
  }

  const cancelToken = axios.CancelToken;
  source = cancelToken.source();

  const response: AxiosResponse<ApiResponse> = await axiosInstance.get(
    "/api/user/search-subdistrict/" + data,
    { cancelToken: source.token }
  );

  return response.data;
}