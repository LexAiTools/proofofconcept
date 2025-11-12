import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export interface TimeData {
  time: string;
  date: Date;
}

interface TimeSelectorProps {
  selectedDate: Date;
  onSubmit: (data: TimeData) => void;
  onBack: () => void;
  showBackButton: boolean;
}

// Mock time slots - you can replace this with API data based on selected date
const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00",
  "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00",
  "16:30", "17:00", "17:30", "18:00", "18:30"
];

export const TimeSelector = ({ selectedDate, onSubmit, onBack, showBackButton }: TimeSelectorProps) => {
  const { t } = useTranslation('forms');
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTime) {
      onSubmit({
        time: selectedTime,
        date: selectedDate
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            {t('time.title')}
          </h3>
          <p className="text-muted-foreground mb-2">
            {t('time.subtitle')}
          </p>
          <div className="p-3 bg-primary/10 rounded-lg">
            <p className="text-sm text-muted-foreground">{t('time.selectedDate')}</p>
            <p className="font-semibold text-foreground">
              {format(selectedDate, "EEEE, d MMMM yyyy")}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium text-foreground mb-4">
            {t('time.availableSlots')}
          </p>
          <div className="grid grid-cols-5 gap-3">
            {timeSlots.map((time) => (
              <Button
                key={time}
                type="button"
                variant={selectedTime === time ? "default" : "outline"}
                className={`h-10 text-sm transition-all ${
                  selectedTime === time
                    ? "bg-green-600 hover:bg-green-700 border-green-600 text-white"
                    : "border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300"
                }`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>

        {selectedTime && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
            <p className="text-sm text-green-700">{t('time.selectedMeeting')}</p>
            <p className="font-semibold text-green-800">
              {format(selectedDate, "d MMMM yyyy")} {t('time.at')} {selectedTime}
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
          disabled={!selectedTime}
          className="flex items-center space-x-2"
        >
          <span>{t('common:buttons.next')}</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};