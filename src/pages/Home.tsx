import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomeStats } from "@/components/home/HomeStats";
import { HomeLeadsTable } from "@/components/home/HomeLeadsTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [stats, setStats] = useState({
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    total: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const now = new Date();
      
      // Today
      const todayStart = new Date(now);
      todayStart.setHours(0, 0, 0, 0);
      
      const { count: today } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true })
        .gte("created_at", todayStart.toISOString());

      // This week
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - 7);
      weekStart.setHours(0, 0, 0, 0);
      
      const { count: thisWeek } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true })
        .gte("created_at", weekStart.toISOString());

      // This month
      const monthStart = new Date(now);
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);
      
      const { count: thisMonth } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true })
        .gte("created_at", monthStart.toISOString());

      // Total
      const { count: total } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true });

      setStats({
        today: today || 0,
        thisWeek: thisWeek || 0,
        thisMonth: thisMonth || 0,
        total: total || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchStats();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Przegląd leadów i statystyk
              </p>
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Szukaj..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>

          {/* Stats */}
          <HomeStats stats={stats} />

          {/* Leads Table */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Najnowsze Leady
            </h2>
            <HomeLeadsTable searchQuery={searchQuery} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
