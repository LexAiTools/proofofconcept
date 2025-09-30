import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader } from "@/components/admin/DashboardHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { DocumentsManager } from "@/components/admin/DocumentsManager";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export default function AdminDocuments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isChecking, setIsChecking] = useState(true);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const hasCheckedRef = useRef(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let isMounted = true;

    if (hasCheckedRef.current) {
      return;
    }

    const checkAdminRole = async () => {
      if (loading) return;
      
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

  if (loading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Ładowanie...</div>
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
            onRefresh={() => {}}
            onExport={() => {}}
            isRefreshing={false}
          />

          <div className="flex-1 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Zarządzanie Dokumentami
                </h1>
                <p className="text-muted-foreground mt-2">
                  Dodawaj i zarządzaj dokumentami PDF dostępnymi do pobrania.
                </p>
              </div>

              <DocumentsManager />
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
