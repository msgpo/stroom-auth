import * as Cookies from "cookies-js";
import { StoreContext } from "redux-react-hook";
import { useContext, useCallback } from "react";

import useHttpClient from "../useHttpClient";
import {
  Credentials,
  ResetPasswordRequest,
  ChangePasswordRequest
} from "./types";
import { FormikBag } from "formik";
import { useActionCreators } from "./redux";
import { GlobalStoreState } from "../..//modules";
import { useActionCreators as useUserActionCreators } from "../users";
import useRouter from "../../lib/useRouter";

interface Api {
  // FIXME: Not sure if the FormikBag types are correct
  login: (credentials: Credentials, formikBag: FormikBag<any, any>) => void;
  changePasswordForCurrentUser: () => void;
  resetPassword: (resetPasswordRequest: ResetPasswordRequest) => void;
  changePassword: (changePasswordRequest: ChangePasswordRequest) => void;
  submitPasswordChangeRequest: (
    formData: any,
    formikBag: FormikBag<any, any>
  ) => void;
}

export const useApi = (): Api => {
  const store = useContext(StoreContext);
  const { httpGetJson, httpPostJsonResponse } = useHttpClient();
  const { showLoader } = useActionCreators();

  const {
    showChangePasswordErrorMessage,
    hideChangePasswordErrorMessage,
    toggleAlertVisibility
  } = useUserActionCreators();
  const { history } = useRouter();
  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  const login = useCallback(
    (credentials: Credentials, { setStatus, setSubmitting }) => {
      const { email, password } = credentials;
      const state: GlobalStoreState = store.getState();
      // We want to show a preloader while we're making the request. We turn it off when we receive a response or catch an error.
      showLoader(true);

      const authenticationServiceUrl =
        state.config.values.authenticationServiceUrl;
      const loginServiceUrl = `${authenticationServiceUrl}/authenticate`;
      const clientId = state.config.values.appClientId;
      // const stroomUiUrl = state.config.values.stroomUiUrl;

      // We need to post the sessionId in the credentials, otherwise the
      // authenticationService will have no way of marking the session as valid.
      const fullSessionId = Cookies.get("authSessionId");
      let sessionId = fullSessionId;
      if (fullSessionId.indexOf(".") > -1) {
        sessionId = fullSessionId.slice(0, fullSessionId.indexOf("."));
      }
      httpPostJsonResponse(loginServiceUrl, {
        body: JSON.stringify({
          email,
          password,
          sessionId,
          requestingClientId: clientId
        })
      }).then(response => {
        if (response.loginSuccessful) {
          // Otherwise we'll extract what we expect to be the successful login redirect URL
          Cookies.set("username", email);
          window.location.href = response.redirectUrl;
        } else {
          setStatus(response.message);
          setSubmitting(false);
        }
        return;
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
      httpPostJsonResponse(url, {
        body: JSON.stringify({ newPassword: password, oldPassword, email })
      }).then(response => {
        if (response.changeSucceeded) {
          // If we successfully changed the password then we want to redirect if there's a redirection URL
          if (redirectUrl !== undefined) {
            window.location.href = redirectUrl;
          } else {
            toggleAlertVisibility(true, "Your password has been changed");
          }
        } else {
          let errorMessage = [];
          if (response.failedOn.includes("BAD_OLD_PASSWORD")) {
            errorMessage.push("Your new old password is not correct");
          }
          if (response.failedOn.includes("COMPLEXITY")) {
            errorMessage.push(
              "Your new password does not meet the complexity requirements"
            );
          }
          if (response.failedOn.includes("REUSE")) {
            errorMessage.push("You may not reuse your previous password");
          }
          if (response.failedOn.includes("LENGTH")) {
            errorMessage.push("Your new password is too short");
          }
          showChangePasswordErrorMessage(errorMessage);
        }
      });
    },
    [
      hideChangePasswordErrorMessage,
      toggleAlertVisibility,
      showChangePasswordErrorMessage
    ]
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

  const changePasswordForCurrentUser = useCallback(() => {
    const state: GlobalStoreState = store.getState();
    const url = `${state.config.values.userServiceUrl}/me`;
    httpGetJson(url, {})
      .then(users => users[0])
      .then(user => {
        changePassword(user.email);
      });
  }, [changePassword]);

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
  return {
    login,
    submitPasswordChangeRequest,
    changePasswordForCurrentUser,
    resetPassword,
    changePassword
  };
};

export default useApi;
