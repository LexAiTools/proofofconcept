import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, ArrowRight, CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const dateTimeSchema = z.object({
  date: z.date({
    required_error: "Please select a date.",
  }),
  timeSlot: z.string().min(1, "Please select a time slot."),
});

export type DateTimeData = z.infer<typeof dateTimeSchema>;

interface DateTimeSelectorProps {
  onSubmit: (data: DateTimeData) => void;
  onBack: () => void;
  showBackButton: boolean;
}

// Mock available dates and time slots
const availableDates = [
  new Date(2024, 8, 25), // September 25, 2024
  new Date(2024, 8, 26), // September 26, 2024
  new Date(2024, 8, 27), // September 27, 2024
  new Date(2024, 8, 30), // September 30, 2024
  new Date(2024, 9, 1),  // October 1, 2024
  new Date(2024, 9, 2),  // October 2, 2024
];

const timeSlots = [
  "9:00 AM - 9:30 AM",
  "10:00 AM - 10:30 AM",
  "11:00 AM - 11:30 AM",
  "2:00 PM - 2:30 PM",
  "3:00 PM - 3:30 PM",
  "4:00 PM - 4:30 PM",
];

export const DateTimeSelector = ({ onSubmit, onBack, showBackButton }: DateTimeSelectorProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  
  const form = useForm<DateTimeData>({
    resolver: zodResolver(dateTimeSchema),
    defaultValues: {
      date: undefined,
      timeSlot: "",
    },
  });

  const watchedDate = form.watch("date");

  const isDateAvailable = (date: Date) => {
    return availableDates.some(
      availableDate => 
        availableDate.getDate() === date.getDate() &&
        availableDate.getMonth() === date.getMonth() &&
        availableDate.getFullYear() === date.getFullYear()
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-foreground mb-2">Schedule your consultation</h3>
        <p className="text-muted-foreground mb-8">
          Pick a date and time that works best for you. All times are in PST.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-foreground font-medium">Select Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal bg-input border-border hover:bg-muted/20",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-popover border-border" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setSelectedDate(date);
                          form.setValue("timeSlot", ""); // Reset time slot when date changes
                        }}
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return date < today || !isDateAvailable(date);
                        }}
                        modifiers={{
                          available: availableDates,
                        }}
                        modifiersStyles={{
                          available: {
                            position: 'relative',
                          }
                        }}
                        modifiersClassNames={{
                          available: "after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:transform after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary after:rounded-full",
                        }}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchedDate && (
              <FormField
                control={form.control}
                name="timeSlot"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">
                      Pick a slot for {format(watchedDate, "EEEE, MMMM d")}
                    </FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => field.onChange(slot)}
                            className={cn(
                              "p-3 rounded-lg border transition-all duration-200 text-left",
                              "hover:border-primary hover:bg-primary/5",
                              field.value === slot
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border bg-input text-foreground"
                            )}
                          >
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4" />
                              <span className="font-medium">{slot}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={onBack}
                disabled={!showBackButton}
                className={showBackButton ? "text-muted-foreground hover:text-foreground" : "invisible"}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <Button
                type="submit"
                variant="default"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                disabled={!form.formState.isValid}
              >
                Schedule Meeting
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};