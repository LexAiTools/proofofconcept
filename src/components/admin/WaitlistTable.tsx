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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Trash2, Download, Mail } from "lucide-react";
import { toast } from "sonner";

interface WaitlistEntry {
  id: string;
  email: string;
  source_button: string;
  created_at: string;
  metadata: any;
}

interface WaitlistTableProps {
  searchQuery: string;
  onRefresh: () => void;
}

const sourceLabels: Record<string, string> = {
  download: "Download Plugin",
  documentation: "View Documentation",
};

export function WaitlistTable({ searchQuery, onRefresh }: WaitlistTableProps) {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredEntries, setFilteredEntries] = useState<WaitlistEntry[]>([]);

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from("plugin_waitlist")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error("Error fetching waitlist entries:", error);
      toast.error("Błąd podczas wczytywania listy oczekujących");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredEntries(entries);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = entries.filter((entry) =>
      entry.email.toLowerCase().includes(query) ||
      sourceLabels[entry.source_button]?.toLowerCase().includes(query)
    );
    setFilteredEntries(filtered);
  }, [searchQuery, entries]);

  const handleDelete = async (id: string, email: string) => {
    if (!confirm(`Czy na pewno chcesz usunąć ${email} z listy oczekujących?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from("plugin_waitlist")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      toast.success("Wpis usunięty z listy oczekujących");
      fetchEntries();
      onRefresh();
    } catch (error) {
      console.error("Error deleting waitlist entry:", error);
      toast.error("Błąd podczas usuwania wpisu");
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ["Email", "Źródło", "Data zapisu", "Język"],
      ...entries.map((entry) => [
        entry.email,
        sourceLabels[entry.source_button] || entry.source_button,
        format(new Date(entry.created_at), "dd.MM.yyyy HH:mm", { locale: pl }),
        entry.metadata?.language?.toUpperCase() || "N/A",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `waitlist_${format(new Date(), "yyyy-MM-dd")}.csv`;
    link.click();
    
    toast.success("Lista eksportowana do CSV");
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Ładowanie listy oczekujących...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          Lista oczekujących ({filteredEntries.length})
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={exportToCSV}
          disabled={entries.length === 0}
        >
          <Download className="h-4 w-4 mr-2" />
          Eksportuj CSV
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Źródło</TableHead>
                <TableHead>Data zapisu</TableHead>
                <TableHead>Język</TableHead>
                <TableHead className="text-right">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    {searchQuery ? "Nie znaleziono wyników" : "Brak zapisów na liście oczekujących"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        {entry.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {sourceLabels[entry.source_button] || entry.source_button}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(new Date(entry.created_at), "dd.MM.yyyy HH:mm", { locale: pl })}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {entry.metadata?.language?.toUpperCase() || "N/A"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(entry.id, entry.email)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
