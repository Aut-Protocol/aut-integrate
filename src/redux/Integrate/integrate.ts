import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { ResultState } from '@store/result-status';
import { openSnackbar } from '@store/ui-reducer';
import { activatePaCommunity, partnerAgreementAccess } from '@api/skillwallet.api';
import { ParseSWErrorMessage } from '@utils/error-parser';
import { CommunityRole, DefaultRoles } from '@api/community.model';
import { Role, RoleSet } from '@api/api.model';

export interface IntegrateState {
  community: {
    name: string;
    image: string;
    description: string;
    market: number;
    roles: Role[];
    commitment: number;
    contractType: number;
    daoAddr: string;
  };
  status: ResultState;
  errorMessage: string;
  loadingMessage: string;
}

const initialState: IntegrateState = {
  community: {
    name: null,
    image: null,
    description: null,
    market: null,
    roles: [
      {
        id: 1,
        roleName: '',
      },
      {
        id: 2,
        roleName: '',
      },
      {
        id: 3,
        roleName: '',
      },
    ],
    commitment: null,
    contractType: null,
    daoAddr: null,
  },
  status: ResultState.Idle,
  errorMessage: null,
  loadingMessage: null,
};

export const validatePartnerAgreementKey = createAsyncThunk(
  'integrate/partner-agreement/validate-key',
  async (key: string, { dispatch, rejectWithValue }) => {
    try {
      const isKeyValid = await partnerAgreementAccess(key);
      if (isKeyValid) {
        dispatch(openSnackbar({ message: 'Valid Key', severity: 'success' }));
      }
      return Promise.resolve(isKeyValid);
    } catch (error) {
      const message = ParseSWErrorMessage(error);
      dispatch(openSnackbar({ message, severity: 'error' }));
      return rejectWithValue(message);
    }
  }
);

export const activatePartnersAgreement = createAsyncThunk(
  'integrate/partner-agreement/activate',
  async (requestBody: { communityAddr: string; partnersAddr: string; partnerKey: string }, { dispatch, getState, rejectWithValue }) => {
    try {
      return await activatePaCommunity(requestBody);
    } catch (error) {
      const message = error;
      return rejectWithValue(message);
    }
  }
);

export const integrateSlice = createSlice({
  name: 'integrate',
  initialState,
  reducers: {
    integrateUpdateCommunity(state: IntegrateState, action) {
      state.community = {
        ...state.community,
        ...action.payload,
      };
    },
    integrateUpdateStatus(state, action) {
      state.status = action.payload;
    },
    resetIntegrateState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(activatePartnersAgreement.pending, (state) => {
        state.status = ResultState.Updating;
        state.loadingMessage = 'Initiating SkillWallet.';
      })
      .addCase(activatePartnersAgreement.fulfilled, (state) => {
        state.status = ResultState.Idle;
        state.loadingMessage = null;
      })
      .addCase(activatePartnersAgreement.rejected, (state, action) => {
        state.status = ResultState.Failed;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { integrateUpdateStatus, integrateUpdateCommunity, resetIntegrateState } = integrateSlice.actions;

const roles = (state) => state.integrate.roles;
export const IntegrateStatus = (state: any) => state.integrate.status as ResultState;
export const IntegrateCommunity = (state: any) => state.integrate.community as typeof initialState.community;
export const IntegrateLoadingMessage = (state: any) => state.integrate.loadingMessage as boolean;
export const IntegrateErrorMessage = (state: any) => state.integrate.errorMessage as string;
export const getRoles = createSelector(roles, (x1): CommunityRole[] => {
  const [role1, role2, role3] = x1;
  return [
    {
      id: 4,
      roleName: role1?.value,
      skills: [],
      isCoreTeamMember: false,
    },
    {
      id: 5,
      roleName: role2?.value,
      skills: [],
      isCoreTeamMember: false,
    },
    {
      id: 6,
      roleName: role3?.value,
      skills: [],
      isCoreTeamMember: false,
    },
    ...DefaultRoles,
  ];
});

export default integrateSlice.reducer;
