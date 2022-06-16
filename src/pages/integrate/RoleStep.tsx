/* eslint-disable max-len */

import { StepperChildProps } from '@components/Stepper/model';
import { Button, Slider, styled, TextField, Typography } from '@mui/material';
import { IntegrateCommunity, integrateUpdateCommunity } from '@store/Integrate/integrate';
import { useAppDispatch } from '@store/store.model';
import { pxToRem } from '@utils/text-size';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toBase64 } from 'sw-web-shared';
import { makeStyles } from '@mui/styles';
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
function CommitmentMessage({ value, children = null }) {
  {
    let message = '';

    switch (+value) {
      case 0:
        message = ``;
        break;
      case 1:
        message = `I got 99 problems, and a community ain't one`;
        break;
      case 2:
        message = 'Billie Jean is not my lover.';
        break;
      case 3:
        message = `They think I'm hiding in the shadows. But I am the shadows.`;
        break;
      case 4:
        message = 'Eight or higher, bro.';
        break;
      case 5:
        message = `Yes, no, maybe, I don't know. Can you repeat the question?`;
        break;
      case 6:
        message = 'Pivot!';
        break;
      case 7:
        message = 'You Jump, I Jump, Jack.';
        break;
      case 8:
        message = 'You have my sword. And you have my bow. And my ax';
        break;
      case 9:
        message = 'I’m a Mandalorian.';
        break;
      case 10:
        message = '“After all this time?" "Always...”';
        break;
      default:
        return null;
    }
    return (
      <Typography
        color="white"
        whiteSpace="nowrap"
        align="left"
        component="span"
        variant="h4"
        sx={{ display: 'flex', mb: '4px', height: '15px' }}
      >
        {message}
      </Typography>
    );
  }

  return (
    children && (
      <Typography color="white" align="left" component="span" variant="body1">
        {children}
      </Typography>
    )
  );
}

const AutSlider = styled(Slider)({
  width: pxToRem(600),
  height: pxToRem(65),
  borderRadius: '0',
  borderWidth: '2px',
  borderStyle: 'solid',
  padding: '0',

  'span[data-index="10"].MuiSlider-mark': {
    display: 'none',
  },
  'span[data-index="0"].MuiSlider-mark': {
    display: 'none',
  },

  '.MuiSlider-mark': {
    background: 'transparent',
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: '#009FE3',

    '&.MuiSlider-markActive': {
      border: 'none',
    },
  },
  '.MuiSlider-track': {
    borderRight: '0',
    background:
      'transparent linear-gradient(45.57deg, #009fe3 0%, #0399de 8%, #0e8bd3 19%, #2072bf 30%, #3a50a4 41%, #5a2583 53%, #453f94 71%, #38519f 88%, #3458a4 100%) 0% 0%',
  },

  '.MuiSlider-rail': {
    opacity: '0',
  },
});
const StepWrapper = styled('form')({
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});
const useStyles = makeStyles((theme) => ({
  input: {
    '&::placeholder': {
      color: 'white',
    },
  },
}));

const RoleStep = (props: StepperChildProps) => {
  const dispatch = useAppDispatch();
  const { roles, commitment } = useSelector(IntegrateCommunity);
  const classes = useStyles();

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
      commitment,
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'roles',
  });

  const values = watch();
  console.log('ROLE VALUES', values);

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

  const onError = (data: any) => {
    // error
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
      <div className="sw-role-fields">
        <Typography color="white" sx={{ mb: '20px' }} component="div" variant="h3">
          Commitment
        </Typography>

        <div className="commitment">
          <Controller
            name="commitment"
            key="commitment"
            control={control}
            rules={{ min: 1, required: true }}
            render={({ field: { name, value, onChange } }) => {
              return (
                <div>
                  <CommitmentMessage value={value} />
                  <div style={{ position: 'relative' }}>
                    <AutSlider defaultValue={1} step={1} marks name={name} value={value || 0} onChange={onChange} min={0} max={10} />
                  </div>
                  <div style={{ marginTop: '4px', display: 'flex', justifyContent: 'flex-end' }}>
                    <FormHelperText value={value} name={name} errors={errors}>
                      <Typography color="white" variant="body1">
                        You can change your commitment at any time
                      </Typography>
                    </FormHelperText>
                  </div>
                </div>
              );
            }}
          />
        </div>
      </div>

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
        Next
      </Button>
    </StepWrapper>
  );
};

export default RoleStep;
