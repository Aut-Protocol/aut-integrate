import AutSDK, { getOverrides, HubNFT } from "@aut-labs/sdk";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createHub = createAsyncThunk(
  "integrate/create/hub",
  async (
    requestBody: {
      skipBiconomy: boolean;
      metadata: HubNFT;
      contractType: number;
      daoAddr: string;
      userAddress: string;
    },
    { rejectWithValue }
  ) => {
    const sdk = await AutSDK.getInstance();
    sdk.hubRegistry.contract.skipBiconomy = true;
    const roleIds = requestBody.metadata.properties.rolesSets[0].roles.map(
      (role) => role.id
    );
    const overrides = await getOverrides(sdk.signer);
    const response = await sdk.hubRegistry.deployHub(
      roleIds,
      requestBody.metadata.properties.market as number,
      requestBody.metadata.properties.minCommitment,
      requestBody.metadata,
      overrides
    );
    if (response?.isSuccess) {
      return response.data;
    }
    return rejectWithValue(response?.errorMessage);
  }
);
