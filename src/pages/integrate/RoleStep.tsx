/* eslint-disable max-len */

import { StepperChildProps } from '@components/Stepper/model';
import { Button, styled, Typography } from '@mui/material';
import { IntegrateCommunity, integrateUpdateCommunity } from '@store/Integrate/integrate';
import { useAppDispatch } from '@store/store.model';
import { pxToRem } from '@utils/text-size';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { AutTextField } from '@components/Fields';

function FormHelperText({ errors, name, children = null, value }) {
  if (errors[name]) {
    let message = '';
    const { type } = errors[name];
    switch (type) {
      case 'required':
        message = 'Field is required!';
        break;
      case 'min':
        message = 'Min 1 commitment level!';
        break;
      default:
        return null;
    }
    return (
      <Typography whiteSpace="nowrap" color="red" align="right" component="span" variant="body1">
        {message}
      </Typography>
    );
  }
  return (
    children && (
      <Typography color="white" align="right" component="span" variant="body2">
        {children}
      </Typography>
    )
  );
}

const StepWrapper = styled('form')({
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});

const RoleStep = (props: StepperChildProps) => {
  const dispatch = useAppDispatch();
  const { roles } = useSelector(IntegrateCommunity);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      roles,
    },
  });

  const { fields } = useFieldArray({
    control,
    name: 'roles',
  });

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
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography color="white" sx={{ mb: '20px' }} component="div" variant="h3">
          Roles
        </Typography>
        {fields.map((item, index) => (
          <Controller
            key={`roles.${index}.roleName`}
            name={`roles.${index}.roleName`}
            control={control}
            rules={{ min: 0, required: index !== 2 }}
            render={({ field: { name, value, onChange } }) => {
              return (
                <>
                  <AutTextField
                    placeholder={`Role/Skill ${index + 1}`}
                    required={index !== 2}
                    focused
                    id={name}
                    name={name}
                    value={value}
                    width="450"
                    autoFocus={index === 0}
                    onChange={onChange}
                    sx={{
                      mb: pxToRem(45),
                    }}
                    inputProps={{ maxLength: 20 }}
                    helperText={
                      <FormHelperText value={value} name={name} errors={errors}>
                        {20 - (value?.length || 0)} of 20 characters left
                      </FormHelperText>
                    }
                  />
                </>
              );
            }}
          />
        ))}
      </div>
      <Button
        sx={{
          width: pxToRem(450),
          height: pxToRem(90),
          my: pxToRem(50),
        }}
        type="submit"
        color="primary"
        variant="outlined"
      >
        Next
      </Button>
    </StepWrapper>
  );
};

export default RoleStep;
