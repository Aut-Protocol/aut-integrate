/* eslint-disable max-len */
import { AutSelectField, AutTextField } from '@components/Fields';
import { StepperChildProps } from '@components/Stepper/model';
import { Button, Link, MenuItem, Select, styled, Typography } from '@mui/material';
import { IntegrateCommunity, integrateUpdateCommunity } from '@store/Integrate/integrate';
import { useAppDispatch } from '@store/store.model';
import { countWords } from '@utils/helpers';
import { pxToRem } from '@utils/text-size';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toBase64 } from 'sw-web-shared';

function FormHelperText({ errors, name, children, value }) {
  if (errors[name]) {
    let message = '';
    const { type } = errors[name];
    switch (type) {
      case 'maxWords':
        message = `Words cannot be more than 3`;
        break;
      case 'maxLength':
        message = `Characters cannot be more than 280`;
        break;
      case 'required':
        message = 'Field is required!';
        break;
      default:
        return null;
    }
    return (
      <Typography
        whiteSpace="nowrap"
        color="red"
        align="right"
        component="span"
        variant="body2"
        sx={{
          width: '100%',
          marginTop: '3px',
        }}
      >
        {message}
      </Typography>
    );
  }
  return (
    <Typography
      sx={{
        width: '100%',
        marginTop: '3px',
      }}
      color="info.main"
      align="right"
      component="span"
      variant="body2"
    >
      {children}
    </Typography>
  );
}

const StepWrapper = styled('form')({
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});

const ImportContractStep = (props: StepperChildProps) => {
  const dispatch = useAppDispatch();
  const { contractType, daoAddr } = useSelector(IntegrateCommunity);
  const { control, handleSubmit, getValues, formState, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      contractType,
      daoAddr,
    },
  });

  const values = watch();

  const updateState = () => {
    console.log(getValues(), 'getValues()');
    return dispatch(integrateUpdateCommunity(getValues()));
  };

  const onSubmit = async () => {
    await updateState();
    props?.stepper?.nextStep();
  };

  const previous = async () => {
    await updateState();
    props?.stepper?.previousStep();
  };

  return (
    <StepWrapper autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="contractType"
        control={control}
        render={({ field: { name, value, onChange } }) => {
          return (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: pxToRem(45),
              }}
            >
              <AutSelectField
                renderValue={(selected) => {
                  if (!selected) {
                    return 'Select contract type';
                  }
                  return selected;
                }}
                width="450"
                name={name}
                color="primary"
                value={value || ''}
                displayEmpty
                required
                onChange={onChange}
              >
                <MenuItem color="primary" value="SkillWallet Legacy Community">
                  SkillWallet Legacy Community
                </MenuItem>
              </AutSelectField>
              <FormHelperText value={value} name={name} errors={formState.errors}>
                <Link target="_blank" href="https://distributedtown.gitbook.io/v2/integrations/add-new-dao-type">
                  Want to add a new DAO type?
                </Link>
              </FormHelperText>
            </div>
          );
        }}
      />
      <Controller
        name="daoAddr"
        control={control}
        rules={{
          required: true,
          validate: {
            maxWords: (v: string) => countWords(v) <= 3,
          },
        }}
        render={({ field: { name, value, onChange } }) => {
          return (
            <AutTextField
              width="450"
              required
              autoFocus
              name={name}
              value={value || ''}
              onChange={onChange}
              placeholder="DAO Address"
              sx={{
                mb: pxToRem(45),
              }}
            />
          );
        }}
      />

      <Button
        sx={{
          width: pxToRem(450),
          height: pxToRem(90),
          mt: pxToRem(50),
        }}
        type="submit"
        color="primary"
        variant="outlined"
      >
        Verify Ownership & Continue
      </Button>
    </StepWrapper>
  );
};

export default ImportContractStep;
