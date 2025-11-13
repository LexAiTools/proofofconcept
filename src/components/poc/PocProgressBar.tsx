interface PocProgressBarProps {
  currentStep: number;
  steps: string[];
  totalSteps: number;
}

export const PocProgressBar = ({ currentStep, steps, totalSteps }: PocProgressBarProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center flex-1 last:flex-none">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                currentStep >= index + 1
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`h-0.5 flex-1 mx-2 transition-colors ${
                  currentStep > index + 1 ? 'bg-primary' : 'bg-muted'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      
      <div className="hidden lg:flex justify-between text-xs font-medium">
        {steps.map((step, index) => (
          <span
            key={index}
            className={`transition-colors ${
              currentStep >= index + 1 ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
};
