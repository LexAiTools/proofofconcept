import { useEffect, useRef, useState } from "react";

interface CompactPocProgressBarProps {
  currentStep: number;
  steps: string[];
  totalSteps: number;
}

export const CompactPocProgressBar = ({ currentStep, steps, totalSteps }: CompactPocProgressBarProps) => {
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepWidth = 80; // Width per step including margin

  useEffect(() => {
    // Calculate which steps to show (5 visible at a time)
    let visibleStartIndex = 0;
    
    if (currentStep <= 3) {
      visibleStartIndex = 0; // Show steps 1-5
    } else if (currentStep >= 13) {
      visibleStartIndex = 9; // Show steps 10-14
    } else {
      visibleStartIndex = currentStep - 3; // Show currentStep centered
    }
    
    setOffset(visibleStartIndex * stepWidth);
  }, [currentStep]);

  const inputSteps = steps.slice(0, 14); // Steps 1-14
  const summaryStep = steps[14]; // Step 15

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 overflow-hidden">
        {/* Sliding container for steps 1-14 */}
        <div className="flex-1 overflow-hidden" ref={containerRef}>
          <div 
            className="flex items-center transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${offset}px)` }}
          >
            {inputSteps.map((step, index) => {
              const stepNumber = index + 1;
              const isActive = currentStep >= stepNumber;
              const isCurrent = currentStep === stepNumber;
              
              return (
                <div key={index} className="flex items-center flex-shrink-0" style={{ width: `${stepWidth}px` }}>
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all ${
                      isCurrent
                        ? 'bg-primary text-primary-foreground ring-4 ring-primary/20 scale-110'
                        : isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {stepNumber}
                  </div>
                  {index < inputSteps.length - 1 && (
                    <div
                      className={`h-0.5 w-8 mx-1 transition-colors ${
                        currentStep > stepNumber ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Separator */}
        <div className="h-10 w-px bg-border mx-2 flex-shrink-0" />

        {/* Fixed step 15 - Summary */}
        <div className="flex-shrink-0">
          <div
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all ${
              currentStep === 15
                ? 'bg-primary text-primary-foreground ring-4 ring-primary/20 scale-110'
                : currentStep > 15
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            15
          </div>
        </div>
      </div>
      
      {/* Step labels - hidden on mobile, shown on larger screens */}
      <div className="hidden lg:flex justify-between text-xs font-medium mt-3 px-1">
        <span
          className={`transition-colors flex-1 text-center ${
            currentStep >= 1 && currentStep <= 5 ? 'text-foreground' : 'text-muted-foreground'
          }`}
        >
          Kroki 1-5
        </span>
        <span
          className={`transition-colors flex-1 text-center ${
            currentStep >= 6 && currentStep <= 10 ? 'text-foreground' : 'text-muted-foreground'
          }`}
        >
          Kroki 6-10
        </span>
        <span
          className={`transition-colors flex-1 text-center ${
            currentStep >= 11 && currentStep <= 14 ? 'text-foreground' : 'text-muted-foreground'
          }`}
        >
          Kroki 11-14
        </span>
        <span
          className={`transition-colors ${
            currentStep === 15 ? 'text-foreground' : 'text-muted-foreground'
          }`}
        >
          Podsumowanie
        </span>
      </div>
    </div>
  );
};
