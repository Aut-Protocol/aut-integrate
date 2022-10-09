/* eslint-disable max-len */
import axios from 'axios';
import { environment } from './environment';
import { NetworkConfig } from './ProviderFactory/network.config';

export const getAppConfig = (): Promise<NetworkConfig[]> => {
  // return Promise.all([axios.get(`${environment.apiUrl}/autid/config/mumbai`), axios.get(`${environment.apiUrl}/autid/config/goerli`)]).then(
  //   (data) => data.map((d) => d.data)
  // );

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          name: 'Görli (Ethereum)',
          chainId: 5,
          network: 'Goerli',
          explorerUrls: ['https://goerli.etherscan.io/'],
          rpcUrls: ['https://goerli.infura.io/v3/'],
          contracts: {
            autIDAddress: '0x4957f46a74A1c6C9e761c46298A9975A3CD6b1B8',
            daoExpanderRegistryAddress: '0xa9d390c4E576A1a73F5171E80aE58651cFF8eab2',
            daoExpanderFactoryAddress: '0x01E228655660d9e1370400cC067108caf4BdE9F5',
            hackerDaoAddress: '0x09e930B4FEB47cA86236c8961B8B1e23e514ec3F',
            daoTypesAddress: '0xD6D405673fF4D1563B9E2dDD3ff7C4B20Af755fc',
          },
        },
        {
          name: 'Mumbai (Polygon)',
          chainId: 80001,
          network: 'Mumbai',
          explorerUrls: ['https://explorer-mumbai.maticvigil.com/'],
          rpcUrls: ['https://matic-mumbai.chainstacklabs.com/', 'https://rpc-mumbai.matic.today/'],
          contracts: {
            autIDAddress: '0xb6868B3920712729A24689Cb5c770639d0C56aDd',
            daoExpanderRegistryAddress: '0xbdbCdFDe4CC74c47705B677E4562032222F15CE0',
            daoExpanderFactoryAddress: '0xa955eDadeb62233FA1997714f2ba7F8893c38Af2',
            hackerDaoAddress: '0x8eA20de15Db87Be1a8B20Da5ebD785a4a9BE9690',
            daoTypesAddress: '0x814B36802359E0233f38B8A29A96EA9e4c261E37',
          },
        },
      ]);
    }, 1000);
  });
};
