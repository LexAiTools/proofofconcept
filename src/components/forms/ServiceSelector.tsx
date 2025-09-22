import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

export interface ServiceData {
  service: string;
  description: string;
}

interface ServiceSelectorProps {
  onSubmit: (data: ServiceData) => void;
  onBack: () => void;
  showBackButton: boolean;
}

const services = [
  {
    id: "demo",
    title: "Umów DEMO",
    description: "Prezentacja możliwości platformy AI i jej funkcjonalności"
  },
  {
    id: "quote",
    title: "Wycena",
    description: "Szczegółowa wycena rozwiązania dostosowanego do Twoich potrzeb"
  },
  {
    id: "audit",
    title: "Audyt AI",
    description: "Analiza obecnych procesów i możliwości implementacji AI"
  },
  {
    id: "poc",
    title: "Wycena PoC",
    description: "Wycena Proof of Concept dla Twojego konkretnego przypadku użycia"
  }
];

export const ServiceSelector = ({ onSubmit, onBack, showBackButton }: ServiceSelectorProps) => {
  const [selectedService, setSelectedService] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedService) {
      const service = services.find(s => s.id === selectedService);
      if (service) {
        onSubmit({
          service: service.title,
          description: service.description
        });
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Wybierz rodzaj usługi
          </h3>
          <p className="text-muted-foreground">
            Wybierz usługę, która najlepiej odpowiada Twoim potrzebom
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            {services.map((service) => (
              <Card
                key={service.id}
                className={`p-4 cursor-pointer border-2 transition-all hover:border-primary/50 ${
                  selectedService === service.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border'
                }`}
                onClick={() => setSelectedService(service.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                    selectedService === service.id
                      ? 'border-primary bg-primary'
                      : 'border-muted-foreground'
                  }`}>
                    {selectedService === service.id && (
                      <Check className="w-3 h-3 text-primary-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">
                      {service.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </form>
      </div>

      <div className="flex justify-between pt-6 border-t border-border">
        {showBackButton ? (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Wstecz</span>
          </Button>
        ) : (
          <div />
        )}
        
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={!selectedService}
          className="flex items-center space-x-2"
        >
          <span>Dalej</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};