import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export interface DateData {
  date: Date;
}

interface DateSelectorProps {
  onSubmit: (data: DateData) => void;
  onBack: () => void;
  showBackButton: boolean;
}

// Generate available dates dynamically (next 60 days, excluding weekends)
const generateAvailableDates = () => {
  const dates = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < 60; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Exclude weekends (Saturday = 6, Sunday = 0)
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      dates.push(date);
    }
  }
  
  return dates;
};

const availableDates = generateAvailableDates();

export const DateSelector = ({ onSubmit, onBack, showBackButton }: DateSelectorProps) => {
  const { t } = useTranslation('forms');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  const isDateAvailable = (date: Date) => {
    return availableDates.some(availableDate => 
      availableDate.toDateString() === date.toDateString()
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate) {
      onSubmit({ date: selectedDate });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <div className="mb-8">
          <h3 className="text-lg md:text-2xl font-bold text-foreground mb-2">
            {t('date.title')}
          </h3>
          <p className="text-muted-foreground text-sm md:text-base">
            {t('date.subtitle')}
          </p>
        </div>

        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            defaultMonth={new Date()}
            disabled={(date) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const checkDate = new Date(date);
              checkDate.setHours(0, 0, 0, 0);
              
              // Allow selection if date is available and not in the past
              return checkDate < today || !isDateAvailable(date);
            }}
            className="p-3 pointer-events-auto rounded-lg border border-border"
            modifiers={{
              available: availableDates,
            }}
            modifiersClassNames={{
              available: "relative after:absolute after:bottom-1 after:left-1/2 after:transform after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:rounded-full after:bg-green-500"
            }}
          />
        </div>

        {selectedDate && (
          <div className="mt-6 p-4 bg-primary/10 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">{t('date.selectedDate')}</p>
            <p className="font-semibold text-foreground">
              {format(selectedDate, "EEEE, d MMMM yyyy")}
            </p>
          </div>
        )}
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
            <span>{t('common:buttons.back')}</span>
          </Button>
        ) : (
          <div />
        )}
        
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={!selectedDate}
          className="flex items-center space-x-2"
        >
          <span>{t('common:buttons.next')}</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};