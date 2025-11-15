import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { DashboardHeader } from "@/components/admin/DashboardHeader";
import { DashboardCard } from "@/components/admin/DashboardCard";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { Users, UserCheck, UserPlus, ClipboardList } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function AdminLeads() {
  const navigate = useNavigate();
  const { t } = useTranslation("admin");
  const [isChecking, setIsChecking] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    converted: 0,
    pocOrders: 0,
  });

  useEffect(() => {
    const checkAdminAccess = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/signin');
        return;
      }

      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .single();

      if (roleError || roleData?.role !== 'admin') {
        navigate('/');
        return;
      }

      setIsChecking(false);
    };

    checkAdminAccess();
  }, [navigate]);

  useEffect(() => {
    if (!isChecking) {
      fetchStats();
    }
  }, [isChecking]);

  const fetchStats = async () => {
    setIsRefreshing(true);
    try {
      const { data: leads, error } = await supabase
        .from('leads')
        .select('status, source_form');

      if (error) throw error;

      const total = leads?.length || 0;
      const newLeads = leads?.filter(l => l.status === 'new').length || 0;
      const converted = leads?.filter(l => l.status === 'converted').length || 0;
      const pocOrders = leads?.filter(l => 
        l.source_form?.includes('-poc')
      ).length || 0;

      setStats({
        total,
        new: newLeads,
        converted,
        pocOrders,
      });
    } catch (error) {
      console.error('Error fetching lead stats:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleExport = () => {
    console.log('Export leads...');
  };

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-3 text-muted-foreground">{t('dashboard.loading')}</span>
      </div>
    );
  }

  const statsCards = [
    {
      stat: {
        title: t('leads.stats.all'),
        value: stats.total.toString(),
        change: "+0%",
        changeType: 'positive' as const,
        icon: Users,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
      },
      index: 0,
    },
    {
      stat: {
        title: t('leads.stats.new'),
        value: stats.new.toString(),
        change: "+0%",
        changeType: 'positive' as const,
        icon: UserPlus,
        color: "text-green-500",
        bgColor: "bg-green-500/10",
      },
      index: 1,
    },
    {
      stat: {
        title: "Zamówienia PoC",
        value: stats.pocOrders.toString(),
        change: "+0%",
        changeType: 'positive' as const,
        icon: ClipboardList,
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
      },
      index: 2,
    },
    {
      stat: {
        title: t('leads.stats.converted'),
        value: stats.converted.toString(),
        change: "+0%",
        changeType: 'positive' as const,
        icon: UserCheck,
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
      },
      index: 3,
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <SidebarInset className="flex-1">
          <DashboardHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onRefresh={fetchStats}
            onExport={handleExport}
            isRefreshing={isRefreshing}
          />
          
          <div className="p-6 space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {statsCards.map((card) => (
                <DashboardCard key={card.index} {...card} />
              ))}
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-foreground">
                {t('leads.table.title')}
              </h2>
              <LeadsTable />
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
