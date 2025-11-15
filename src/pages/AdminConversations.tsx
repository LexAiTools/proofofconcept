import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { MessageSquare, Users, CheckCircle2, XCircle } from "lucide-react";
import { DashboardCard } from "@/components/admin/DashboardCard";
import { ConversationsTable } from "@/components/admin/ConversationsTable";
import { DashboardHeader } from "@/components/admin/DashboardHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";

export default function AdminConversations() {
  const { t } = useTranslation('admin');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isChecking, setIsChecking] = useState(true);
  const [stats, setStats] = useState({
    totalConversations: 0,
    withLeads: 0,
    withoutLeads: 0,
    today: 0,
  });
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const conversationIdFromUrl = searchParams.get('id');
  const hasCheckedRef = useRef(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let isMounted = true;

    if (hasCheckedRef.current) {
      return;
    }

    const checkAdminRole = async () => {
      if (loading) {
        return;
      }
      
      if (!user) {
        hasCheckedRef.current = true;
        navigate('/signin', { replace: true });
        return;
      }

      const checkRoleWithRetry = async (retries = 2): Promise<boolean> => {
        try {
          const { data: roleData, error } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", user.id)
            .eq("role", "admin")
            .maybeSingle();

          if (error) {
            if (error.message?.includes('Failed to fetch') && retries > 0) {
              await new Promise(resolve => setTimeout(resolve, 500));
              return checkRoleWithRetry(retries - 1);
            }
            throw error;
          }
          
          return !!roleData;
        } catch (error) {
          console.error("Error checking admin role:", error);
          throw error;
        }
      };

      try {
        const isAdmin = await checkRoleWithRetry();
        
        if (!isMounted) return;
        
        hasCheckedRef.current = true;
        
        if (!isAdmin) {
          navigate('/home', { replace: true });
          return;
        }
        
        setIsChecking(false);
      } catch (error) {
        console.error("Error checking admin role:", error);
        if (isMounted) {
          navigate('/home', { replace: true });
        }
      }
    };

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
      // Total conversations
      const { count: total } = await supabase
        .from("chat_conversations")
        .select("*", { count: "exact", head: true });

      // Conversations with leads
      const { data: conversationsData } = await supabase
        .from("chat_conversations")
        .select("id, metadata");

      const withLeads = conversationsData?.filter(
        (conv) => conv.metadata && (conv.metadata as any).lead_id
      ).length || 0;

      // Today's conversations
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const { count: todayCount } = await supabase
        .from("chat_conversations")
        .select("*", { count: "exact", head: true })
        .gte("created_at", today.toISOString());

      setStats({
        totalConversations: total || 0,
        withLeads: withLeads,
        withoutLeads: (total || 0) - withLeads,
        today: todayCount || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchStats();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleExport = () => {
    // Export functionality can be implemented later
    console.log("Export conversations");
  };

  const statsData = [
    {
      title: t('conversations.stats.total'),
      value: stats.totalConversations.toString(),
      change: "",
      changeType: 'positive' as const,
      icon: MessageSquare,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: t('conversations.stats.withLeads'),
      value: stats.withLeads.toString(),
      change: "",
      changeType: 'positive' as const,
      icon: CheckCircle2,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: t('conversations.stats.withoutLeads'),
      value: stats.withoutLeads.toString(),
      change: "",
      changeType: 'negative' as const,
      icon: XCircle,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      title: t('conversations.stats.today'),
      value: stats.today.toString(),
      change: "",
      changeType: 'positive' as const,
      icon: Users,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t('dashboard.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <SidebarInset className="flex-1">
          <DashboardHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onRefresh={handleRefresh}
            onExport={handleExport}
            isRefreshing={isRefreshing}
          />

          <div className="p-6 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {t('conversations.title')}
              </h1>
              <p className="text-muted-foreground">
                {t('dashboard.subtitle')}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {statsData.map((stat, index) => (
                <DashboardCard key={stat.title} stat={stat} index={index} />
              ))}
            </div>

            <div>
              <ConversationsTable 
                searchQuery={searchQuery} 
                onRefresh={fetchStats}
                highlightConversationId={conversationIdFromUrl}
              />
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
