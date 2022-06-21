import { useEffect, useState } from 'react';
import { withRouter, Switch, Route, Redirect as RedirectRoute, useLocation, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, CssBaseline } from '@mui/material';
import { ReactComponent as AutLogo } from '@assets/aut/logo.svg';
import Redirect from '@components/Redirect';
import { resetAuthState, setAuthenticated } from '@auth/auth.reducer';
import { RootState, useAppDispatch } from '@store/store.model';
import NotFound from '@components/NotFound';
import { environment } from '@api/environment';
import { InitSwAuth } from '@skill-wallet/auth';
import detectEthereumProvider from '@metamask/detect-provider';
import { openSnackbar } from '@store/ui-reducer';
import Partners from './pages/Partners';
import SWSnackbar from './components/snackbar';
import GetStarted from './pages/GetStarted/GetStarted';
import './App.scss';
import Integrate from './pages/Integrate';

const LoadingMessage = () => (
  <div className="app-loading">
    <AutLogo width="80" height="80" />
  </div>
);

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation<any>();
  const history = useHistory();
  const [isLoading, setLoading] = useState(true);
  const { isAutheticated } = useSelector((state: RootState) => state.auth);

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

  useEffect(() => {
    const onSWLogin = async ({ detail }: any) => {
      const isLoggedIn = true;
      if (isLoggedIn) {
        dispatch(
          setAuthenticated({
            isAuthenticated: isLoggedIn,
            userInfo: {},
          })
        );
        const shouldGoToDashboard = location.pathname === '/' || location.pathname === '/integrate';
        const goTo = shouldGoToDashboard ? 'partner/dashboard' : location.pathname;
        const returnUrl = location.state?.from;
        history.push(returnUrl || goTo);
      } else {
        dispatch(resetAuthState());
        history.push('/');
      }
    };

    const onSWInit = async () => setLoading(false);
    onSWInit();

    window.addEventListener('initAutAuth', onSWInit);
    window.addEventListener('onAutLogin', onSWLogin);

    InitSwAuth({ container: document.querySelector('#connect-wallet-container') });

    return () => {
      window.removeEventListener('initAutAuth', onSWInit);
      window.removeEventListener('onAutLogin', onSWLogin);
    };
  }, [dispatch, history, location.pathname, location.state?.from]);

  const isIntegrateFlow = location?.pathname?.includes('integrate');
  const isRedirect = location?.pathname?.includes('redirect');
  const isGetStarted = location?.pathname === '/';
  const hideDashboard = !environment.hideDashboard || environment.hideDashboard === 'true';

  return (
    <>
      <div id="connect-wallet-container" />
      <CssBaseline />
      <SWSnackbar />
      {/* <AppBar elevation={0} position="relative" sx={{ p: 0, zIndex: (s) => s.zIndex.drawer + 1, backgroundColor: '#000', border: 0 }}>
      </AppBar> */}
      <Box
        sx={{
          height: `calc(100%)`,
          backgroundColor: '#000',
        }}
        className={isLoading ? 'sw-loading' : ''}
      >
        {/* <div className="connect-wallet-container">
          <sw-auth
            partner-key={environment.partnersKey}
            hide-button={isLoading || isIntegrateFlow || isRedirect}
            disable-create-new-user={!isIntegrateFlow}
            use-dev="true"
          />
        </div> */}
        {isLoading ? (
          <LoadingMessage />
        ) : (
          <Switch>
            <Route exact component={GetStarted} path="/" />
            {!isAutheticated && <Route path="/integrate" component={Integrate} />}
            <Route path="/redirect" component={Redirect} />
            <Route path="/partner" component={Partners} />
            {isAutheticated ? <Route component={NotFound} /> : <RedirectRoute to={{ pathname: '/', state: { from: location.pathname } }} />}
          </Switch>
        )}
      </Box>
    </>
  );
}

export default withRouter(App);
