import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { toast } from "sonner";

interface UserWithRole {
  id: string;
  email: string;
  created_at: string;
  role: string | null;
}

export function UsersSection() {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      // Get all user roles
      const { data: rolesData, error: rolesError } = await supabase
        .from("user_roles")
        .select("user_id, role");

      if (rolesError) throw rolesError;

      // Create a map of user_id to role
      const roleMap = new Map(rolesData?.map(r => [r.user_id, r.role]) || []);

      // Get auth users metadata (we can't query auth.users directly, so we use user_roles as base)
      const uniqueUserIds = Array.from(new Set(rolesData?.map(r => r.user_id) || []));
      
      // For now, we'll just show users who have roles
      const usersWithRoles: UserWithRole[] = rolesData?.map(roleData => ({
        id: roleData.user_id,
        email: `user-${roleData.user_id.slice(0, 8)}`, // Placeholder since we can't access auth.users
        created_at: new Date().toISOString(),
        role: roleData.role,
      })) || [];

      setUsers(usersWithRoles);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Błąd podczas wczytywania użytkowników");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Wczytywanie...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">Użytkownicy</h2>
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Użytkownika</TableHead>
              <TableHead>Rola</TableHead>
              <TableHead>Data Dodania Roli</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground">
                  Brak użytkowników
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-mono text-sm">
                    {user.id.slice(0, 8)}...{user.id.slice(-8)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                      {user.role || "user"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(new Date(user.created_at), "dd MMM yyyy, HH:mm", { locale: pl })}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="text-sm text-muted-foreground mt-4">
        Uwaga: Ze względów bezpieczeństwa, pełne dane użytkowników (email, etc.) są dostępne tylko poprzez system autoryzacji.
      </div>
    </div>
  );
}
