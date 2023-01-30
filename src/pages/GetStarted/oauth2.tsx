import { useCallback, useState, useRef } from "react";

const TWITTER_STATEconsumerKey = "Y6DvFzusISLM3nUlQXUvrcAfr";
const TWITTER_STATEconsumerSecret =
  "FIqv1yHtM1RnaNiwzSJscIv6rojHbTbkakITiUUmqvejZftoZd";
const TWITTER_STATEclientId = "YWRmaEY4LU9aSkRXd2NoZlpiLVU6MTpjaQ";
const TWITTER_STATEclientSecret =
  "Ib7bxg7_5hIK9xatq5ZfVf_Gx_ew9pmORS_c4xYKeW7GUIIFY1";
export const TWITTER_STATE = "twitter-state";
const TWITTER_CODE_CHALLENGE = "challenge";
const TWITTER_AUTH_URL = "https://twitter.com/i/oauth2/authorize";
const TWITTER_SCOPE = ["tweet.read", "users.read", "offline.access"].join(" ");

export const getTwitterOAuthUrl = (redirectUri: string) =>
  getURLWithQueryParams(TWITTER_AUTH_URL, {
    response_type: "code",
    client_id: TWITTER_STATEclientId,
    redirect_uri: redirectUri,
    scope: TWITTER_SCOPE,
    state: TWITTER_STATE,

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

const OAUTH_STATE_KEY = "react-use-oauth2-state-key";
const POPUP_HEIGHT = 700;
const POPUP_WIDTH = 600;
const OAUTH_RESPONSE = "react-use-oauth2-response";

// https://medium.com/@dazcyril/generating-cryptographic-random-state-in-javascript-in-the-browser-c538b3daae50
// const generateState = () => {
//   const validChars =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let array = new Uint8Array(40);
//   window.crypto.getRandomValues(array);
//   array = array.map((x) => validChars.codePointAt(x % validChars.length));
//   const randomState = String.fromCharCode.apply(null, array);
//   return randomState;
// };

// const saveState = (state) => {
//   sessionStorage.setItem(OAUTH_STATE_KEY, state);
// };

const removeState = () => {
  sessionStorage.removeItem(OAUTH_STATE_KEY);
};

const openPopup = (url) => {
  // To fix issues with window.screen in multi-monitor setups, the easier option is to
  // center the pop-up over the parent window.
  const top = window.outerHeight / 2 + window.screenY - POPUP_HEIGHT / 2;
  const left = window.outerWidth / 2 + window.screenX - POPUP_WIDTH / 2;
  console.log("window", window);
  const win = window.open(
    url,
    "",
    `height=${POPUP_HEIGHT},width=${POPUP_WIDTH},top=${top},left=${left}`
  );
  return win;
};

const closePopup = (popupRef) => {
  popupRef.current?.close();
};

const cleanup = (intervalRef, popupRef, handleMessageListener) => {
  clearInterval(intervalRef.current);
  closePopup(popupRef);
  removeState();
  window.removeEventListener("message", handleMessageListener);
};

export const useOAuth2 = (props = null) => {
  // const { authorizeUrl, clientId, redirectUri, scope = "" } = props;

  const popupRef = useRef();
  const intervalRef = useRef();

  const getAuth = useCallback(() => {
    // 1. Init

    // 2. Generate and save state
    // const state = generateState();
    // saveState(state);

    // 3. Open popup
    const popWindow = openPopup(
      getTwitterOAuthUrl("http://localhost:3000/callback")
    );

    setInterval(() => {
      console.log("inside", popWindow);
      console.log("loc", popWindow.location);
    }, 2000);

    // const channel = new BroadcastChannel("app-data");
    // channel.addEventListener("message", (event) => {
    //   console.log("BroadcastChannel");
    //   console.log(event.data);
    // });

    // window.addEventListener(
    //   "message",
    //   (response) => {
    //     console.log(response.data);
    //   },
    //   false
    // );

    popWindow.addEventListener(
      "message",
      (response) => {
        console.log(response.data);
      },
      false
    );

    // window.addEventListener("message", function (event) {
    //   console.log("SUCCESS");
    //   console.log(event.data);
    // });

    // document.addEventListener("testttt", function () {
    //   console.warn("SUCCESSSS");
    // });

    // 4. Register message listener
    // async function handleMessageListener(message) {
    //   console.warn("MESSAGE");
    //   console.warn(message.data.type);
    //   console.warn(message.data);
    //   console.warn(message);
    //   try {
    //     const type = message && message.data && message.data.type;
    //     if (type === OAUTH_RESPONSE) {
    //       console.warn("innnnn");
    //       console.log(JSON.stringify(message));
    //       console.log(JSON.stringify(message));
    //       console.log(JSON.stringify(message));
    //       console.log(JSON.stringify(message));
    //       console.log(JSON.stringify(message));
    //       const errorMaybe = message && message.data && message.data.error;
    //       if (errorMaybe) {
    //         // setUI({
    //         //   loading: false,
    //         //   error: errorMaybe || "Unknown Error"
    //         // });
    //       } else {
    //         const code =
    //           message &&
    //           message.data &&
    //           message.data.payload &&
    //           message.data.payload.code;
    //         console.warn(code);
    //         debugger;
    //       }
    //     }
    //   } catch (genericError) {
    //     console.error(genericError);
    //     // setUI({
    //     //   loading: false,
    //     //   error: genericError.toString()
    //     // });
    //   } finally {
    //     // Clear stuff ...
    //     cleanup(intervalRef, popupRef, handleMessageListener);
    //   }
    // }
    // window.addEventListener("message", handleMessageListener);

    // 4. Begin interval to check if popup was closed forcefully by the user
    // (intervalRef.current as any) = setInterval(() => {
    //   const popupClosed =
    //     !popupRef.current ||
    //     // @ts-ignore
    //     !popupRef.current.window ||
    //     // @ts-ignore
    //     popupRef.current.window.closed;
    //   if (popupClosed) {
    //     console.warn("OOOPS");
    //     console.warn(popupRef.current);
    //     // // Popup was closed before completing auth...
    //     // setUI((ui) => ({
    //     //   ...ui,
    //     //   loading: false
    //     // }));
    //     // console.warn(
    //     //   "Warning: Popup was closed before completing authentication."
    //     // );
    //     // clearInterval(intervalRef.current);
    //     // removeState();
    //     // window.removeEventListener("message", handleMessageListener);
    //   }
    // }, 250);
    return popWindow;
    // Remove listener(s) on unmount
  }, []);

  return { getAuth };
};
