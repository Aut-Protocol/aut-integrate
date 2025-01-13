import { Route, Navigate, Routes, useLocation } from "react-router-dom";
import { Badge, Box, Button, styled, Tooltip } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Web3DautConnect from "@api/ProviderFactory/Web3NetworkProvider";
import { environment } from "@api/environment";
import AutSDK from "@aut-labs/sdk";
import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch } from "@store/store.model";
import AutLoading from "@components/AutLoading";
import SWSnackbar from "./components/snackbar";
import GetStarted from "./pages/GetStarted/GetStarted";
import { getAppConfig } from "@api/aut.api";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useSelector } from "react-redux";
import "./App.scss";
import {
  IsAllowListed,
  ScrollRestorationState,
  updateScrollState
} from "@store/ui-reducer";
import { updateWalletProviderState } from "@store/WalletProvider/WalletProvider";
import ErrorIcon from "@mui/icons-material/Error";
import { useWalletConnector } from "@aut-labs/connector";
import { useDisconnect } from "wagmi";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) =>
    prop !== "open" && prop !== "drawerWidth" && prop !== "toolbarHeight"
})<any>(({ theme, open, drawerWidth, toolbarHeight }) => ({
  border: 0,
  minHeight: `${toolbarHeight}px`,
  ".MuiToolbar-root": {
    minHeight: `${toolbarHeight}px`
  },
  [theme.breakpoints.up("md")]: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    })
  }
}));

const Integrate = lazy(() => import("./pages/Integrate"));

function App() {
  const dispatch = useAppDispatch();
  const { open, state } = useWalletConnector();
  const { disconnect } = useDisconnect();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const ps = useRef<HTMLElement>();
  const scrollRestorationState = useSelector(ScrollRestorationState);
  // const isAllowListed = useSelector(IsAllowListed);
  const isConnected = useMemo(() => {
    return state.status === "connected";
  }, [state.status]);

  const wrongNetwork = useMemo(() => {
    return (
      (state.address && state.chainId !== +environment.defaultChainId) ||
      state.isReadOnly
    );
  }, [state]);

  const connectDisconnectToggle = async () => {
    if (isConnected) {
      disconnect();
    } else {
      open();
    }
  };

  useEffect(() => {
    getAppConfig()
      .then(async (networks) => {
        dispatch(
          updateWalletProviderState({
            networksConfig: networks
          })
        );
        const sdk = new AutSDK({
          ipfs: {
            apiKey: environment.ipfsApiKey,
            secretApiKey: environment.ipfsApiSecret,
            gatewayUrl: environment.ipfsGatewayUrl
          }
        });
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (ps?.current) {
        ps.current.scrollTop = 0;
      }
    }, 0);
  }, [location?.pathname]);

  useEffect(() => {
    setTimeout(() => {
      if (ps?.current && scrollRestorationState === "scroll-top") {
        ps.current.scrollTop = 0;
        dispatch(updateScrollState("initial"));
      }
    }, 0);
  }, [scrollRestorationState]);

  return (
    <PerfectScrollbar
      containerRef={(el) => (ps.current = el)}
      options={{
        suppressScrollX: true,
        useBothWheelAxes: false,
        swipeEasing: true
      }}
      style={{
        height: "100vh"
      }}
    >
      {loading ? (
        <AutLoading width="130px" height="130px" />
      ) : (
        <>
          <Web3DautConnect />
          <SWSnackbar />
          <Box
            sx={{
              height: `100%`
              // marginTop: "50px"
            }}
          >
            <Box
              sx={{
                position: "absolute",
                display: "flex",
                zIndex: 9999,
                justifyContent: "flex-end",
                right: "30px",
                top: "20px"
              }}
            >
              <Badge
                color="error"
                invisible={!wrongNetwork || !isConnected}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
                }}
                sx={{
                  ".MuiBadge-badge": {
                    borderRadius: "12px",
                    width: "30px",
                    height: "30px"
                  }
                }}
                badgeContent={
                  <Tooltip
                    title="Wrong Network"
                    placement="bottom"
                    sx={{
                      width: "25px",
                      height: "25px"
                    }}
                  >
                    <ErrorIcon />
                  </Tooltip>
                }
              >
                <Button
                  onClick={connectDisconnectToggle}
                  sx={{
                    width: "200px",
                    height: "50px"
                  }}
                  color="offWhite"
                  variant="outlined"
                >
                  {isConnected ? "Disconnect" : "Connect"}
                </Button>
              </Badge>
            </Box>
            <Suspense fallback={<AutLoading width="130px" height="130px" />}>
              <Routes>
                <Route path="/" element={<GetStarted />} />
                {/* {!isAllowListed && (
                  <Route
                    path="*"
                    element={<Navigate to="/" state={{ from: location }} />}
                  />
                )}
                {isAllowListed && (
                  <Route path="/integrate/*" element={<Integrate />} />
                )} */}
                <Route path="/integrate/*" element={<Integrate />} />
              </Routes>
            </Suspense>
          </Box>
        </>
      )}
    </PerfectScrollbar>
  );
}

export default App;
