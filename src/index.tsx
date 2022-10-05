import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from '@store/store';
import Web3AutProvider from '@api/ProviderFactory/components/Web3Provider';
import { swEnvVariables, environment, EnvMode } from '@api/environment';
import { ensureVariablesExist } from 'sw-web-shared';
import { Buffer } from 'buffer';
import markerSDK from '@marker.io/browser';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import SentryRRWeb from '@sentry/rrweb';
import { SwTheme } from './theme';
import reportWebVitals from './reportWebVitals';
import App from './App';

// @ts-ignore
window.Buffer = Buffer;

markerSDK.loadWidget({
  destination: `${process.env.REACT_APP_MARKER}`,
  reporter: {
    email: 'frontend@aut.id',
    fullName: 'Aut Integrate',
  },
});

Sentry.init({
  dsn: `https://e8018550ad7742088d62be4084909caf@o1432500.ingest.sentry.io/${process.env.REACT_APP_SENTRY}`,
  integrations: [new BrowserTracing(), new SentryRRWeb({})],
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={SwTheme}>
      <Provider store={store}>
        <BrowserRouter>
          <Web3AutProvider>
            <App />
          </Web3AutProvider>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </StyledEngineProvider>,
  document.getElementById('root')
);

ensureVariablesExist(environment, swEnvVariables);
reportWebVitals(null);
