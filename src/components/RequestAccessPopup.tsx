import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { CustomerForm, CustomerFormData } from "./forms/CustomerForm";
import { ServiceSelector, ServiceData } from "./forms/ServiceSelector";
import { DateSelector, DateData } from "./forms/DateSelector";
import { TimeSelector, TimeData } from "./forms/TimeSelector";

interface RequestAccessPopupProps {
  children: React.ReactNode;
}

export const RequestAccessPopup = ({ children }: RequestAccessPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [serviceData, setServiceData] = useState<ServiceData | null>(null);
  const [dateData, setDateData] = useState<DateData | null>(null);
  const [timeData, setTimeData] = useState<TimeData | null>(null);
  const [customerData, setCustomerData] = useState<CustomerFormData | null>(null);

  const handleServiceSubmit = (data: ServiceData) => {
    setServiceData(data);
    setCurrentStep(2);
  };

  const handleDateSubmit = (data: DateData) => {
    setDateData(data);
    setCurrentStep(3);
  };

  const handleTimeSubmit = (data: TimeData) => {
    setTimeData(data);
    setCurrentStep(4);
  };

  const handleCustomerFormSubmit = (data: CustomerFormData) => {
    setCustomerData(data);
    // Here you would normally submit to your backend
    console.log("Final submission:", { 
      service: serviceData, 
      date: dateData, 
      time: timeData, 
      customer: data 
    });
    setIsOpen(false);
    // Reset form
    setCurrentStep(1);
    setServiceData(null);
    setDateData(null);
    setTimeData(null);
    setCustomerData(null);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrentStep(1);
    setServiceData(null);
    setDateData(null);
    setTimeData(null);
    setCustomerData(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-5xl w-full p-0 overflow-hidden bg-background border-border max-h-[90vh] md:max-h-[80vh]">
        <div className="grid lg:grid-cols-2 h-full max-h-[90vh] md:max-h-[80vh] overflow-hidden">
          {/* Left sidebar */}
          <div className="bg-gray-50 p-4 md:p-8 text-gray-900 flex flex-col justify-between relative lg:flex hidden">
            <div>
              {/* Logo */}
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-8">
                <span className="text-white font-bold text-xl">N</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                Umów spotkanie
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Demo naszych rozwiązań AI.
              </p>
            </div>

            <div>
              {/* Steps indicator */}
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep >= 1 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  1
                </div>
                <div className={`flex-1 h-0.5 ${
                  currentStep >= 2 ? 'bg-primary' : 'bg-gray-200'
                }`} />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep >= 2 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  2
                </div>
                <div className={`flex-1 h-0.5 ${
                  currentStep >= 3 ? 'bg-primary' : 'bg-gray-200'
                }`} />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep >= 3 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  3
                </div>
                <div className={`flex-1 h-0.5 ${
                  currentStep >= 4 ? 'bg-primary' : 'bg-gray-200'
                }`} />
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep >= 4 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  4
                </div>
              </div>
              
              <div className="flex justify-between mt-2 text-xs">
                <span className={currentStep >= 1 ? 'text-gray-900' : 'text-gray-500'}>
                  Usługa
                </span>
                <span className={currentStep >= 2 ? 'text-gray-900' : 'text-gray-500'}>
                  Data
                </span>
                <span className={currentStep >= 3 ? 'text-gray-900' : 'text-gray-500'}>
                  Godzina
                </span>
                <span className={currentStep >= 4 ? 'text-gray-900' : 'text-gray-500'}>
                  Dane
                </span>
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="p-4 md:p-8 flex flex-col overflow-y-auto lg:col-span-1 col-span-2 max-h-[90vh] md:max-h-[80vh]">
            {/* Mobile header */}
            <div className="lg:hidden mb-4 pb-4 border-b border-border">
              <h2 className="text-xl font-bold text-foreground mb-2">
                Umów spotkanie
              </h2>
              <div className="flex items-center space-x-1">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                  currentStep >= 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                }`}>1</div>
                <div className={`flex-1 h-0.5 ${currentStep >= 2 ? 'bg-primary' : 'bg-muted'}`} />
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                  currentStep >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                }`}>2</div>
                <div className={`flex-1 h-0.5 ${currentStep >= 3 ? 'bg-primary' : 'bg-muted'}`} />
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                  currentStep >= 3 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                }`}>3</div>
                <div className={`flex-1 h-0.5 ${currentStep >= 4 ? 'bg-primary' : 'bg-muted'}`} />
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                  currentStep >= 4 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                }`}>4</div>
              </div>
            </div>
            {currentStep === 1 && (
              <ServiceSelector 
                onSubmit={handleServiceSubmit}
                onBack={handleBack}
                showBackButton={false}
              />
            )}
            
            {currentStep === 2 && (
              <DateSelector
                onSubmit={handleDateSubmit}
                onBack={handleBack}
                showBackButton={true}
              />
            )}

            {currentStep === 3 && dateData && (
              <TimeSelector
                selectedDate={dateData.date}
                onSubmit={handleTimeSubmit}
                onBack={handleBack}
                showBackButton={true}
              />
            )}

            {currentStep === 4 && (
              <CustomerForm 
                onSubmit={handleCustomerFormSubmit}
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