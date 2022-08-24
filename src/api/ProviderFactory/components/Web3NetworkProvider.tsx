import { useAppDispatch } from '@store/store.model';
import {
  NetworkIsEagerConnect,
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
import { getNetworkVariables } from '@api/environment';
import ConnectorBtn, { ConnectorTypes } from './ConnectorBtn';
import { NetworkSelectors } from './NetworkSelectors';
import { EnableAndChangeNetwork } from '../web3.network';

const Title = styled(Typography)({
  mt: pxToRem(25),
  fontWeight: '900',
  color: 'white',
});

const Subtitle = styled(Typography)({
  mt: pxToRem(25),
  letterSpacing: '1.25px',
  fontSize: pxToRem(16),
  textAlign: 'center',
  color: 'white',
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
  const eagerConnect = useSelector(NetworkIsEagerConnect);
  const [lastChainId, setLastChainId] = useState<number>(null);
  const wallet = useSelector(SelectedWalletType);
  const networkConfig = useSelector(SelectedNetworkConfig);
  const [connector, setConnector] = useState(null);
  const { isActive, chainId, provider } = useWeb3React();

  console.log('connector: ', connector);

  const switchNetwork = async (chainId: number, index: number) => {
    // await connector.deactivate();
    // debugger;
    // const networkName = environment.networks.split(',')[index];
    // await dispatch(setWallet(wallet || ConnectorTypes.Metamask));
    // await connector.activate(chainId);
    // const config = getNetworkVariables(networkName);
    // await EnableAndChangeNetwork(connector.provider, config);
    // await dispatch(setNetwork(networkName));
    // setLastChainId(chainId);
  };

  useEffect(() => {
    if (isActive && lastChainId && lastChainId === chainId) {
      dispatch(setSigner(provider.getSigner()));
      dispatch(setProviderIsOpen(false));
    }
  }, [chainId, lastChainId, provider]);

  // useEffect(() => {
  //   if (isActive && lastChainId && lastChainId !== chainId) {
  //     const index = environment.chainIds.split(',').indexOf(chainId?.toString());
  //     switchNetwork(chainId, index);
  //   }
  // }, [chainId, lastChainId, provider]);

  // useEffect(() => {
  //   if (eagerConnect && connector && !isActive) {
  //     (async () => {
  //       await connector.connectEagerly();
  //       dispatch(setEagerConnect(false));
  //     })();
  //   }
  // }, [connector, isActive, eagerConnect]);

  // useEffect(() => {
  //   const index = environment.chainIds.split(',').indexOf(chainId?.toString());
  //   if (index === -1 && chainId) {
  //     dispatch(setProviderIsOpen(true));
  //     dispatch(setNetwork(null));
  //     setLastChainId(null);
  //     dispatch(setWallet(null));
  //     return;
  //   }
  //   if (!lastChainId && connector && chainId) {
  //     switchNetwork(chainId, index);
  //   }
  // }, [connector, chainId, lastChainId]);

  return (
    <DialogWrapper open={isOpen} fullScreen={fullScreen}>
      <>
        <AutLogo width="80" height="80" />

        {networkConfig && lastChainId !== chainId ? (
          <>
            <Title variant="emphasis">Waiting for confirmation</Title>
            <div style={{ position: 'relative', flex: 1 }}>
              <AutLoading />
            </div>
          </>
        ) : (
          <>
            {!wallet && <Title variant="emphasis">Connect your wallet</Title>}
            {wallet && (
              <>
                <Title variant="emphasis">You Must Change Networks</Title>
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
                    setLastChainId(foundChainId);
                    await connector.activate(foundChainId);
                    const config = getNetworkVariables(networkName);
                    await EnableAndChangeNetwork(connector.provider, config);
                    dispatch(setNetwork(networkName));
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
