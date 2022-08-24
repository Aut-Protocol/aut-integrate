/* eslint-disable max-len */
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { pxToRem } from '@utils/text-size';

export const AutButton = styled<ButtonProps<any, any>>(Button)(({ theme }) => ({
  '&.MuiButton-root': {
    border: `${pxToRem(5)} solid ${theme.palette.primary.main}`,
    borderRadius: '50px',
    color: 'white',
    letterSpacing: '2.7px',
    font: `normal normal 900 ${pxToRem(18)}/${pxToRem(51)} Avenir`,
    textTransform: 'none',
    '&.Mui-disabled': {
      color: 'white',
      opacity: '.3',
    },
    '&:hover': {
      backgroundColor: '#009ADE',
      color: 'white',
    },
  },
}));

export const AutGradientButton = styled<ButtonProps<any, any>>(AutButton)(({ theme }) => ({
  '&.MuiButton-root': {
    borderImage:
      'linear-gradient(45.57deg, #009fe3 0%, #0399de 8%, #0e8bd3 19%, #2072bf 30%, #3a50a4 41%, #5a2583 53%, #453f94 71%, #38519f 88%, #3458a4 100%) 1',
    borderWidth: '3px',
    borderColor: 'transparent',
    borderRadius: 0,
    '&:hover': {
      background:
        'transparent linear-gradient(45.57deg, #009fe3 0%, #0399de 8%, #0e8bd3 19%, #2072bf 30%, #3a50a4 41%, #5a2583 53%, #453f94 71%, #38519f 88%, #3458a4 100%) 0% 0%',
      borderWidth: '0',
      borderColor: 'transparent',
    },
  },
}));
