import { isMemberOfDao } from '@api/registry.api';
import ErrorDialog from '@components/Dialog/ErrorPopup';
import LoadingDialog from '@components/Dialog/LoadingPopup';
import { AutSelectField, AutTextField, FormHelperText } from '@components/Fields';
import { StepperButton } from '@components/Stepper';
import { StepperChildProps } from '@components/Stepper/model';
import { Link, MenuItem, styled } from '@mui/material';
import {
  IntegrateCommunity,
  IntegrateErrorMessage,
  IntegrateStatus,
  integrateUpdateCommunity,
  integrateUpdateStatus,
} from '@store/Integrate/integrate';
import { ResultState } from '@store/result-status';
import { useAppDispatch } from '@store/store.model';
import { ContractTypes } from '@utils/misc';
import { pxToRem } from '@utils/text-size';
import { useWeb3React } from '@web3-react/core';
import { isAddress } from 'ethers/lib/utils';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const errorTypes = {
  validAddress: `Not a valid address`,
  selected: 'Field is required!',
};

const StepWrapper = styled('form')({
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});

const ImportContractStep = (props: StepperChildProps) => {
  const dispatch = useAppDispatch();
  const status = useSelector(IntegrateStatus);
  const errorMessage = useSelector(IntegrateErrorMessage);
  const { account } = useWeb3React();
  const { contractType, daoAddr } = useSelector(IntegrateCommunity);
  const { control, handleSubmit, getValues, formState } = useForm({
    mode: 'onChange',
    defaultValues: {
      contractType,
      daoAddr,
    },
  });

  const updateState = async () => {
    return dispatch(integrateUpdateCommunity(getValues()));
  };

  const onSubmit = async () => {
    await updateState();

    const values = getValues();
    const result = await dispatch(
      isMemberOfDao({
        daoType: values.contractType,
        daoAddr: values.daoAddr,
      })
    );

    if (result.meta.requestStatus === 'fulfilled' && typeof result.payload === 'boolean' && result.payload) {
      props?.stepper?.nextStep();
    }
  };

  const handleDialogClose = () => {
    dispatch(integrateUpdateStatus(ResultState.Idle));
  };

  return (
    <StepWrapper autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <ErrorDialog handleClose={handleDialogClose} open={status === ResultState.Failed} message={errorMessage} />
      <LoadingDialog handleClose={handleDialogClose} open={status === ResultState.Loading} message="Verifying address" />
      <Controller
        name="contractType"
        control={control}
        rules={{
          validate: {
            selected: (v: number) => !!v,
          },
        }}
        render={({ field: { name, value, onChange } }) => {
          return (
            <AutSelectField
              variant="standard"
              autoFocus
              renderValue={(selected) => {
                if (!selected) {
                  return 'DAO Type' as any;
                }
                const type = ContractTypes.find((t) => t.value === selected);
                return type?.label || selected;
              }}
              width="450"
              name={name}
              color="primary"
              value={value || ''}
              displayEmpty
              required
              onChange={onChange}
              helperText={
                <FormHelperText value={value} name={name} errors={formState.errors}>
                  <Link sx={{ color: 'white' }} target="_blank" href="https://hackersdao.aut.id/">
                    Aren't you part of a DAO yet? Join one here
                  </Link>
                </FormHelperText>
              }
            >
              {ContractTypes.map((type) => (
                <MenuItem key={`contract-type-${type.value}`} color="primary" value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </AutSelectField>
          );
        }}
      />
      <Controller
        name="daoAddr"
        control={control}
        rules={{
          required: true,
          validate: {
            validAddress: (v: string) => isAddress(v),
          },
        }}
        render={({ field: { name, value, onChange } }) => {
          return (
            <AutTextField
              width="450"
              variant="standard"
              required
              name={name}
              value={value || ''}
              onChange={onChange}
              placeholder="DAO Address"
              sx={{
                mb: pxToRem(45),
              }}
              helperText={<FormHelperText errorTypes={errorTypes} value={value} name={name} errors={formState.errors} />}
            />
          );
        }}
      />

      <StepperButton disabled={!formState.isValid} label="Verify Membership" />
    </StepWrapper>
  );
};

export default ImportContractStep;
