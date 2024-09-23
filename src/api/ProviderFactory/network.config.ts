import { DeployedContracts } from "@aut-labs/sdk";

export interface NetworkConfig {
  network: string;
  name: string;
  chainId: string | number;
  rpcUrls: string[];
  explorerUrls: string[];
  biconomyApiKey: string;
  contracts: DeployedContracts;
  disabled: boolean;
  nativeCurrency: any;
}
