import Stepper from '@components/Stepper';
import { Step } from '@components/Stepper/model';
import { useState } from 'react';
import { StepWizardChildProps } from 'react-step-wizard';
import { Button, Toolbar } from '@mui/material';
import { ReactComponent as AutLogo } from '@assets/aut/logo.svg';
import { ReactComponent as BackIcon } from '@assets/aut/back.svg';
import { pxToRem } from '@utils/text-size';
import CommunityInfoStep from './CommunityInfoStep';
import ImportContractStep from './ImportContractStep';
import SelectMarketStep from './SelectMarketStep';
import RoleStep from './RoleStep';
import CommitmentStep from './CommitmentStep';
import ConfirmStep from './ConfirmStep';

const steps: Step[] = [
  {
    component: ImportContractStep,
    title: 'Import Contract',
    description: (
      <div>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
        erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
        est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet
      </div>
    ),
  },
  {
    component: CommunityInfoStep,
    title: 'Community Details',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
  },
  {
    component: SelectMarketStep,
    title: 'Select Market',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
  },
  {
    component: RoleStep,
    title: 'Roles',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
  },
  {
    component: CommitmentStep,
    title: 'Commitment',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
  },
  {
    component: ConfirmStep,
    title: 'Confirm',
    description: '',
  },
];

const Integrate = () => {
  const [instance, setInstance] = useState<StepWizardChildProps & any>();

  const goBack = () => {
    console.log('goBack: ', goBack);
    instance?.previousStep();
  };

  return (
    <>
      <Toolbar
        sx={{
          p: '0px !important',
          height: `${pxToRem(120)}`,
          minHeight: `${pxToRem(120)}`,
          maxHeight: `${pxToRem(120)}, !important`,
          justifyContent: 'center',
        }}
      >
        <Button
          sx={{
            color: 'white',
            position: 'absolute',
            left: pxToRem(140),
            top: pxToRem(40),
          }}
          type="button"
          onClick={goBack}
          startIcon={<BackIcon style={{ height: pxToRem(34), width: pxToRem(28) }} />}
          variant="text"
        >
          Back
        </Button>
        <AutLogo width="80" height="80" />
      </Toolbar>
      <Stepper instance={setInstance} steps={steps} />
    </>
  );
};

export default Integrate;
