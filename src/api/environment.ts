import { envionmentGenerator } from "@utils/env";

export enum EnvMode {
  Production = "production",
  Development = "development"
}

export const swEnvVariables = {
  // app config
  env: "VITE_NODE_ENV",
  apiUrl: "VITE_API_URL",

  // Networks
  networkEnv: "VITE_NETWORK_ENV",
  defaultChainId: "VITE_DEFAULT_CHAIN_ID",

  // IPFS storage
  ipfsApiKey: "VITE_IPFS_API_KEY",
  ipfsApiSecret: "VITE_IPFS_API_SECRET",
  ipfsGatewayUrl: "VITE_IPFS_GATEWAY_URL"
};

export const environment: typeof swEnvVariables =
  envionmentGenerator(swEnvVariables);

export const autUrls = () => {
  if (environment.env === EnvMode.Development) {
    return {
      myAut: "https://internal.os.aut.id/",
      hub: "https://internal.hub.sbs/",
      launchpad: "https://internal.launch.hub.sbs/"
    };
  }

  return {
    myAut: "https://os.aut.id/",
    hub: "https://hub.sbs/",
    launchpad: "https://launch.hub.sbs/"
  };
};
