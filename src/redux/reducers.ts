import { combineReducers } from 'redux';
import uiSliceReducer from './ui-reducer';
import integrateReducer from './Integrate/integrate';
import walletProviderReduce from './WalletProvider/WalletProvider';

export const reducers = combineReducers({
  ui: uiSliceReducer,
  integrate: integrateReducer,
  walletProvider: walletProviderReduce,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_APP') {
    state = undefined;
  }
  return reducers(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
