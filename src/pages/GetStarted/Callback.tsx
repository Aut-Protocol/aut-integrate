import { Box, Button, Container, styled, Typography } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import { useAppDispatch } from "@store/store.model";
import {
  SelectedNetworkConfig,
  setProviderIsOpen
} from "@store/WalletProvider/WalletProvider";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AppTitle from "@components/AppTitle";
import {
  Mainnet,
  DAppProvider,
  useEtherBalance,
  useEthers,
  Config,
  Goerli
} from "@usedapp/core";

const Wrapper = styled(Container)({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  flexDirection: "column",
  height: "100%"
});

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
const OAUTH_RESPONSE = "react-use-oauth2-response";

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

const checkState = (receivedState) => {
  // const state = sessionStorage.getItem(TWITTER_STATE);
  // return state === receivedState;
  return true;
};

const queryToObject = (query) => {
  const parameters = new URLSearchParams(query);
  return Object.fromEntries(parameters.entries());
};

const Callback = (props) => {
  const { Component = <div>Loading...</div> } = props;
  console.warn(window.location);
  console.warn(window);
  console.warn(window.opener);

  // On mount
  useEffect(() => {
    const payload = queryToObject(window.location.search.split("?")[1]);
    const state = payload && payload.state;
    const error = payload && payload.error;
    console.warn(window.location);
    console.warn(window);
    console.warn(window.opener);
    console.warn(payload);
    // console.warn(!window.opener);
    // console.warn(typeof this);
    // console.warn(this);
    // console.warn(window.location.href);
    // setTimeout(() => {
    //   window.postMessage(
    //     JSON.stringify({ message: "SASSSTEST" }),
    //     window.location.href
    //   );
    // }, 2000);
    // window.postMessage("SASSSTEST", "http://127.0.0.1:3000");

    // const channel = new BroadcastChannel("app-data");
    // channel.postMessage(payload);
    // if (!window.opener) {
    //   throw new Error("Invalid Window Opener");
    // }
    // console.warn("IIIIIIIIIIIIIIIIIIIN");
    // if (error) {
    //   console.warn("error");
    //   window.opener.postMessage({
    //     type: OAUTH_RESPONSE,
    //     error: decodeURI(error) || "OAuth error: An error has occured."
    //   });
    // } else if (state && checkState(state)) {
    //   console.warn("MATCH");
    //   window.opener.postMessage({
    //     type: OAUTH_RESPONSE,
    //     payload
    //   });
    // } else {
    //   console.warn("CRAP");
    //   window.opener.postMessage({
    //     type: OAUTH_RESPONSE,
    //     error: "OAuth error: State mismatch."
    //   });
    // }
  }, []);

  return Component;
};

export default Callback;
