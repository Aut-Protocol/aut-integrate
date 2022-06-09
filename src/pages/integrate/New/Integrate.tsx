import Stepper, { Step } from '@components/Stepper';

const First = () => {
  return <div>Test</div>;
};

const steps: Step[] = [
  {
    component: First,
  },
  {
    component: First,
  },
  {
    component: First,
  },
  {
    component: First,
  },
  {
    component: First,
  },
];

const Integrate = () => {
  return <Stepper steps={steps} />;
};

export default Integrate;
