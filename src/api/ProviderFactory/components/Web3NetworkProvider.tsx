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
import ConnectorBtn, { ConnectorTypes } from './ConnectorBtn';
import { NetworkSelectors } from './NetworkSelectors';

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
  const [lastChainId, setLastChainId] = useState<number>(null);
  const wallet = useSelector(SelectedWalletType);
  const networkConfig = useSelector(SelectedNetworkConfig);
  const { connector, isActive, chainId, provider } = useWeb3React();

  useEffect(() => {
    if (isActive && lastChainId && lastChainId === chainId) {
      dispatch(setSigner(provider.getSigner()));
      dispatch(setProviderIsOpen(false));
    }
  }, [chainId, lastChainId, provider]);

  useEffect(() => {
    if (!isActive) {
      dispatch(setProviderIsOpen(true));
    }
  }, [isActive]);

  return (
    <DialogWrapper open={isOpen} fullScreen={fullScreen}>
      <>
        <AutLogo width="80" height="80" />

        {networkConfig && lastChainId !== chainId ? (
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
                  <ConnectorBtn connectorType={ConnectorTypes.Metamask} />
                  <ConnectorBtn connectorType={ConnectorTypes.WalletConnect} />
                </>
              )}

              {wallet && (
                <NetworkSelectors
                  onSelect={(foundChainId: number, networkName: string) => {
                    setLastChainId(foundChainId);
                    connector.activate(foundChainId);
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
