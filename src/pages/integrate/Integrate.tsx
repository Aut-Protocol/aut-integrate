import Stepper from '@components/Stepper';
import { Step } from '@components/Stepper/model';
import CommunityInfoStep from './CommunityInfoStep';
import ImportContractStep from './ImportContractStep';
import SelectMarketStep from './SelectMarketStep';

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
    description: <div>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam</div>,
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
    component: SelectMarketStep,
    title: 'Roles',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
  },
  {
    component: SelectMarketStep,
    title: 'Commitment',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
  },
];

const Integrate = () => {
  return <Stepper steps={steps} />;
};

export default Integrate;
