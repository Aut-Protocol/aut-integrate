import Stepper from '@components/Stepper';
import { Step } from '@components/Stepper/model';
import SelectMarketStep from './SelectMarketStep';

const steps: Step[] = [
  {
    component: SelectMarketStep,
    title: 'Test title 0',
    description: <div>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam</div>,
  },
  {
    component: SelectMarketStep,
    title: 'Test title 1',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
  },
  {
    component: SelectMarketStep,
    title: 'Test title 2',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
  },
  {
    component: SelectMarketStep,
    title: 'Test title 3',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
  },
  {
    component: SelectMarketStep,
    title: 'Test title 4',
    description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam',
  },
];

const Integrate = () => {
  return <Stepper steps={steps} />;
};

export default Integrate;
