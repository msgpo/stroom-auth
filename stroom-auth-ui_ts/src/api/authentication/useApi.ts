import * as Cookies from "cookies-js";
import { StoreContext } from "redux-react-hook";
import { useContext, useCallback } from "react";

import useHttpClient from "../useHttpClient";
import {
  Credentials,
  ResetPasswordRequest,
  ChangePasswordRequest,
  LoginResponse,
  PasswordValidationRequest,
  PasswordValidationResponse
} from "./types";
import { FormikBag } from "formik";
import { useActionCreators } from "./redux";
import { GlobalStoreState } from "../../startup/GlobalStoreState";
import { useActionCreators as useUserActionCreators } from "../../components/users/api";
import useRouter from "../../lib/useRouter";
import { ChangePasswordResponse } from '.';

interface Api {
  apiLogin: (credentials: Credentials) => Promise<LoginResponse>;
  resetPassword: (resetPasswordRequest: ResetPasswordRequest) => void;
  changePassword: (changePasswordRequest: ChangePasswordRequest) => Promise<ChangePasswordResponse>;
  submitPasswordChangeRequest: (
    formData: any,
    formikBag: FormikBag<any, any>
  ) => void;
  isPasswordValid: (
    passwordValidationRequest: PasswordValidationRequest
  ) => Promise<PasswordValidationResponse>;
}

export const useApi = (): Api => {
  const store = useContext(StoreContext);
  const { httpGetJson, httpPostJsonResponse } = useHttpClient();
  const { showLoader } = useActionCreators();
  const { history } = useRouter();

  const {
    showChangePasswordErrorMessage,
    hideChangePasswordErrorMessage
  } = useUserActionCreators();

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  const apiLogin = useCallback(
    (credentials: Credentials) => {
      const { email, password } = credentials;
      const state: GlobalStoreState = store.getState();
      const authenticationServiceUrl =
        state.config.values.authenticationServiceUrl;
      const loginServiceUrl = `${authenticationServiceUrl}/authenticate`;
      const clientId = state.config.values.appClientId;

      // We need to post the sessionId in the credentials, otherwise the
      // authenticationService will have no way of marking the session as valid.
      const fullSessionId = Cookies.get("authSessionId");
      let sessionId = fullSessionId;
      if (fullSessionId.indexOf(".") > -1) {
        sessionId = fullSessionId.slice(0, fullSessionId.indexOf("."));
      }

      return httpPostJsonResponse(loginServiceUrl, {
        body: JSON.stringify({
          email,
          password,
          sessionId,
          requestingClientId: clientId
        })
      });
    },
    [httpPostJsonResponse, showLoader]
  );

  const changePassword = useCallback(
    (changePasswordRequest: ChangePasswordRequest) => {
      const state: GlobalStoreState = store.getState();
      hideChangePasswordErrorMessage();
      const url = `${
        state.config.values.authenticationServiceUrl
        }/changePassword/`;
      const {
        password,
        oldPassword,
        email,
        redirectUrl
      } = changePasswordRequest;

      return httpPostJsonResponse(url, {
        body: JSON.stringify({ newPassword: password, oldPassword, email })
      })
    },
    [hideChangePasswordErrorMessage, showChangePasswordErrorMessage]
  );

  const resetPassword = useCallback(
    (resetPasswordRequest: ResetPasswordRequest) => {
      const state: GlobalStoreState = store.getState();
      const newPassword = resetPasswordRequest.password;
      const stroomUiUrl = state.config.values.stroomUiUrl;
      const url = `${
        state.config.values.authenticationServiceUrl
        }/resetPassword/`;

      httpPostJsonResponse(url, { body: JSON.stringify({ newPassword }) }).then(
        response => {
          if (response.changeSucceeded) {
            if (stroomUiUrl !== undefined) {
              window.location.href = stroomUiUrl;
            } else {
              console.error("No stroom UI url available for redirect!");
            }
          } else {
            let errorMessage = [];
            if (response.failedOn.includes("COMPLEXITY")) {
              errorMessage.push(
                "Your new password does not meet the complexity requirements"
              );
            }
            if (response.failedOn.includes("LENGTH")) {
              errorMessage.push("Your new password is too short");
            }
            showChangePasswordErrorMessage(errorMessage);
          }
        }
      );
    },
    [showChangePasswordErrorMessage]
  );

  const submitPasswordChangeRequest = useCallback(
    (formData: any, formikBag: FormikBag<any, any>) => {
      const state: GlobalStoreState = store.getState();
      const { setSubmitting } = formikBag;
      const url = `${state.config.values.authenticationServiceUrl}/reset/${
        formData.email
        }`;

      httpGetJson(url, {}).then(() => {
        setSubmitting(false);
        history.push("/confirmPasswordResetEmail");
      });
    },
    []
  );

  const isPasswordValid = useCallback(
    (passwordValidationRequest: PasswordValidationRequest) => {
      const state: GlobalStoreState = store.getState();
      const url = `${
        state.config.values.authenticationServiceUrl
        }/isPasswordValid`;
      return httpPostJsonResponse(url, {
        body: JSON.stringify(passwordValidationRequest)
      });
    },
    []
  );

  return {
    apiLogin,
    submitPasswordChangeRequest,
    resetPassword,
    changePassword,
    isPasswordValid
  };
};

export default useApi;
