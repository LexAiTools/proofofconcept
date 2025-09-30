import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LogOut, RefreshCw, Search, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { format, startOfDay, startOfWeek, startOfMonth } from 'date-fns';

type Lead = {
  id: string;
  created_at: string;
  company: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  source_form: string;
  status: string | null;
};

type Stats = {
  today: number;
  thisWeek: number;
  thisMonth: number;
  total: number;
};

export default function Admin() {
  console.log('[Admin] Component rendering');
  const { loading: authLoading } = useAdminAuth();
  const { signOut } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats>({ today: 0, thisWeek: 0, thisMonth: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  console.log('[Admin] authLoading:', authLoading, 'loading:', loading);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('leads' as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setLeads((data || []) as unknown as Lead[]);
      calculateStats((data || []) as unknown as Lead[]);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast.error('Błąd podczas pobierania leadów');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (leadsData: Lead[]) => {
    const now = new Date();
    const todayStart = startOfDay(now);
    const weekStart = startOfWeek(now, { weekStartsOn: 1 });
    const monthStart = startOfMonth(now);

    const today = leadsData.filter(
      (lead) => new Date(lead.created_at) >= todayStart
    ).length;

    const thisWeek = leadsData.filter(
      (lead) => new Date(lead.created_at) >= weekStart
    ).length;

    const thisMonth = leadsData.filter(
      (lead) => new Date(lead.created_at) >= monthStart
    ).length;

    setStats({
      today,
      thisWeek,
      thisMonth,
      total: leadsData.length,
    });
  };

  useEffect(() => {
    if (!authLoading) {
      fetchLeads();
    }
  }, [authLoading]);

  useEffect(() => {
    let filtered = leads;

    if (statusFilter !== 'all') {
      filtered = filtered.filter((lead) => lead.status === statusFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter((lead) =>
        lead.company?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredLeads(filtered);
  }, [leads, statusFilter, searchQuery]);

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('leads' as any)
        .update({ status: newStatus })
        .eq('id', leadId);

      if (error) throw error;

      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === leadId ? { ...lead, status: newStatus } : lead
        )
      );
      toast.success('Status zaktualizowany');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Błąd podczas aktualizacji statusu');
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!confirm('Czy na pewno chcesz usunąć ten lead?')) return;

    try {
      const { error } = await supabase.from('leads' as any).delete().eq('id', leadId);

      if (error) throw error;

      setLeads((prev) => prev.filter((lead) => lead.id !== leadId));
      toast.success('Lead usunięty');
    } catch (error) {
      console.error('Error deleting lead:', error);
      toast.error('Błąd podczas usuwania leadu');
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Ładowanie...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Panel Administratora</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={fetchLeads}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Odśwież
            </Button>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Wyloguj
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Dzisiaj</div>
            <div className="text-3xl font-bold">{stats.today}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Ten tydzień</div>
            <div className="text-3xl font-bold">{stats.thisWeek}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Ten miesiąc</div>
            <div className="text-3xl font-bold">{stats.thisMonth}</div>
          </Card>
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-2">Łącznie</div>
            <div className="text-3xl font-bold">{stats.total}</div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4 mb-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Szukaj po nazwie firmy..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filtruj po statusie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Wszystkie</SelectItem>
                <SelectItem value="new">Nowy</SelectItem>
                <SelectItem value="contacted">Skontaktowany</SelectItem>
                <SelectItem value="qualified">Zakwalifikowany</SelectItem>
                <SelectItem value="converted">Przekonwertowany</SelectItem>
                <SelectItem value="lost">Utracony</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Leads Table */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Firma</TableHead>
                <TableHead>Imię</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefon</TableHead>
                <TableHead>Źródło</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                    Brak leadów do wyświetlenia
                  </TableCell>
                </TableRow>
              ) : (
                filteredLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="whitespace-nowrap">
                      {format(new Date(lead.created_at), 'dd.MM.yyyy HH:mm')}
                    </TableCell>
                    <TableCell>{lead.company || '-'}</TableCell>
                    <TableCell>{lead.name || '-'}</TableCell>
                    <TableCell>{lead.email || '-'}</TableCell>
                    <TableCell>{lead.phone || '-'}</TableCell>
                    <TableCell className="capitalize">{lead.source_form}</TableCell>
                    <TableCell>
                      <Select
                        value={lead.status || 'new'}
                        onValueChange={(value) => handleStatusChange(lead.id, value)}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">Nowy</SelectItem>
                          <SelectItem value="contacted">Skontaktowany</SelectItem>
                          <SelectItem value="qualified">Zakwalifikowany</SelectItem>
                          <SelectItem value="converted">Przekonwertowany</SelectItem>
                          <SelectItem value="lost">Utracony</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteLead(lead.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </main>
    </div>
  );
}
