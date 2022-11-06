import { withRouter, Switch, Route } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import Web3NetworkProvider from "@api/ProviderFactory/components/Web3NetworkProvider";
import NotFound from "@components/NotFound";
import { environment } from "@api/environment";
import AutSDK from "@aut-protocol/sdk";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@store/store.model";
import { setNetworks } from "@store/WalletProvider/WalletProvider";
import Web3AutProvider from "@api/ProviderFactory/components/Web3Provider";
import AutLoading from "@components/AutLoading";
import SWSnackbar from "./components/snackbar";
import GetStarted from "./pages/GetStarted/GetStarted";
import Integrate from "./pages/Integrate";
import "./App.scss";
import { getAppConfig } from "@api/aut.api";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAppConfig()
      .then(async (res) => {
        dispatch(setNetworks(res));
        const sdk = new AutSDK({
          nftStorageApiKey: environment.nftStorageKey
        });
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <AutLoading />
      ) : (
        <Web3AutProvider>
          <Web3NetworkProvider />
          <CssBaseline />
          <SWSnackbar />
          <Box
            sx={{
              height: `100%`
            }}
          >
            <Switch>
              <Route exact component={GetStarted} path="/" />
              <Route path="/integrate" component={Integrate} />
              <Route component={NotFound} />
            </Switch>
          </Box>
        </Web3AutProvider>
      )}
    </>
  );
}

export default withRouter(App);
