import { useState } from 'react';
import StepWizard, { StepWizardChildProps, StepWizardProps } from 'react-step-wizard';
import { styled } from '@mui/system';
import StepperNav from './StepperNav';

export interface StepperChildProps extends Partial<StepWizardChildProps> {
  stepper: StepWizardProps;
  children: JSX.Element;
}

export interface Step {
  component: any;
}

export interface StepperProps {
  steps: Step[];
}

const First = ({ stepper, children }: StepperChildProps) => {
  return (
    <div
      style={{
        background: 'red',
        position: 'absolute',
        width: '100%',
      }}
    >
      {children}
    </div>
  );
};

const StepperWrapper = styled('div')`
  .animated {
    animation-duration: 0.8192s;
    animation-fill-mode: backwards;
    transform-style: preserve-3d;
  }

  /** intro */
  @keyframes intro {
    from {
      opacity: 0;
      transform: perspective(500px) translate3d(0, 0, -50px);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  .intro {
    animation: intro 1s ease-out;
  }

  /** enterRight */
  @keyframes enterRight {
    from {
      opacity: 0;
      transform: perspective(500px) translate3d(20%, 0, 0);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  .enterRight {
    animation-name: enterRight;
  }

  /** enterLeft */
  @keyframes enterLeft {
    from {
      opacity: 0;
      transform: perspective(500px) translate3d(-20%, 0, 0);
    }

    to {
      opacity: 1;
      transform: none;
    }
  }

  .enterLeft {
    animation-name: enterLeft;
  }

  /** exitRight */
  @keyframes exitRight {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      transform: perspective(500px) translate3d(100%, 0, -100px);
    }
  }

  .exitRight {
    animation-name: exitRight;
  }

  /** exitLeft */
  @keyframes exitLeft {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      transform: perspective(500px) translate3d(-100%, 0, -100px);
    }
  }

  .exitLeft {
    animation-name: exitLeft;
  }
`;

export default (props: StepperProps) => {
  const [instance, setInstance] = useState<StepWizardProps>(null);

  return (
    <StepperWrapper>
      <StepWizard
        // transitions={{
        //   enterRight: `animated enterRight`,
        //   enterLeft: `animated enterLeft`,
        //   exitRight: `animated exitRight`,
        //   exitLeft: `animated exitLeft`,
        //   intro: `animated exitLeft`,
        // }}
        isHashEnabled
        nav={<StepperNav />}
        instance={setInstance}
      >
        {props.steps.map(({ component }, index) => {
          const Step = component;
          return (
            <First key={`top-step-${index}`} hashKey={`Step${index}`} stepper={instance}>
              <Step />
            </First>
          );
        })}
      </StepWizard>
    </StepperWrapper>
  );
};
