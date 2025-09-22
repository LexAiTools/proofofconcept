import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DateData {
  date: Date;
}

interface DateSelectorProps {
  onSubmit: (data: DateData) => void;
  onBack: () => void;
  showBackButton: boolean;
}

// Mock available dates - you can replace this with API data
const availableDates = [
  new Date(2025, 8, 25), // September 25, 2025
  new Date(2025, 8, 26), // September 26, 2025
  new Date(2025, 8, 27), // September 27, 2025
  new Date(2025, 8, 30), // September 30, 2025
  new Date(2025, 9, 1),  // October 1, 2025
  new Date(2025, 9, 2),  // October 2, 2025
  new Date(2025, 9, 3),  // October 3, 2025
];

export const DateSelector = ({ onSubmit, onBack, showBackButton }: DateSelectorProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();

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
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Wybierz datę
          </h3>
          <p className="text-muted-foreground">
            Wybierz dostępną datę spotkania
          </p>
        </div>

        <div className="flex justify-center">
          <div className="relative">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => 
                date < new Date() || !isDateAvailable(date)
              }
              className={cn("p-3 pointer-events-auto rounded-lg border border-border")}
              classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium",
                nav: "space-x-1 flex items-center",
                nav_button: cn(
                  "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                ),
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: cn(
                  "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
                  "after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:transform after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:rounded-full after:opacity-0"
                ),
                day: cn(
                  "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                  "[&[data-available='true']]:after:opacity-100 [&[data-available='true']]:after:bg-green-500"
                ),
                day_range_end: "day-range-end",
                day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                day_today: "bg-accent text-accent-foreground",
                day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                day_disabled: "text-muted-foreground opacity-50",
                day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible",
              }}
              modifiers={{
                available: availableDates,
              }}
              modifiersClassNames={{
                available: "after:opacity-100 after:bg-green-500"
              }}
              components={{
                Day: ({ date, ...props }) => {
                  const isAvailable = isDateAvailable(date);
                  return (
                    <button
                      {...props}
                      data-available={isAvailable}
                    />
                  );
                }
              }}
            />
          </div>
        </div>

        {selectedDate && (
          <div className="mt-6 p-4 bg-primary/10 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Wybrana data:</p>
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
            <span>Wstecz</span>
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
          <span>Dalej</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};