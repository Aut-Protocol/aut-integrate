/* eslint-disable max-len */
import { AutTextField } from '@components/Fields';
import AFileUpload from '@components/FileUpload';
import { StepperChildProps } from '@components/Stepper/model';
import { Button, styled, Typography } from '@mui/material';
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

const CommunityInfoStep = (props: StepperChildProps) => {
  const dispatch = useAppDispatch();
  const { name, image, description, contractType, daoAddr } = useSelector(IntegrateCommunity);
  const { control, handleSubmit, getValues, formState } = useForm({
    mode: 'onChange',
    defaultValues: {
      name,
      image,
      description,
      contractType,
      daoAddr,
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
    <StepWrapper autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <div className="sw-community-description">
        <Controller
          name="name"
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
                placeholder="Community Name"
                sx={{
                  mb: pxToRem(45),
                }}
                helperText={
                  <FormHelperText value={value} name={name} errors={formState.errors}>
                    {3 - countWords(value)} Words left
                  </FormHelperText>
                }
              />
            );
          }}
        />
        <Controller
          name="image"
          control={control}
          render={({ field: { name, value, onChange }, formState }) => {
            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <AFileUpload
                  fileChange={async (file) => {
                    if (file) {
                      onChange(await toBase64(file));
                    } else {
                      onChange(null);
                    }
                  }}
                />
                <FormHelperText value={value} name={name} errors={formState.errors}>
                  <div style={{ textAlign: 'right', lineHeight: '1', fontSize: pxToRem(16), marginTop: '3px' }}>.png, or .jpg</div>
                </FormHelperText>
              </div>
            );
          }}
        />

        <Controller
          name="description"
          control={control}
          rules={{ maxLength: 280 }}
          render={({ field: { name, value, onChange } }) => {
            return (
              <AutTextField
                width="450"
                name={name}
                value={value || ''}
                onChange={onChange}
                color="primary"
                multiline
                rows={5}
                sx={{
                  mt: pxToRem(45),
                }}
                placeholder="Introduce your community to the world. It can be a one-liner, common values, goals, or even the story behind it!"
                helperText={
                  <FormHelperText value={value} name={name} errors={formState.errors}>
                    Max characters {280 - (value?.length || 0)}
                  </FormHelperText>
                }
              />
            );
          }}
        />
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

export default CommunityInfoStep;
