import AutSDK, { HubNFT, SDKContractGenericResponse } from "@aut-labs/sdk";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCache, updateCache } from "./cache.api";

export const isMemberOfDao = createAsyncThunk(
  "membership-checker/is-member",
  async (
    requestBody: { daoAddr: string; daoType: number },
    { rejectWithValue }
  ) => {
    const sdk = await AutSDK.getInstance();
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
    let response: SDKContractGenericResponse<string>;

    sdk.hubRegistry.contract.skipBiconomy = true;

    if (requestBody.daoAddr) {
      sdk.daoExpanderRegistry.contract.skipBiconomy = true;
      response = await sdk.daoExpanderRegistry.deployDAOExpander(
        requestBody.contractType,
        requestBody.daoAddr,
        requestBody.metadata.properties.market as number,
        requestBody.metadata.properties.minCommitment,
        requestBody.metadata
      );
    } else {
      // start from scratch
      response = await sdk.hubRegistry.deployHub(
        requestBody.metadata.properties.market as number,
        requestBody.metadata.properties.minCommitment,
        requestBody.metadata
      );
    }
    if (response?.isSuccess) {
      try {
        const cache = await getCache("UserPhases", requestBody?.userAddress);
        if (cache) {
          cache.list[0].status = 1;
          await updateCache(cache);
        } else {
          await updateCache({
            cacheKey: "UserPhases",
            address: requestBody.userAddress,
            daoAddress: response.data,
            startDate: new Date().getTime(),
            list: [
              {
                phase: 1,
                status: 1
              },
              {
                phase: 2,
                status: 0
              },
              {
                phase: 3,
                status: 0
              }
            ]
          });
        }
      } catch (error) {
        // handle error
      }
      return response.data;
    }
    return rejectWithValue(response?.errorMessage);
  }
);
