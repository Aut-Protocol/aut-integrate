import PartnerButton from '@components/Button';
import { StepperChildProps } from '@components/Stepper/model';
import { Button, styled } from '@mui/material';
import { IntegrateCommunity, integrateUpdateCommunity } from '@store/Integrate/integrate';
import { useAppDispatch } from '@store/store.model';
import { pxToRem } from '@utils/text-size';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const StepWrapper = styled('form')({
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});

const SelectMarketStep = (props: StepperChildProps) => {
  const dispatch = useAppDispatch();
  const { market } = useSelector(IntegrateCommunity);
  const { control, handleSubmit, getValues, formState } = useForm({
    mode: 'onChange',
    defaultValues: {
      market,
    },
  });

  const updateState = () => {
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
    <StepWrapper onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="market"
        control={control}
        render={({ field: { name, value, onChange } }) => {
          return (
            <PartnerButton
              name={name}
              mode="light"
              onClick={() => onChange(true)}
              className={value ? 'active-link' : ''}
              label="Core Team"
              btnStyles={{
                width: pxToRem(340),
                height: pxToRem(80),
                fontSize: pxToRem(19),
                padding: `0 ${pxToRem(75)}`,
              }}
            />
          );
        }}
      />
      <Controller
        name="market"
        control={control}
        render={({ field: { name, value, onChange } }) => {
          return (
            <PartnerButton
              name={name}
              mode="light"
              onClick={() => onChange(false)}
              className={!value ? 'active-link' : ''}
              label="Community"
              btnStyles={{
                width: pxToRem(340),
                height: pxToRem(80),
                fontSize: pxToRem(19),
                padding: `0 ${pxToRem(75)}`,
              }}
            />
          );
        }}
      />

      <Button type="button" variant="contained" disabled={!formState.isValid} disableElevation onClick={previous}>
        Previous {props?.stepper?.currentStep}
      </Button>
      <Button type="submit" variant="contained" disableElevation>
        Next
      </Button>
    </StepWrapper>
  );
};

export default SelectMarketStep;
