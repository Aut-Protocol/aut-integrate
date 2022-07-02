import { combineReducers } from 'redux';
import uiSliceReducer from './ui-reducer';
import integrateReducer from './Integrate/integrate';

export const reducers = combineReducers({
  ui: uiSliceReducer,
  integrate: integrateReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_APP') {
    state = undefined;
  }
  return reducers(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
