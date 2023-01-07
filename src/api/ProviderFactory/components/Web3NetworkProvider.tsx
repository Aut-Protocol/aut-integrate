import { useAppDispatch } from "@store/store.model";
import {
  ConnectorTypes,
  NetworksConfig,
  NetworkSelectorIsOpen,
  SelectedNetworkConfig,
  SelectedWalletType,
  setNetwork,
  setProviderIsOpen,
  setSigner
} from "@store/WalletProvider/WalletProvider";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { styled, Typography } from "@mui/material";
import AutLoading from "@components/AutLoading";
import DialogWrapper from "@components/Dialog/DialogWrapper";
import AutSDK from "@aut-labs-private/sdk";
import type { Connector } from "@web3-react/types";
import ConnectorBtn from "./ConnectorBtn";
import { NetworkSelectors } from "./NetworkSelectors";
import { EnableAndChangeNetwork } from "../web3.network";
import { SDKBiconomyWrapper } from "@aut-labs-private/sdk-biconomy";
import { ethers } from "ethers";
import AppTitle from "@components/AppTitle";

const DialogInnerContent = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
  gridGap: "30px"
});

const Web3NetworkProvider = ({ fullScreen = false }: any) => {
  const dispatch = useAppDispatch();
  const isOpen = useSelector(NetworkSelectorIsOpen);
  const wallet = useSelector(SelectedWalletType);
  const networks = useSelector(NetworksConfig);
  const networkConfig = useSelector(SelectedNetworkConfig);
  const { isActive, chainId, provider } = useWeb3React();

  const [connector, setConnector] = useState<Connector>(null);
  const [switchingNetwork, setSwitchingNetwork] = useState(false);
  const [connectedEagerly, setConnectEagerly] = useState(false);

  const switchNetwork = async (c: Connector, chainId: number) => {
    if (!c) {
      return;
    }
    setSwitchingNetwork(true);
    // await c.deactivate();
    await c.activate(chainId);
    const config = networks.find(
      (n) => n.chainId?.toString() === chainId?.toString()
    );
    try {
      await EnableAndChangeNetwork(c.provider, config);
      await dispatch(setNetwork(config.network));
    } catch (error) {
      // console.log(error);
    }
    setSwitchingNetwork(false);
  };

  const changeConnector = async (c: Connector) => {
    // @ts-ignore
    const foundChainId = Number(c?.provider?.chainId);
    const index = networks
      .map((n) => n.chainId?.toString())
      .indexOf(foundChainId?.toString());
    const chainAllowed = index !== -1;
    if (chainAllowed) {
      const config = networks.find(
        (n) => n.chainId?.toString() === foundChainId?.toString()
      );
      dispatch(setNetwork(config.network));
      setConnectEagerly(true);
    }
    setConnector(c);
  };

  const initialiseSDK = async (signer: ethers.providers.JsonRpcSigner) => {
    const sdk = AutSDK.getInstance();
    const biconomy =
      networkConfig.biconomyApiKey &&
      new SDKBiconomyWrapper({
        enableDebugMode: true,
        apiKey: networkConfig.biconomyApiKey,
        contractAddresses: [
          networkConfig.contracts.daoExpanderRegistryAddress,
          networkConfig.contracts.autDaoRegistryAddress
        ]
      });
    await sdk.init(
      signer,
      {
        daoTypesAddress: networkConfig.contracts.daoTypesAddress,
        autDaoRegistryAddress: networkConfig.contracts.autDaoRegistryAddress,
        autIDAddress: networkConfig.contracts.autIDAddress,
        daoExpanderRegistryAddress:
          networkConfig.contracts.daoExpanderRegistryAddress
      },
      biconomy
    );
  };

  useEffect(() => {
    const previousChainId = connectedEagerly
      ? chainId
      : provider?._network?.chainId;

    const currentChainId = chainId;
    const index = networks
      .map((n) => n.chainId?.toString())
      .indexOf(currentChainId?.toString());

    const chainAllowed = index !== -1;
    const hasNetworkConfig = !!networkConfig;
    const isSameNetwork = previousChainId === chainId;
    const shouldSelectCorrectNetwork = !chainAllowed && !!chainId;

    if (switchingNetwork || !provider || !chainId || !isActive) {
      const shouldActivateConnector =
        !isActive && chainAllowed && previousChainId && chainId;
      if (shouldActivateConnector) {
        console.warn("Activating network...");
        connector.activate(chainId);
      } else if (shouldSelectCorrectNetwork && !isOpen) {
        console.warn("Opening popup...");
        dispatch(setProviderIsOpen(true));
      }
      return;
    }

    const shouldUpdateSigner = chainAllowed && isActive && isSameNetwork;
    const shouldSwitchNetwork =
      isActive &&
      chainAllowed &&
      hasNetworkConfig &&
      previousChainId &&
      currentChainId &&
      !isSameNetwork;

    console.log("connectedEagerly: ", connectedEagerly);
    console.log("isSameNetwork: ", isSameNetwork);
    console.log("isActive: ", isActive);
    console.log("currentChainId: ", currentChainId);
    console.log("previousChainId: ", previousChainId);
    console.log("chainAllowed:", chainAllowed);
    console.log("hasNetworkConfig:", hasNetworkConfig);
    console.log("shouldUpdateSigner:", shouldUpdateSigner);
    console.log("shouldSwitchNetwork:", shouldSwitchNetwork);
    console.log("shouldSelectCorrectNetwork:", shouldSelectCorrectNetwork);

    if (shouldSelectCorrectNetwork && !isOpen) {
      console.warn("Opening popup...");
      dispatch(setProviderIsOpen(true));
    }

    if (shouldUpdateSigner) {
      console.warn("Updating signer...");
      const signer = provider.getSigner();
      dispatch(setSigner(signer));
      dispatch(setProviderIsOpen(false));
      initialiseSDK(signer as ethers.providers.JsonRpcSigner);
    }

    if (shouldSwitchNetwork) {
      console.warn("Switching network...");
      switchNetwork(connector, chainId);
    }

    if (connectedEagerly) {
      setConnectEagerly(false);
    }
  }, [
    chainId,
    provider,
    switchingNetwork,
    isActive,
    networkConfig,
    connectedEagerly
  ]);

  return (
    <DialogWrapper open={isOpen} fullScreen={fullScreen}>
      <>
        <AppTitle
          mb={{
            xs: "16px",
            lg: "24px",
            xxl: "32px"
          }}
          variant="h2"
        />

        {networkConfig && provider?._network?.chainId !== chainId ? (
          <>
            <Typography color="white" variant="subtitle1">
              Waiting for confirmation
            </Typography>
            <div style={{ position: "relative", flex: 1 }}>
              <AutLoading />
            </div>
          </>
        ) : (
          <>
            {!wallet && (
              <Typography color="white" variant="subtitle1">
                Connect your wallet
              </Typography>
            )}
            {wallet && (
              <>
                <Typography
                  mb={{
                    xs: "8px"
                  }}
                  color="white"
                  variant="subtitle1"
                >
                  Change Network
                </Typography>
                <Typography color="white" variant="body">
                  You will need to switch your wallet’s network.
                </Typography>
              </>
            )}
            <DialogInnerContent>
              {!wallet && (
                <>
                  <ConnectorBtn
                    setConnector={changeConnector}
                    connectorType={ConnectorTypes.Metamask}
                  />
                  <ConnectorBtn
                    setConnector={changeConnector}
                    connectorType={ConnectorTypes.WalletConnect}
                  />
                </>
              )}

              {wallet && (
                <NetworkSelectors
                  networks={networks}
                  onSelect={async (foundChainId: number) => {
                    switchNetwork(connector, foundChainId);
                  }}
                />
              )}
            </DialogInnerContent>
          </>
        )}
      </>
    </DialogWrapper>
  );
};

export default Web3NetworkProvider;
