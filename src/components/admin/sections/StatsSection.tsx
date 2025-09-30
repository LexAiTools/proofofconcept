import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { toast } from "sonner";

interface Stats {
  byStatus: Array<{ name: string; value: number }>;
  bySource: Array<{ name: string; value: number }>;
  byMonth: Array<{ name: string; value: number }>;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export function StatsSection() {
  const [stats, setStats] = useState<Stats>({
    byStatus: [],
    bySource: [],
    byMonth: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: leads, error } = await supabase
        .from("leads")
        .select("status, source_form, created_at");

      if (error) throw error;

      // Stats by status
      const statusMap = new Map<string, number>();
      leads?.forEach(lead => {
        statusMap.set(lead.status, (statusMap.get(lead.status) || 0) + 1);
      });
      const byStatus = Array.from(statusMap.entries()).map(([name, value]) => ({
        name: name === "new" ? "Nowy" : 
              name === "contacted" ? "Skontaktowany" :
              name === "qualified" ? "Kwalifikowany" :
              name === "converted" ? "Przekonwertowany" : "Zamknięty",
        value
      }));

      // Stats by source
      const sourceMap = new Map<string, number>();
      leads?.forEach(lead => {
        sourceMap.set(lead.source_form, (sourceMap.get(lead.source_form) || 0) + 1);
      });
      const bySource = Array.from(sourceMap.entries()).map(([name, value]) => ({
        name: name === "contact" ? "Kontakt" :
              name === "book-demo" ? "Demo" :
              name === "pricing" ? "Pricing" : "Spotkanie",
        value
      }));

      // Stats by month (last 6 months)
      const monthMap = new Map<string, number>();
      leads?.forEach(lead => {
        const date = new Date(lead.created_at);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        monthMap.set(monthKey, (monthMap.get(monthKey) || 0) + 1);
      });
      
      const sortedMonths = Array.from(monthMap.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .slice(-6)
        .map(([name, value]) => ({
          name: new Date(name + '-01').toLocaleDateString('pl', { month: 'short', year: 'numeric' }),
          value
        }));

      setStats({
        byStatus,
        bySource,
        byMonth: sortedMonths,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      toast.error("Błąd podczas wczytywania statystyk");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Wczytywanie statystyk...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Statystyki</h2>

      {/* Leads by Status */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Leady według statusu</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={stats.byStatus}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {stats.byStatus.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Leads by Source */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Leady według źródła</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.bySource}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Leads by Month */}
      {stats.byMonth.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Leady w ostatnich miesiącach</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.byMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}
    </div>
  );
}
