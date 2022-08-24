/* eslint-disable max-len */

import { Community, CommunityProperties } from '@api/community.model';
import { createCommunity } from '@api/registry.api';
import CopyAddress from '@components/CopyAddress';
import ErrorDialog from '@components/Dialog/ErrorPopup';
import LoadingDialog from '@components/Dialog/LoadingPopup';
import { StepperButton } from '@components/Stepper';
import { Avatar, styled, Typography } from '@mui/material';
import { IntegrateCommunity, IntegrateErrorMessage, IntegrateStatus, integrateUpdateStatus } from '@store/Integrate/integrate';
import { ResultState } from '@store/result-status';
import { useAppDispatch } from '@store/store.model';
import { SelectedNetworkConfig, setProviderIsOpen } from '@store/WalletProvider/WalletProvider';
import { MarketTemplates, CommitmentMessages } from '@utils/misc';
import { pxToRem } from '@utils/text-size';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { base64toFile } from 'sw-web-shared';

const StepWrapper = styled('div')({
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});

const ConfirmStep = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [submitted, setIsSubmitted] = useState(false);
  const data = useSelector(IntegrateCommunity);
  const status = useSelector(IntegrateStatus);
  const errorMessage = useSelector(IntegrateErrorMessage);
  const { isActive, account, connector } = useWeb3React();
  const networkConfig = useSelector(SelectedNetworkConfig);

  const onSubmit = async () => {
    if (!isActive) {
      setIsSubmitted(true);
      dispatch(setProviderIsOpen(true));
      return;
    }
    setIsSubmitted(false);
    const state = { ...data };
    if (state.image) {
      state.image = await base64toFile(state.image as string, 'community_image');
    }
    const result = await dispatch(
      createCommunity({
        contractType: state.contractType,
        daoAddr: state.daoAddr,
        metadata: new Community({
          name: state.name,
          image: state.image,
          description: state.description,
          properties: new CommunityProperties({
            market: state.market,
            commitment: state.commitment,
            rolesSets: [
              {
                roleSetName: 'First',
                roles: state.roles,
              },
            ],
          }),
        }),
      })
    );

    if (result.meta.requestStatus === 'fulfilled') {
      history.push(`integrate/success/${result.payload}`);
    }
  };

  useEffect(() => {
    if (isActive && submitted && networkConfig) {
      onSubmit();
    }
  }, [isActive, networkConfig, submitted]);

  const handleDialogClose = () => {
    dispatch(integrateUpdateStatus(ResultState.Idle));
  };

  return (
    <StepWrapper>
      <ErrorDialog handleClose={handleDialogClose} open={status === ResultState.Failed} message={errorMessage} />
      <LoadingDialog handleClose={handleDialogClose} open={status === ResultState.Loading} message="Creating community" />
      <Typography marginTop={pxToRem(30)} variant="emphasis" color="white">
        Review your Community Info
      </Typography>
      <div
        style={{
          marginTop: pxToRem(50),
        }}
      >
        <div
          style={{
            display: 'flex',
            marginBottom: pxToRem(60),
          }}
        >
          {data.image && (
            <div>
              <Avatar
                alt="Avatar"
                variant="square"
                src={data.image as string}
                sx={{
                  cursor: 'pointer',
                  background: 'transparent',
                  height: pxToRem(110),
                  width: pxToRem(110),
                  border: '1px solid #439EDD',
                  mr: pxToRem(45),
                  '&.MuiAvatar-root': {
                    justifyContent: 'center',
                  },
                }}
                imgProps={{
                  style: {
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'cover',
                  },
                }}
              />
            </div>
          )}
          <div
            style={{
              textAlign: 'left',
            }}
          >
            <Typography lineHeight="1" fontSize={pxToRem(25)} color="white">
              {data.name}
            </Typography>
            <Typography variant="body1" color="white">
              {MarketTemplates[data.market - 1]?.title}
            </Typography>
            <Typography
              sx={{
                maxWidth: pxToRem(400),
                mt: pxToRem(15),
              }}
              variant="body1"
              color="white"
            >
              {data.description}
            </Typography>
          </div>
        </div>

        <div>
          {data.roles.map((r, index) => (
            <div
              key={`preview-role-${index}`}
              style={{
                display: 'flex',
                textAlign: 'left',
                marginBottom: pxToRem(25),
              }}
            >
              <Typography
                sx={{
                  width: pxToRem(220),
                }}
                variant="body1"
                color="white"
              >
                Role Name
              </Typography>
              <Typography variant="body1" color="white">
                {r.roleName}
              </Typography>
            </div>
          ))}
          <div
            style={{
              display: 'flex',
              textAlign: 'left',
              marginBottom: pxToRem(25),
            }}
          >
            <Typography
              sx={{
                width: pxToRem(220),
              }}
              variant="body1"
              color="white"
            >
              Pledged Commitment
            </Typography>
            <Typography variant="body1" color="white">
              {data.commitment} ( {CommitmentMessages(data.commitment)} )
            </Typography>
          </div>
          <div
            style={{
              display: 'flex',
              textAlign: 'left',
              marginBottom: pxToRem(25),
            }}
          >
            <Typography
              sx={{
                width: pxToRem(220),
              }}
              variant="body1"
              color="white"
            >
              DAO Address
            </Typography>

            <CopyAddress
              textStyles={{
                fontSize: pxToRem(14),
              }}
              address={data.daoAddr}
            />
          </div>
        </div>
      </div>
      <StepperButton type="button" label="Confirm" onClick={onSubmit} />
    </StepWrapper>
  );
};

export default ConfirmStep;
