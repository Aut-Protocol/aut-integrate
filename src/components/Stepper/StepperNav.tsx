/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint react/prop-types: 0 */

import { pxToRem } from '@utils/text-size';
import { styled } from '@mui/system';
import { Fragment } from 'react';
import { Typography } from '@mui/material';
import { StepperNavProps } from './model';

interface DotProps {
  isActive: boolean;
}

const Dot = styled('div')<DotProps>(({ isActive, title }) => ({
  lineHeight: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  '&::after': {
    content: `" "`,
    position: 'absolute',
    width: pxToRem(85),
    height: pxToRem(85),
    borderRadius: '50%',
    backgroundColor: '#FFF',
    ...(isActive && {
      backgroundColor: '#2699FB',
    }),
  },
  '&::before': {
    content: `"${title}"`,
    color: 'black',
    position: 'absolute',
    width: pxToRem(120),
    height: '2rem',
    top: pxToRem(70),
  },
}));

const DotInner = styled('div')<DotProps>(({ isActive }) => ({
  width: pxToRem(12),
  height: pxToRem(12),
  borderRadius: '50%',
  backgroundColor: '#2699FB',
  zIndex: 1,
  ...(isActive && {
    backgroundColor: '#FFF',
  }),
}));

const StepperLine = styled('div')({
  width: pxToRem(235),
  height: '4px',
  position: 'relative',
  backgroundColor: '#2699FB',
  zIndex: 1,
  margin: `0 ${pxToRem(10)}`,
});

const NavWrapper = styled('div')({
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});

const DotWrapper = styled('div')({
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: pxToRem(120),
  marginBottom: pxToRem(25),
});

const StepperNav = (props: StepperNavProps) => {
  const dots = [];
  for (let i = 1; i <= props.totalSteps; i += 1) {
    const isActive = props.currentStep === i;
    const isComplete = props.currentStep > i;
    const { title } = props.steps[i - 1];

    dots.push(
      <Fragment key={`nav-step-top-${i}`}>
        <span key={`nav-step-${i}`}>
          <Dot key={`nav-dot-${i}`} isActive={isActive || isComplete} title={title || ' '}>
            <DotInner isActive={isActive || isComplete} />
          </Dot>
        </span>
        {props.totalSteps !== i && <StepperLine key={`nav-stepper-line-${i}`} />}
      </Fragment>
    );
  }

  return (
    <NavWrapper>
      <DotWrapper>{dots}</DotWrapper>
      <Typography
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'primary.main',
          my: pxToRem(20),
          fontSize: pxToRem(30),
        }}
      >
        {props.steps[props.currentStep - 1].description}
      </Typography>
    </NavWrapper>
  );
};

export default StepperNav;
