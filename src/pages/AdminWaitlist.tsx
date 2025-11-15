import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Users, TrendingUp, UserCheck, Clock } from "lucide-react";
import { DashboardCard } from "@/components/admin/DashboardCard";
import { WaitlistTable } from "@/components/admin/WaitlistTable";
import { DashboardHeader } from "@/components/admin/DashboardHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const INITIAL_OFFSET = 8744;
const MAX_SPOTS = 14000;

export default function AdminWaitlist() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isChecking, setIsChecking] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    displayed: 0,
    spotsLeft: 0,
    today: 0,
    thisWeek: 0,
  });
  
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const hasCheckedRef = useRef(false);

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (loading) return;
      
      if (!hasCheckedRef.current) {
        hasCheckedRef.current = true;
        
        if (!user) {
          console.log('AdminWaitlist: No user, redirecting to signin');
          navigate('/signin');
          return;
        }

        try {
          const { data: roleData, error: roleError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)
            .eq('role', 'admin')
            .single();

          if (roleError || !roleData) {
            console.log('AdminWaitlist: Not an admin, redirecting to home');
            navigate('/');
            return;
          }

          console.log('AdminWaitlist: Admin access confirmed');
          setIsChecking(false);
        } catch (error) {
          console.error('AdminWaitlist: Error checking admin status:', error);
          navigate('/');
        }
      }
    };

    checkAdminAccess();
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!isChecking) {
      fetchStats();
    }
  }, [isChecking]);

  const fetchStats = async () => {
    try {
      const { count: totalCount } = await supabase
        .from("plugin_waitlist")
        .select("*", { count: "exact", head: true });

      const total = totalCount || 0;
      const displayed = total + INITIAL_OFFSET;
      const spotsLeft = MAX_SPOTS - displayed;

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const { count: todayCount } = await supabase
        .from("plugin_waitlist")
        .select("*", { count: "exact", head: true })
        .gte("created_at", today.toISOString());

      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      weekAgo.setHours(0, 0, 0, 0);
      const { count: weekCount } = await supabase
        .from("plugin_waitlist")
        .select("*", { count: "exact", head: true })
        .gte("created_at", weekAgo.toISOString());

      setStats({
        total,
        displayed,
        spotsLeft,
        today: todayCount || 0,
        thisWeek: weekCount || 0,
      });
    } catch (error) {
      console.error("Error fetching waitlist stats:", error);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchStats();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  if (isChecking || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Ładowanie...</p>
        </div>
      </div>
    );
  }

  const statsCards = [
    {
      title: "Zapisanych (baza)",
      value: stats.total.toString(),
      change: "rzeczywista liczba w DB",
      changeType: 'positive' as const,
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Wyświetlana liczba",
      value: stats.displayed.toLocaleString('pl-PL'),
      change: `z offsetem ${INITIAL_OFFSET}`,
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Pozostałe miejsca",
      value: stats.spotsLeft.toLocaleString('pl-PL'),
      change: `z ${MAX_SPOTS.toLocaleString('pl-PL')} miejsc`,
      changeType: stats.spotsLeft < 1000 ? 'negative' as const : 'positive' as const,
      icon: UserCheck,
      color: stats.spotsLeft < 1000 ? "text-orange-500" : "text-green-500",
      bgColor: stats.spotsLeft < 1000 ? "bg-orange-500/10" : "bg-green-500/10",
    },
    {
      title: "Dzisiaj",
      value: stats.today.toString(),
      change: "nowe zapisy",
      changeType: 'positive' as const,
      icon: Clock,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <SidebarInset>
          <div className="border-b border-border bg-background px-6 py-4">
            <h1 className="text-2xl font-bold text-foreground">Waitlist WordPress Plugin</h1>
            <p className="text-sm text-muted-foreground">Zarządzaj zapisami na listę oczekujących</p>
          </div>
          <DashboardHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onRefresh={handleRefresh}
            onExport={() => {}}
            isRefreshing={isRefreshing}
          />

          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {statsCards.map((stat, index) => (
                  <DashboardCard key={stat.title} stat={stat} index={index} />
                ))}
              </div>

              <WaitlistTable 
                searchQuery={searchQuery} 
                onRefresh={handleRefresh}
              />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
