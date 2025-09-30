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
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Eye, Trash2, Mail } from "lucide-react";
import { toast } from "sonner";

interface Lead {
  id: string;
  email: string | null;
  name: string | null;
  company: string | null;
  phone: string | null;
  source_form: string;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
  contacted: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
  qualified: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20",
  converted: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
  closed: "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20",
};

const statusLabels: Record<string, string> = {
  new: "Nowy",
  contacted: "Skontaktowany",
  qualified: "Kwalifikowany",
  converted: "Przekonwertowany",
  closed: "Zamknięty",
};

const formLabels: Record<string, string> = {
  contact: "Kontakt",
  "book-demo": "Demo",
  pricing: "Pricing",
  "request-access": "Spotkanie",
};

export function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
      toast.error("Błąd podczas wczytywania leadów");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("leads")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Lead został usunięty");
      fetchLeads();
    } catch (error) {
      console.error("Error deleting lead:", error);
      toast.error("Błąd podczas usuwania leada");
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Wczytywanie...</div>;
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Imię</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Firma</TableHead>
            <TableHead>Telefon</TableHead>
            <TableHead>Źródło</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data</TableHead>
            <TableHead className="text-right">Akcje</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-muted-foreground">
                Brak leadów
              </TableCell>
            </TableRow>
          ) : (
            leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">
                  {lead.name || "-"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {lead.email || "-"}
                  </div>
                </TableCell>
                <TableCell>{lead.company || "-"}</TableCell>
                <TableCell>{lead.phone || "-"}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {formLabels[lead.source_form] || lead.source_form}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[lead.status] || statusColors.new}>
                    {statusLabels[lead.status] || lead.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {format(new Date(lead.created_at), "dd MMM yyyy, HH:mm", { locale: pl })}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toast.info("Szczegóły leada - TODO")}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(lead.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
