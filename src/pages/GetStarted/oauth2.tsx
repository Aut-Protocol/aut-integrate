import { environment } from "@api/environment";
import { State } from "@usedapp/core";
import axios from "axios";
import { useCallback, useState, useRef } from "react";

export const getTwitterOAuthUrl = (redirectUri: string, twitterState: string) =>
  getURLWithQueryParams(environment.twitterApi, {
    response_type: "code",
    client_id: environment.twitterClientId,
    redirect_uri: redirectUri,
    scope: ["tweet.read", "users.read", "offline.access"].join(" "),
    state: twitterState,
    code_challenge: "challenge",
    code_challenge_method: "plain"
  });

const getURLWithQueryParams = (
  baseUrl: string,
  params: Record<string, any>
) => {
  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  return `${baseUrl}?${query}`;
};

const POPUP_HEIGHT = 700;
const POPUP_WIDTH = 600;

const generateState = () => {
  //For tamper security
  const validChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let array = new Uint8Array(40);
  window.crypto.getRandomValues(array);
  array = array.map((x) => validChars.codePointAt(x % validChars.length));
  const randomState = String.fromCharCode.apply(null, array);
  return randomState as string;
};

const openPopup = (url) => {
  const top = window.outerHeight / 2 + window.screenY - POPUP_HEIGHT / 2;
  const left = window.outerWidth / 2 + window.screenX - POPUP_WIDTH / 2;
  const win = window.open(
    url,
    "",
    `height=${POPUP_HEIGHT},width=${POPUP_WIDTH},top=${top},left=${left}`
  );
  return win;
};

interface IntervalRef {
  state: string;
  interval: any;
}

let intervalRef: IntervalRef = null;

export const useOAuth2 = () => {
  const getAuth = useCallback((onSuccess, onFailure) => {
    const state = generateState();

    if (intervalRef && intervalRef.state !== state) {
      clearInterval(intervalRef.interval);
    }

    openPopup(
      getTwitterOAuthUrl("http://localhost:3000/callback", state)
    ) as any;

    window.localStorage.removeItem("twitter-auth-response");
    const interval = setInterval(async () => {
      const authResponse = window.localStorage.getItem("twitter-auth-response");
      if (authResponse) {
        const objectAuthResponse = JSON.parse(authResponse);
        if (objectAuthResponse.error) {
          onFailure(objectAuthResponse.error);
        } else if (objectAuthResponse.state !== state) {
          onFailure("Validation miss-match something went wrong.");
        } else {
          try {
            const response = await axios.post(
              `${environment.apiUrl}/autID/config/twitterToken`,
              {
                code: objectAuthResponse.code,
                redirectUrl: "http://localhost:3000/callback",
                codeVerifier: "challenge"
              }
            );
            onSuccess(response);
          } catch (e) {
            onFailure(e);
          }
        }
        window.localStorage.removeItem("twitter-auth-response");
        clearInterval(interval);
      }
    }, 2000);
    intervalRef = { state, interval };

    return () => {
      if (intervalRef) {
        clearInterval(intervalRef.interval);
      }
    };
  }, []);

  return { getAuth };
};
