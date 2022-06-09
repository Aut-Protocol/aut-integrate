/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint react/prop-types: 0 */

import { pxToRem } from '@utils/text-size';
import { styled } from '@mui/system';
import { Fragment } from 'react';

interface DotProps {
  isActive: boolean;
}

const Dot = styled('div')<DotProps>(({ theme, isActive, title }) => ({
  color: 'black',
  cursor: 'pointer',
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
    top: '40px',
  },
}));

const DotInner = styled('div')<DotProps>(({ theme, isActive }) => ({
  width: pxToRem(12),
  height: pxToRem(12),
  borderRadius: '50%',
  backgroundColor: '#2699FB',
  zIndex: 1,
  ...(isActive && {
    backgroundColor: '#FFF',
  }),
}));

const StepperLine = styled('div')(({ theme }) => ({
  width: pxToRem(235),
  height: '4px',
  position: 'relative',
  backgroundColor: '#2699FB',
  zIndex: 1,
  margin: `0 ${pxToRem(10)}`,
}));

const NavWrapper = styled('div')({
  marginBottom: '15px',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: pxToRem(120),
});

const StepperNav = (props) => {
  const dots = [];
  for (let i = 1; i <= props.totalSteps; i += 1) {
    const isActive = props.currentStep === i;
    const isComplete = props.currentStep > i;

    dots.push(
      <Fragment key={`nav-step-top-${i}`}>
        <span key={`nav-step-${i}`} onClick={() => props.goToStep(i)}>
          <Dot key={`nav-dot-${i}`} isActive={isActive || isComplete} title="Ttitle Here">
            <DotInner isActive={isActive || isComplete} />
          </Dot>
        </span>
        {props.totalSteps !== i && <StepperLine key={`nav-stepper-line-${i}`} />}
      </Fragment>
    );
  }

  return <NavWrapper>{dots}</NavWrapper>;
};

export default StepperNav;
