import { Card, CardContent } from "@/components/ui/card";
import { Calendar, TrendingUp, Users, Clock } from "lucide-react";

interface HomeStatsProps {
  stats: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    total: number;
  };
}

export function HomeStats({ stats }: HomeStatsProps) {
  const statItems = [
    {
      title: "Dzisiaj",
      value: stats.today,
      icon: Clock,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Ten Tydzień",
      value: stats.thisWeek,
      icon: Calendar,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Ten Miesiąc",
      value: stats.thisMonth,
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Łącznie",
      value: stats.total,
      icon: Users,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.title}
            className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <h3 className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </h3>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
