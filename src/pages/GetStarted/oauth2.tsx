import { environment } from "@api/environment";
import { State } from "@usedapp/core";
import axios from "axios";
import { useCallback, useState, useRef } from "react";

const TWITTER_STATEclientId = "YWRmaEY4LU9aSkRXd2NoZlpiLVU6MTpjaQ";
// export const TWITTER_STATE = "twitter-state";
const TWITTER_CODE_CHALLENGE = "challenge";
const TWITTER_AUTH_URL = "https://twitter.com/i/oauth2/authorize";
const TWITTER_SCOPE = ["tweet.read", "users.read", "offline.access"].join(" ");

export const getTwitterOAuthUrl = (redirectUri: string, twitterState: string) =>
  getURLWithQueryParams(TWITTER_AUTH_URL, {
    response_type: "code",
    client_id: TWITTER_STATEclientId,
    redirect_uri: redirectUri,
    scope: TWITTER_SCOPE,
    state: twitterState,
    code_challenge: TWITTER_CODE_CHALLENGE,
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

// https://medium.com/@dazcyril/generating-cryptographic-random-state-in-javascript-in-the-browser-c538b3daae50
const generateState = () => {
  const validChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let array = new Uint8Array(40);
  window.crypto.getRandomValues(array);
  array = array.map((x) => validChars.codePointAt(x % validChars.length));
  const randomState = String.fromCharCode.apply(null, array);
  return randomState as string;
};

const openPopup = (url) => {
  // To fix issues with window.screen in multi-monitor setups, the easier option is to
  // center the pop-up over the parent window.
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

const intervalRefs = [];

let intervalRef: IntervalRef = null;

// const closePopup = (popupRef) => {
//   popupRef.current?.close();
// };

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
      // console.warn(state);
      if (authResponse) {
        const objectAuthResponse = JSON.parse(authResponse);
        // console.warn(objectAuthResponse);
        if (objectAuthResponse.error) {
          onFailure(objectAuthResponse.error);
        } else if (objectAuthResponse.state !== state) {
          // console.warn(objectAuthResponse.state);
          // console.warn(state);
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
    // intervalRefs.push(state, interval);
    intervalRef = { state, interval };

    return () => {
      clearInterval(intervalRef.interval);
    };
    // Remove listener(s) on unmount
  }, []);

  return { getAuth };
};
