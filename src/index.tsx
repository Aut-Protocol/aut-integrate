import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from '@store/store';
import Web3AutProvider from '@api/ProviderFactory/components/Web3Provider';
import { swEnvVariables, environment } from '@api/environment';
import { ensureVariablesExist } from 'sw-web-shared';
import { Buffer } from 'buffer';
// import * as Sentry from '@sentry/react';
// import { BrowserTracing } from '@sentry/tracing';
// import SentryRRWeb from '@sentry/rrweb';
import { BiconomyProvider } from '@api/ProviderFactory/web-biconimy';
import { SwTheme } from './theme';
import reportWebVitals from './reportWebVitals';
import App from './App';

// console.log(Buffer, 'Buffer');
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-var-requires
// window.Buffer = require('buffer/').Buffer;

// @ts-ignore
window.Buffer = Buffer;

// Sentry.init({
//   dsn: 'https://e8018550ad7742088d62be4084909caf@o1432500.ingest.sentry.io/4503899050278912',
//   integrations: [new BrowserTracing(), new SentryRRWeb()],
//   tracesSampleRate: 1.0,
// });

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={SwTheme}>
      <Provider store={store}>
        <BrowserRouter>
          <Web3AutProvider>
            <BiconomyProvider>
              <App />
            </BiconomyProvider>
          </Web3AutProvider>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </StyledEngineProvider>,
  document.getElementById('root')
);

ensureVariablesExist(environment, swEnvVariables);
reportWebVitals(null);
