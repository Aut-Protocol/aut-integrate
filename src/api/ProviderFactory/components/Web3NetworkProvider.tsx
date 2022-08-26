import { useAppDispatch } from '@store/store.model';
import {
  NetworkSelectorIsOpen,
  SelectedNetworkConfig,
  SelectedWalletType,
  setNetwork,
  setProviderIsOpen,
  setSigner,
} from '@store/WalletProvider/WalletProvider';
import { pxToRem } from '@utils/text-size';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { styled, Typography } from '@mui/material';
import { ReactComponent as AutLogo } from '@assets/aut/logo.svg';
import AutLoading from '@components/AutLoading';
import DialogWrapper from '@components/Dialog/DialogWrapper';
import { environment, getNetworkVariables } from '@api/environment';
import ConnectorBtn, { ConnectorTypes } from './ConnectorBtn';
import { NetworkSelectors } from './NetworkSelectors';
import { EnableAndChangeNetwork } from '../web3.network';

const Title = styled(Typography)({
  mt: pxToRem(25),
  letterSpacing: '3px',
  fontSize: pxToRem(20),
  fontWeight: '500',
  color: 'white',
  textTransform: 'uppercase',
});

const Subtitle = styled(Typography)({
  mt: pxToRem(25),
  letterSpacing: '1.25px',
  fontSize: pxToRem(16),
  textAlign: 'center',
  color: 'white',
  textTransform: 'uppercase',
});

const DialogInnerContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
});

const Web3NetworkProvider = ({ fullScreen = false }: any) => {
  const dispatch = useAppDispatch();
  const isOpen = useSelector(NetworkSelectorIsOpen);
  const wallet = useSelector(SelectedWalletType);
  const networkConfig = useSelector(SelectedNetworkConfig);
  const { isActive, chainId, provider, error } = useWeb3React();

  const [connector, setConnector] = useState(null);
  const [switchingNetwork, setSwitchingNetwork] = useState(false);

  const switchNetwork = async (chainId: number, index: number, name: string = null) => {
    if (!connector) {
      return;
    }
    setSwitchingNetwork(true);
    await connector.deactivate();
    const networkName = name || environment.networks.split(',')[index];
    await connector.activate(chainId);
    const config = getNetworkVariables(networkName);
    await EnableAndChangeNetwork(connector.provider, config);
    await dispatch(setNetwork(networkName));
    setSwitchingNetwork(false);
  };

  useEffect(() => {
    const previousChainId = provider?._network?.chainId;
    const currentChainId = chainId;
    const index = environment.chainIds.split(',').indexOf(currentChainId?.toString());
    const chainAllowed = index !== -1;
    const hasNetworkConfig = !!networkConfig;
    const isSameNetwork = previousChainId && currentChainId && previousChainId === chainId;

    if (switchingNetwork || !provider || !chainId || !isActive) {
      const shouldActivateConnector = !isActive && chainAllowed && previousChainId && chainId;
      if (shouldActivateConnector) {
        console.warn('Activating network...');
        connector.activate(chainId);
      }
      return;
    }

    const shouldSelectCorrectNetwork = !chainAllowed && !!chainId;
    const shouldUpdateSigner = chainAllowed && isActive && isSameNetwork;
    const shouldSwitchNetwork = isActive && chainAllowed && hasNetworkConfig && !isSameNetwork;

    console.log('isSameNetwork: ', isSameNetwork);
    console.log('isActive: ', isActive);
    console.log('currentChainId: ', currentChainId);
    console.log('previousChainId: ', previousChainId);
    console.log('chainAllowed:', chainAllowed);
    console.log('hasNetworkConfig:', hasNetworkConfig);
    console.log('shouldUpdateSigner:', shouldUpdateSigner);
    console.log('shouldSwitchNetwork:', shouldSwitchNetwork);
    console.log('shouldSelectCorrectNetwork:', shouldSelectCorrectNetwork);

    if (shouldSelectCorrectNetwork && !isOpen) {
      console.warn('Opening popup...');
      dispatch(setProviderIsOpen(true));
    }

    if (shouldUpdateSigner) {
      console.warn('Updating signer...');
      dispatch(setSigner(provider.getSigner()));
      dispatch(setProviderIsOpen(false));
    }

    if (shouldSwitchNetwork) {
      console.warn('Switching network...');
      switchNetwork(chainId, index);
    }
  }, [chainId, provider, switchingNetwork, isActive, networkConfig]);

  return (
    <DialogWrapper open={isOpen} fullScreen={fullScreen}>
      <>
        <AutLogo width="80" height="80" />

        {networkConfig && provider?._network?.chainId !== chainId ? (
          <>
            <Title>Waiting for confirmation</Title>
            <div style={{ position: 'relative', flex: 1 }}>
              <AutLoading />
            </div>
          </>
        ) : (
          <>
            {!wallet && <Title>Connect your wallet</Title>}
            {wallet && (
              <>
                <Title>You Must Change Networks</Title>
                <Subtitle>We’ve detected that you need to switch your wallet’s network from goerli.</Subtitle>
              </>
            )}
            <DialogInnerContent>
              {!wallet && (
                <>
                  <ConnectorBtn setConnector={setConnector} connectorType={ConnectorTypes.Metamask} />
                  <ConnectorBtn setConnector={setConnector} connectorType={ConnectorTypes.WalletConnect} />
                </>
              )}

              {wallet && (
                <NetworkSelectors
                  onSelect={async (foundChainId: number, networkName: string) => {
                    // setSwitchingNetwork(true);
                    // await connector.activate(foundChainId);
                    // const config = getNetworkVariables(networkName);
                    // await EnableAndChangeNetwork(connector.provider, config);
                    // dispatch(setNetwork(networkName));
                    // setSwitchingNetwork(false);
                    switchNetwork(foundChainId, null, networkName);
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
