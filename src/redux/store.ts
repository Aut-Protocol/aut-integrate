import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import * as Sentry from '@sentry/react';
import { reducers } from './reducers';

const sentryReduxEnhancer = Sentry.createReduxEnhancer({
  // Optionally pass options listed below
});

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
  reducer: reducers,
  enhancers: [sentryReduxEnhancer],
});

export default store;
