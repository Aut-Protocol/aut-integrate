import AutSDK from "@aut-protocol/sdk";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Community } from "./community.model";

export const isMemberOfDao = createAsyncThunk(
  "membership-checker/is-member",
  async (
    requestBody: { daoAddr: string; daoType: number },
    { rejectWithValue }
  ) => {
    const sdk = AutSDK.getInstance();
    const response = await sdk.daoTypes.isMember(
      requestBody.daoAddr,
      requestBody.daoType
    );
    if (response?.isSuccess) {
      return response.data;
    }
    return rejectWithValue(response?.errorMessage);
  }
);

export const createCommunity = createAsyncThunk(
  "integrate/create/community",
  async (
    requestBody: { metadata: Community; contractType: number; daoAddr: string },
    { rejectWithValue }
  ) => {
    const sdk = AutSDK.getInstance();
    const response = await sdk.daoExpanderRegistry.deployDAOExpander(
      requestBody.contractType,
      requestBody.daoAddr,
      requestBody.metadata.properties.market as number,
      requestBody.metadata.properties.commitment,
      requestBody.metadata
    );

    if (response?.isSuccess) {
      return response.data;
    }
    return rejectWithValue(response?.errorMessage);
  }
);
