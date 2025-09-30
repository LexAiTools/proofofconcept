import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Users, Mail, TrendingUp, Eye } from "lucide-react";
import { DashboardCard } from "@/components/admin/DashboardCard";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { DashboardHeader } from "@/components/admin/DashboardHeader";
import { AdminSidebar, AdminSection } from "@/components/admin/AdminSidebar";
import { LeadsSection } from "@/components/admin/sections/LeadsSection";
import { UsersSection } from "@/components/admin/sections/UsersSection";
import { StatsSection } from "@/components/admin/sections/StatsSection";
import { SettingsSection } from "@/components/admin/sections/SettingsSection";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export default function Admin() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isChecking, setIsChecking] = useState(true);
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    converted: 0,
    thisMonth: 0,
  });
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const hasCheckedRef = useRef(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let isMounted = true;

    if (hasCheckedRef.current) {
      console.log('Admin page: already checked, skipping');
      return;
    }

    const checkAdminRole = async () => {
      console.log('Admin page: checking auth state', { loading, user: !!user });
      
      if (loading) {
        console.log('Admin page: still loading auth state');
        return;
      }
      
      if (!user) {
        console.log('Admin page: no user, redirecting to signin');
        hasCheckedRef.current = true;
        navigate('/signin', { replace: true });
        return;
      }

      console.log('Admin page: checking admin role for user', user.id);
      
      // Retry logic for network errors
      const checkRoleWithRetry = async (retries = 2): Promise<boolean> => {
        try {
          const { data: roleData, error } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", user.id)
            .eq("role", "admin")
            .maybeSingle();

          console.log('Admin page: role check result', { roleData, error });

          if (error) {
            // If it's a network error and we have retries left, try again
            if (error.message?.includes('Failed to fetch') && retries > 0) {
              console.log(`Admin page: network error, retrying... (${retries} attempts left)`);
              await new Promise(resolve => setTimeout(resolve, 500));
              return checkRoleWithRetry(retries - 1);
            }
            throw error;
          }
          
          return !!roleData;
        } catch (error) {
          console.error("Admin page: error checking admin role:", error);
          throw error;
        }
      };

      try {
        const isAdmin = await checkRoleWithRetry();
        
        if (!isMounted) return;
        
        hasCheckedRef.current = true;
        
        if (!isAdmin) {
          console.log('Admin page: user is not admin, redirecting to home');
          navigate('/home', { replace: true });
          return;
        }
        
        console.log('Admin page: user is admin, showing dashboard');
        setIsChecking(false);
      } catch (error) {
        console.error("Admin page: error checking admin role:", error);
        if (isMounted) {
          navigate('/home', { replace: true });
        }
      }
    };

    // Debounce the check
    timeoutId = setTimeout(() => {
      checkAdminRole();
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [user, loading, navigate]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { count: totalLeads } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true });

      const { count: newLeads } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true })
        .eq("status", "new");

      const { count: converted } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true })
        .eq("status", "converted");

      const firstDayOfMonth = new Date();
      firstDayOfMonth.setDate(1);
      firstDayOfMonth.setHours(0, 0, 0, 0);

      const { count: thisMonth } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true })
        .gte("created_at", firstDayOfMonth.toISOString());

      setStats({
        totalLeads: totalLeads || 0,
        newLeads: newLeads || 0,
        converted: converted || 0,
        thisMonth: thisMonth || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const dashboardStats = [
    {
      title: "Wszystkie Leady",
      value: stats.totalLeads.toString(),
      change: "+12%",
      changeType: "positive" as const,
      icon: Mail,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Nowe Leady",
      value: stats.newLeads.toString(),
      change: "+8.2%",
      changeType: "positive" as const,
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Przekonwertowane",
      value: stats.converted.toString(),
      change: "+15%",
      changeType: "positive" as const,
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Ten Miesiąc",
      value: stats.thisMonth.toString(),
      change: "+23%",
      changeType: "positive" as const,
      icon: Eye,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchStats();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleExport = () => {
    console.log("Exporting data...");
  };

  if (loading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Ładowanie...</div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case "leads":
        return <LeadsSection />;
      case "users":
        return <UsersSection />;
      case "stats":
        return <StatsSection />;
      case "settings":
        return <SettingsSection />;
      default:
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Witaj w Panelu Admina
              </h1>
              <p className="text-muted-foreground mt-2">
                Zarządzaj leadami i użytkownikami swojej platformy.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {dashboardStats.map((stat, index) => (
                <DashboardCard key={stat.title} stat={stat} index={index} />
              ))}
            </div>

            {/* Leads Table */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                Ostatnie Leady
              </h2>
              <LeadsTable />
            </div>
          </div>
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <SidebarInset className="flex-1">
          <DashboardHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onRefresh={handleRefresh}
            onExport={handleExport}
            isRefreshing={isRefreshing}
          />

          <div className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
