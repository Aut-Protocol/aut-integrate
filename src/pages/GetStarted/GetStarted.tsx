import { Box, Button, Container, styled, Typography } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import { useAppDispatch } from "@store/store.model";
import {
  SelectedNetworkConfig,
  setProviderIsOpen
} from "@store/WalletProvider/WalletProvider";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ReactComponent as GenesisImage } from "@assets/genesis.svg";

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

const GetStarted = () => {
  const dispatch = useAppDispatch();
  const [connectInitiated, setConnectInitiated] = useState(false);
  const { isActive } = useWeb3React();
  const networkConfig = useSelector(SelectedNetworkConfig);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!connectInitiated) {
      return;
    }
    if (isActive && networkConfig) {
      history.push({
        pathname: "/integrate",
        search: location.search
      });
    }
  }, [isActive, networkConfig]);

  const goToIntegrate = () => {
    setConnectInitiated(true);
    if (!isActive || !networkConfig) {
      dispatch(setProviderIsOpen(true));
    } else {
      history.push({
        pathname: "/integrate",
        search: location.search
      });
    }
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
        <Typography
          fontWeight="300"
          fontFamily="FractulAltLight"
          component="h1"
          variant="h1"
          color="white"
          mb={{
            xs: "32px",
            md: "46px",
            xxl: "100px"
          }}
        >
          <strong
            style={{
              fontFamily: "FractulAltBold"
            }}
          >
            Āut
          </strong>{" "}
          Expander
        </Typography>
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
          Integrate Āut
        </Button>
        <Button
          type="submit"
          variant="outlined"
          size="normal"
          color="offWhite"
          onClick={() => goToIntegrate()}
        >
          Start from scratch
        </Button>
      </Box>
    </Wrapper>
  );
};

export default GetStarted;
