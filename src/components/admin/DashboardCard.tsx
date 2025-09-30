import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  stat: {
    title: string;
    value: string;
    change: string;
    changeType: 'positive' | 'negative';
    icon: LucideIcon;
    color: string;
    bgColor: string;
  };
  index: number;
}

export function DashboardCard({ stat, index }: DashboardCardProps) {
  const Icon = stat.icon;
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </p>
            <h3 className="text-2xl font-bold text-foreground">
              {stat.value}
            </h3>
            <p className={cn(
              "text-xs font-medium",
              stat.changeType === 'positive' ? "text-green-500" : "text-red-500"
            )}>
              {stat.change} od ostatniego miesiąca
            </p>
          </div>
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center",
            stat.bgColor
          )}>
            <Icon className={cn("h-6 w-6", stat.color)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
