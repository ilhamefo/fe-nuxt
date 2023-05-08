import { defineStore } from "pinia";
import { LoginErrorResponse } from "@/models/auth";

const initValidationErrorData : LoginErrorResponse = {
    email: "",
    password: ""
}

const useIndexStore = defineStore("index", {
  state: () => {
    return {
      isSuccess: false,
      isValidationError: false,
      validationErrors: initValidationErrorData,
      isFailedLogin: false,
      isLoading: true,
    };
  },
  actions: {
    handleSuccess(param: boolean) {
      this.isSuccess = param;
    },
    handleLoading(param: boolean) {
      this.isLoading = param;
    },
    handleFailedLogin(param: boolean) {
      this.isFailedLogin = param;
    },
    handleIsValidationError(param: boolean){
        this.isValidationError = param;
    },
    handleValidationErrors(param: LoginErrorResponse){
        this.validationErrors = param;
    },
  },
});

export default useIndexStore;
