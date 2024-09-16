import { useAppDispatch } from "@store/store.model";
import {
  NetworksConfig,
  updateWalletProviderState
} from "@store/WalletProvider/WalletProvider";
import { useSelector } from "react-redux";
import AppTitle from "@components/AppTitle";
import AutLoading from "@components/AutLoading";
import AutSDK, { MultiSigner } from "@aut-labs/sdk";
import { memo, useEffect } from "react";
import { NetworkConfig } from "./network.config";
import { AutWalletConnector, useAutConnector } from "@aut-labs/connector";

function Web3DautConnect() {
  const dispatch = useAppDispatch();
  const networks = useSelector(NetworksConfig);
  const { connect, multiSigner, multiSignerId, chainId } = useAutConnector();

  const initialiseSDK = async (
    network: NetworkConfig,
    multiSigner: MultiSigner
  ) => {
    const sdk = await AutSDK.getInstance(false);
    await sdk.init(multiSigner, {
      hubRegistryAddress: network.contracts.hubRegistryAddress,
      autIDAddress: network.contracts.autIDAddress
    });
  };

  useEffect(() => {
    const start = async () => {
      let network = networks.find((d) => d.chainId === chainId);
      if (!network) {
        network = networks.filter((d) => !d.disabled)[0];
      }
      await initialiseSDK(network, multiSigner);
      await dispatch(
        updateWalletProviderState({
          selectedNetwork: network
        })
      );
    };
    if (multiSignerId) {
      start();
    }
  }, [multiSignerId]);

  return (
    <AutWalletConnector
      connect={connect}
      titleContent={
        <AppTitle
          mb={{
            xs: "16px",
            lg: "24px",
            xxl: "32px"
          }}
          variant="h2"
        />
      }
      loadingContent={<AutLoading width="130px" height="130px" />}
    />
  );
}

export default memo(Web3DautConnect);
