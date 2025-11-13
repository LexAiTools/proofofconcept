import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CompactPocProgressBarProps {
  currentStep: number;
  steps: string[];
  totalSteps: number;
}

export const CompactPocProgressBar = ({ currentStep, steps, totalSteps }: CompactPocProgressBarProps) => {
  const [offset, setOffset] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
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

  // Scroll logic
  const maxOffset = Math.max(0, (inputSteps.length - 5) * stepWidth);
  const canScrollLeft = offset > 0;
  const canScrollRight = offset < maxOffset;

  const scrollLeft = () => {
    const newOffset = Math.max(0, offset - (5 * stepWidth));
    setOffset(newOffset);
  };

  const scrollRight = () => {
    const newOffset = Math.min(maxOffset, offset + (5 * stepWidth));
    setOffset(newOffset);
  };

  // Touch gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const delta = touchStart - e.touches[0].clientX;
    const newOffset = Math.max(0, Math.min(maxOffset, offset + delta));
    setOffset(newOffset);
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    // Snap to nearest step
    const nearestStep = Math.round(offset / stepWidth);
    setOffset(Math.min(maxOffset, Math.max(0, nearestStep * stepWidth)));
  };

  return (
    <div className="w-full relative">
      <div className="flex items-center gap-2 relative">
        {/* Left scroll button */}
        {canScrollLeft && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 z-10 w-8 h-8 rounded-full bg-background/90 backdrop-blur-sm border border-border shadow-lg flex items-center justify-center hover:bg-background transition-all hover:scale-110"
            aria-label="Przewiń w lewo"
          >
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>
        )}

        {/* Sliding container for steps 1-14 with padding to prevent clipping */}
        <div className="flex-1 overflow-hidden px-10 py-2" ref={containerRef}>
          <div 
            className="flex items-center transition-transform duration-300 ease-in-out touch-pan-x"
            style={{ transform: `translateX(-${offset}px)`, touchAction: 'pan-x' }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
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
        <div className="flex-shrink-0 py-2">
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

        {/* Right scroll button */}
        {canScrollRight && (
          <button
            onClick={scrollRight}
            className="absolute right-0 z-10 w-8 h-8 rounded-full bg-background/90 backdrop-blur-sm border border-border shadow-lg flex items-center justify-center hover:bg-background transition-all hover:scale-110"
            aria-label="Przewiń w prawo"
          >
            <ChevronRight className="w-4 h-4 text-foreground" />
          </button>
        )}
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
