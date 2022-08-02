/* eslint-disable no-shadow */
import { AlertColor } from '@mui/material/Alert';

export interface SnackbarPayload {
  message: string;
  severity?: AlertColor;
  duration?: number;
}

export interface NetworkConfig {
  autIdAddress: string;
  registryAddress: string;
  network: {
    name: string;
    rpcUrls: string[];
    chainId: number;
    blockExplorerUrls: string[];
  };
}
