/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Biconomy } from '@biconomy/mexa';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { setSigner } from '@store/WalletProvider/WalletProvider';
import { useAppDispatch } from '@store/store.model';

interface IBiconomyContext {
  biconomy: undefined | any;
  isBiconomyReady: boolean;
  // isGaslessAllowed: boolean;
  // isGaslessEnabled: boolean;
  // toggleGasless: () => void;
  // toggleGaslessStatus: ToggleGaslessStatus;
  // toggleGaslessError: undefined | Error;
}

const BiconomyContext = createContext<IBiconomyContext | null>(null);

const BiconomyProvider = (props) => {
  const { connector, provider } = useWeb3React();
  const dispatch = useAppDispatch();

  const [isBiconomyReady, setIsBiconomyReady] = useState(false);

  // reinitialize biconomy everytime library is changed
  const biconomy: any = useMemo(() => {
    if (!connector?.provider) return;
    return new Biconomy(connector?.provider, {
      apiKey: '13d36UjLv.3aa76216-6ad5-411b-8ba6-d5438fce9e67',
      jsonRpcUrl: 'https://goerli.infura.io/v3/',
      strictMode: true,
      debug: true,
      contractAddresses: ['0xa9d390c4E576A1a73F5171E80aE58651cFF8eab2', '0x4957f46a74A1c6C9e761c46298A9975A3CD6b1B8'],
    });
  }, [connector?.provider]);

  useEffect(() => {
    if (!biconomy) return;

    biconomy
      .onEvent(biconomy.READY, () => {
        // Initialize your dapp here like getting user accounts etc
        setIsBiconomyReady(true);
        // @ts-ignore
        // console.log(window.web3.currentProvider);
        // @ts-ignore
        const ethersProvider = new ethers.providers.Web3Provider(biconomy);
        console.log(ethersProvider.getSigner(), 'ethersProvider');
        connector.customProvider = ethersProvider;
        dispatch(setSigner(ethersProvider.getSigner()));
        console.log('BICONOMY READY', biconomy.currentProvider, biconomy.signer, connector);
      })
      .onEvent(biconomy.ERROR, (error: any, message: any) => {
        // Handle error while initializing mexa
        console.log(error);
        console.log(message);
        setIsBiconomyReady(false);
      });
  }, [biconomy]);

  return (
    <BiconomyContext.Provider
      value={{
        isBiconomyReady,
        biconomy,
      }}
      {...props}
    />
  );
};

const useBiconomy = () => {
  const hookData = useContext(BiconomyContext);
  if (!hookData) throw new Error('Hook used without provider');
  return hookData;
};
export { BiconomyProvider, useBiconomy };
