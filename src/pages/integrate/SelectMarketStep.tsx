import PartnerButton from '@components/Button';
import { StepperChildProps } from '@components/Stepper/model';
import { Button, styled } from '@mui/material';
import { IntegrateCommunity, integrateUpdateCommunity } from '@store/Integrate/integrate';
import { useAppDispatch } from '@store/store.model';
import { pxToRem } from '@utils/text-size';
import { useEffect } from 'react';
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
  const { control, getValues } = useForm({
    mode: 'onChange',
    defaultValues: {
      market,
    },
  });

  const updateState = () => {
    const values = getValues();
    return dispatch(integrateUpdateCommunity(values));
  };

  const onSubmit = async () => {
    await updateState();
    props?.stepper?.nextStep();
  };

  const previous = async () => {
    await updateState();
    props?.stepper?.previousStep();
  };

  useEffect(() => {
    props.setActions(() => {
      return (
        <>
          <Button variant="contained" disableElevation onClick={previous}>
            Previous {props?.stepper?.currentStep}
          </Button>
          <Button variant="contained" disableElevation onClick={onSubmit}>
            Next
          </Button>
        </>
      );
    });
  }, [props?.stepper?.currentStep]);

  return (
    <StepWrapper>
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
    </StepWrapper>
  );
};

export default SelectMarketStep;
