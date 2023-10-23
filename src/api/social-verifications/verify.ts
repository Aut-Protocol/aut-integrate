import { createAsyncThunk } from "@reduxjs/toolkit";
import { verifyENS } from "./ens.verify";

export const verifySocial = createAsyncThunk(
  "integrate/verify/social",
  async (
    requestBody: {
      type: string;
      userAddress: string;
    },
    { rejectWithValue }
  ) => {
    if (requestBody.type === "ENS") {
      debugger;
      return verifyENS(requestBody.userAddress);
    }
  }
);
