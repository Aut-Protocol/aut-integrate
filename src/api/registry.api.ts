import {
  DAOExpanderRegistryContractEventType,
  Web3DAOExpanderRegistryProvider,
  Web3DaoTypesProvider,
  Web3MembershipCheckerProvider,
} from '@aut-protocol/abi-types';
import { NetworkConfig } from '@store/model';
import { Community } from './community.model';
import { Web3ThunkProviderFactory } from './ProviderFactory/web3-thunk.provider';
import { ipfsCIDToHttpUrl, storeAsBlob, storeImageAsBlob } from './storage.api';

const communityRegistryThunkProvider = Web3ThunkProviderFactory('CommunityRegistry', {
  provider: Web3DAOExpanderRegistryProvider,
});

const membershipCheckerThunkProvider = Web3ThunkProviderFactory('MembershipChecker', {
  provider: Web3MembershipCheckerProvider,
});

export const isMemberOfDao = membershipCheckerThunkProvider(
  {
    type: 'membership-checker/is-member',
  },
  async (thunkAPI, { daoType }) => {
    const state = thunkAPI.getState() as any;
    const config: NetworkConfig = state.walletProvider.networkConfig;
    const daoTypesContract = await Web3DaoTypesProvider(config.daoTypeAddress);
    return daoTypesContract.getMembershipCheckerAddress(daoType);
  },
  async (contract, requestBody: { memberAddress: string; daoAddr: string; daoType: number }) => {
    const { memberAddress, daoAddr } = requestBody;
    console.log('DaoAddr -> ', daoAddr);
    console.log('MemberAddress -> ', memberAddress);
    return contract.isMember(daoAddr, memberAddress);
  }
);

export const createCommunity = communityRegistryThunkProvider(
  {
    type: 'integrate/create/community',
    event: DAOExpanderRegistryContractEventType.DAOExpanderDeployed,
  },
  (thunkAPI) => {
    const state = thunkAPI.getState() as any;
    const config: NetworkConfig = state.walletProvider.networkConfig;
    return Promise.resolve(config.registryAddress);
  },
  async (contract, requestBody: { metadata: Community; contractType: number; daoAddr: string }) => {
    const { metadata, contractType, daoAddr } = requestBody;
    console.log('Metadata -> ', metadata);
    console.log('ContractType -> ', contractType);
    console.log('DaoAddr -> ', daoAddr);
    if (metadata.image) {
      metadata.image = await storeImageAsBlob(metadata.image as File);
    }
    const cid = await storeAsBlob(metadata);
    console.log('Metadata url -> ', ipfsCIDToHttpUrl(cid));
    const response = await contract.deployDAOExpander(
      contractType,
      daoAddr,
      metadata.properties.market as number,
      cid,
      metadata.properties.commitment
    );
    return response[0];
  }
);
