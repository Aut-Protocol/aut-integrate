import { withRouter, Switch, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Web3NetworkProvider from '@api/ProviderFactory/components/Web3NetworkProvider';
import NotFound from '@components/NotFound';
import SWSnackbar from './components/snackbar';
import GetStarted from './pages/GetStarted/GetStarted';
import Integrate from './pages/Integrate';
import './App.scss';

function App() {
  return (
    <>
      <Web3NetworkProvider />
      <CssBaseline />
      <SWSnackbar />
      <Box
        sx={{
          height: `100%`,
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
