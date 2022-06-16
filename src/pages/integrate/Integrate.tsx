import Stepper from '@components/Stepper';
import { Step } from '@components/Stepper/model';
import CommunityInfoStep from './CommunityInfoStep';
import ImportContractStep from './ImportContractStep';
import SelectMarketStep from './SelectMarketStep';
import RoleStep from './RoleStep';
import CommitmentStep from './CommitmentStep';

// useEffect(() => {
//   console.log(formState.isValid, 'formState');
//   props.setActions(() => {
//     return (
//       <>
//         <Button variant="contained" disabled={!formState.isValid} disableElevation onClick={previous}>
//           Previous {props?.stepper?.currentStep}
//         </Button>
//         <Button variant="contained" disableElevation onClick={onSubmit}>
//           Next
//         </Button>
//       </>
//     );
//   });
// }, [props?.stepper?.currentStep, formState.isValid]);

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
];

const Integrate = () => {
  return <Stepper steps={steps} />;
};

export default Integrate;
