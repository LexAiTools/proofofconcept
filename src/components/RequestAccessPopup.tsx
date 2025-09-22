import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { CustomerForm, CustomerFormData } from "./forms/CustomerForm";
import { DateTimeSelector, DateTimeData } from "./forms/DateTimeSelector";

interface RequestAccessPopupProps {
  children: React.ReactNode;
}

export const RequestAccessPopup = ({ children }: RequestAccessPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [customerData, setCustomerData] = useState<CustomerFormData | null>(null);
  const [dateTimeData, setDateTimeData] = useState<DateTimeData | null>(null);

  const handleCustomerFormSubmit = (data: CustomerFormData) => {
    setCustomerData(data);
    setCurrentStep(2);
  };

  const handleDateTimeSubmit = (data: DateTimeData) => {
    setDateTimeData(data);
    // Here you would normally submit to your backend
    console.log("Final submission:", { customer: customerData, dateTime: data });
    setIsOpen(false);
    // Reset form
    setCurrentStep(1);
    setCustomerData(null);
    setDateTimeData(null);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrentStep(1);
    setCustomerData(null);
    setDateTimeData(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-5xl w-full p-0 overflow-hidden bg-background border-border">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-50 p-2 rounded-full bg-muted/20 hover:bg-muted/40 transition-colors"
        >
          <X className="w-4 h-4 text-foreground" />
        </button>

        <div className="grid lg:grid-cols-2 min-h-[600px]">
          {/* Left sidebar */}
          <div className="bg-gradient-primary p-8 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-glow/20" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
            
            <div className="relative z-10">
              {/* Logo */}
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-8">
                <span className="text-white font-bold text-xl">N</span>
              </div>

              <h2 className="text-3xl font-bold mb-4">
                Get Started with Proof of Concept
              </h2>
              <p className="text-white/90 text-lg leading-relaxed">
                Join industry leaders who trust our AI-powered solutions. Let's schedule a personalized demo to explore how we can transform your business.
              </p>
            </div>

            <div className="relative z-10">
              {/* Steps indicator */}
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep >= 1 
                    ? 'bg-white text-primary' 
                    : 'bg-white/20 text-white/60'
                }`}>
                  1
                </div>
                <div className={`flex-1 h-0.5 ${
                  currentStep >= 2 ? 'bg-white' : 'bg-white/20'
                }`} />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep >= 2 
                    ? 'bg-white text-primary' 
                    : 'bg-white/20 text-white/60'
                }`}>
                  2
                </div>
              </div>
              
              <div className="flex justify-between mt-2 text-sm">
                <span className={currentStep >= 1 ? 'text-white' : 'text-white/60'}>
                  Your Details
                </span>
                <span className={currentStep >= 2 ? 'text-white' : 'text-white/60'}>
                  Schedule Meeting
                </span>
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="p-8 flex flex-col">
            {currentStep === 1 && (
              <CustomerForm 
                onSubmit={handleCustomerFormSubmit}
                onBack={handleBack}
                showBackButton={false}
              />
            )}
            
            {currentStep === 2 && (
              <DateTimeSelector
                onSubmit={handleDateTimeSubmit}
                onBack={handleBack}
                showBackButton={true}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};