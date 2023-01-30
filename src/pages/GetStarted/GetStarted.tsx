import { Box, Button, Container, styled, Typography } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import { useAppDispatch } from "@store/store.model";
import {
  SelectedNetworkConfig,
  setProviderIsOpen
} from "@store/WalletProvider/WalletProvider";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as GenesisImage } from "@assets/genesis.svg";
import AppTitle from "@components/AppTitle";
import {
  Mainnet,
  DAppProvider,
  useEtherBalance,
  useEthers,
  Config,
  Goerli
} from "@usedapp/core";
import { useOAuth2 } from "./oauth2";

const Wrapper = styled(Container)({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  flexDirection: "column",
  height: "100%"
});

const GenesisImageWrapper = styled(GenesisImage)(({ theme }) => ({
  width: "100%",
  zIndex: "-1",
  position: "absolute",
  top: "50%",
  display: "none",
  transform: "translateY(-50%)",
  [theme.breakpoints.up("md")]: {
    display: "inherit",
    height: "662px",
    maxWidth: "662px",
    right: "calc(662px / 2 * -1)"
  },
  [theme.breakpoints.up("xxl")]: {
    height: "892px",
    maxWidth: "892px",
    right: "calc(892px / 2 * -1)"
  }
}));

const TWITTER_STATEconsumerKey = "Y6DvFzusISLM3nUlQXUvrcAfr";
const TWITTER_STATEconsumerSecret =
  "FIqv1yHtM1RnaNiwzSJscIv6rojHbTbkakITiUUmqvejZftoZd";
const TWITTER_STATEclientId = "YWRmaEY4LU9aSkRXd2NoZlpiLVU6MTpjaQ";
const TWITTER_STATEclientSecret =
  "Ib7bxg7_5hIK9xatq5ZfVf_Gx_ew9pmORS_c4xYKeW7GUIIFY1";
export const TWITTER_STATE = "twitter-state";
const TWITTER_CODE_CHALLENGE = "challenge";
const TWITTER_AUTH_URL = "https://twitter.com/i/oauth2/authorize";
const TWITTER_SCOPE = ["tweet.read"].join(" ");

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

const GetStarted = () => {
  const dispatch = useAppDispatch();
  const [connectInitiated, setConnectInitiated] = useState(false);
  const [canStartFromScratch, setCanStartFromScratch] = useState(false);
  const [popup, setPopup] = useState(null);
  const { active } = useEthers();
  const networkConfig = useSelector(SelectedNetworkConfig);
  const history = useHistory();
  const location = useLocation();
  const { getAuth } = useOAuth2();

  useEffect(() => {
    if (!connectInitiated) {
      return;
    }
    if (active && networkConfig) {
      start(canStartFromScratch);
    }
  }, [active, networkConfig, canStartFromScratch]);

  const goToIntegrate = (startFromScratch = false) => {
    setConnectInitiated(true);
    setCanStartFromScratch(startFromScratch);
    if (!active || !networkConfig) {
      dispatch(setProviderIsOpen(true));
    } else {
      start(startFromScratch);
    }
  };

  // const POPUP_HEIGHT = 700;
  // const POPUP_WIDTH = 600;

  // const openPopup = (url) => {
  //   // To fix issues with window.screen in multi-monitor setups, the easier option is to
  //   // center the pop-up over the parent window.
  //   const top = window.outerHeight / 2 + window.screenY - POPUP_HEIGHT / 2;
  //   const left = window.outerWidth / 2 + window.screenX - POPUP_WIDTH / 2;
  //   return window.open(
  //     url,
  //     "OAuth2 Popup",
  //     `height=${POPUP_HEIGHT},width=${POPUP_WIDTH},top=${top},left=${left}`
  //   );
  // };

  const twitter = () => {
    const popup = getAuth();

    setInterval(() => {
      console.warn(window.localStorage.getItem("code"));
    }, 2000);
    // console.warn(result);
    console.log("TWEET");
  };

  const start = (startFromScratch: boolean) => {
    const qParams = new URLSearchParams(location.search);
    qParams.set("startFromScratch", `${startFromScratch}`);
    history.push({
      pathname: "/integrate",
      search: qParams.toString()
    });
  };

  return (
    <Wrapper>
      <GenesisImageWrapper />
      <Box
        maxWidth={{
          xs: "100%",
          md: "600px",
          lg: "700px",
          xl: "800px",
          xxl: "900px"
        }}
      >
        <AppTitle
          mb={{
            xs: "32px",
            md: "46px",
            xxl: "100px"
          }}
        />
        <Typography
          component="p"
          variant="subtitle1"
          fontFamily="FractulAltBold"
          mb={{
            xs: "16px",
            md: "24px",
            xxl: "35px"
          }}
          color="white"
        >
          Do more with your DAO.
        </Typography>
        <Typography
          component="p"
          variant="subtitle2"
          mb={{
            xs: "16px",
            md: "24px",
            xxl: "35px"
          }}
          color="white"
        >
          Āut is an expandable Community protocol, powering the next level of
          collective coordination 🤝🫂
        </Typography>
        <Typography
          component="p"
          variant="subtitle2"
          mb={{
            xs: "16px",
            md: "24px",
            xxl: "35px"
          }}
          color="white"
        >
          By integrating it, you can expand your DAO contract - adding the
          concepts of Members Roles & Interactions directly on-chain.
        </Typography>
        <Typography
          component="p"
          variant="subtitle2"
          mb={{
            xs: "16px",
            md: "24px",
            xxl: "35px"
          }}
          color="white"
        >
          Assign Roles to your Community - and kick off role-based working
          routines and role-weighted governance in seconds.
        </Typography>
        <Typography component="p" variant="subtitle2" color="white">
          There is no community like yours - create your own Standards. Opt Āut.
        </Typography>
      </Box>
      <Box
        sx={{
          gridGap: "30px",
          display: "flex",
          justifyContent: "center",
          mt: {
            xs: "20px",
            lg: "35px",
            xxl: "80px"
          }
        }}
        className="right-box"
      >
        <Button
          type="submit"
          variant="outlined"
          size="normal"
          color="offWhite"
          onClick={() => goToIntegrate()}
        >
          Expand
        </Button>
        <Button
          type="submit"
          variant="outlined"
          size="normal"
          color="offWhite"
          onClick={() => goToIntegrate(true)}
        >
          Start from scratch
        </Button>
        <Button
          type="submit"
          variant="outlined"
          size="normal"
          color="offWhite"
          onClick={() => twitter()}
        >
          TWITT
        </Button>
      </Box>
    </Wrapper>
  );
};

export default GetStarted;
