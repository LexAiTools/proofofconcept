import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

interface VisualStyleCardProps {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

export const VisualStyleCard = ({ title, description, selected, onClick }: VisualStyleCardProps) => {
  return (
    <Card
      className={`p-4 sm:p-6 cursor-pointer transition-all hover:border-primary/50 active:scale-95 ${
        selected ? 'border-2 border-primary bg-primary/5' : 'border border-border'
      }`}
      onClick={onClick}
    >
      <div className="text-center space-y-1.5 sm:space-y-2">
        <h4 className="font-bold text-lg text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
        {selected && (
          <div className="flex justify-center pt-2">
            <Check className="w-5 h-5 text-primary" />
          </div>
        )}
      </div>
    </Card>
  );
};
