import React from 'react';

interface StepsProps {
  currentStep: number;
  children: React.ReactNode;
}

const Steps: React.FC<StepsProps> = ({ currentStep, children }) => {
  const steps = React.Children.toArray(children);
  return (
    <div className="w-full flex flex-col items-center animate-in fade-in duration-700">
      {steps[currentStep]}
    </div>
  );
};

export default Steps;
