import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Database } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function SettingsSection() {
  const handleExportLeads = async () => {
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Convert to CSV
      const headers = Object.keys(data[0] || {});
      const csv = [
        headers.join(","),
        ...data.map(row => 
          headers.map(header => {
            const value = row[header as keyof typeof row];
            return typeof value === 'string' && value.includes(',') 
              ? `"${value}"` 
              : value;
          }).join(",")
        )
      ].join("\n");

      // Download
      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);

      toast.success("Dane zostały wyeksportowane");
    } catch (error) {
      console.error("Error exporting leads:", error);
      toast.error("Błąd podczas eksportu danych");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Ustawienia</h2>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Database className="h-5 w-5" />
          Eksport Danych
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Wyeksportuj wszystkie leady do pliku CSV
        </p>
        <Button onClick={handleExportLeads} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Eksportuj Leady
        </Button>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Informacje Systemowe</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Wersja:</span>
            <span className="font-medium">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Backend:</span>
            <span className="font-medium">Lovable Cloud</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status:</span>
            <span className="font-medium text-green-500">Aktywny</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
