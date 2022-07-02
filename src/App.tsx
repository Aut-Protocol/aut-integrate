import { useEffect } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import { useAppDispatch } from '@store/store.model';
import NotFound from '@components/NotFound';
import detectEthereumProvider from '@metamask/detect-provider';
import { openSnackbar } from '@store/ui-reducer';
import SWSnackbar from './components/snackbar';
import GetStarted from './pages/GetStarted/GetStarted';
import Integrate from './pages/Integrate';
import './App.scss';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const checkForEthereumProvider = async () => {
      let ethereum: typeof window.ethereum;
      try {
        ethereum = await detectEthereumProvider();
      } catch (e) {
        console.log(e);
      }
      if (!ethereum) {
        dispatch(
          openSnackbar({
            message: 'Please install MetaMask and refresh the page to use the full array of Partner features.',
            severity: 'error',
            duration: 30000,
          })
        );
      }
    };
    checkForEthereumProvider();
  }, []);

  return (
    <>
      <CssBaseline />
      <SWSnackbar />
      <Box
        sx={{
          height: `100%`,
          backgroundColor: '#000',
        }}
      >
        <Switch>
          <Route exact component={GetStarted} path="/" />
          <Route path="/integrate" component={Integrate} />
          <Route component={NotFound} />
        </Switch>
      </Box>
    </>
  );
}

export default withRouter(App);
