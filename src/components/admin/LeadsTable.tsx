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
import { Eye, Trash2, Mail, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface Lead {
  id: string;
  email: string | null;
  name: string | null;
  company: string | null;
  phone: string | null;
  source_form: string;
  status: string;
  created_at: string;
  message: string | null;
  data_sources: string | null;
  problem: string | null;
  additional_requirements: string | null;
  service: string | null;
  appointment_date: string | null;
  appointment_time: string | null;
  metadata: any;
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
  "chat_ai_collected": "Chat AI",
  "chat-lead-capture": "Chat Lead",
  "quick-start-poc": "Quick Start PoC",
  "interactive-app-poc": "Interactive App PoC",
  "complete-package-poc": "Complete Package PoC",
  "professional-website-poc": "Professional Website PoC",
};

const renderMetadata = (metadata: any, sourceForm: string) => {
  if (!metadata || typeof metadata !== 'object') return null;

  const renderValue = (value: any, key?: string): JSX.Element | string => {
    if (value === null || value === undefined) return "-";
    
    // Color preview
    if (key && (key.includes('color') || key.includes('Color')) && typeof value === 'string') {
      return (
        <div className="flex items-center gap-2">
          <div 
            className="w-6 h-6 rounded border border-border" 
            style={{ backgroundColor: value }}
          />
          <span>{value}</span>
        </div>
      );
    }

    // Array
    if (Array.isArray(value)) {
      if (value.length === 0) return "-";
      return (
        <ul className="list-disc list-inside space-y-1">
          {value.map((item, idx) => (
            <li key={idx} className="text-sm">
              {typeof item === 'object' ? renderObject(item) : String(item)}
            </li>
          ))}
        </ul>
      );
    }

    // Object
    if (typeof value === 'object') {
      return renderObject(value);
    }

    // Price/amount
    if (key && (key.includes('price') || key.includes('amount') || key.includes('budget'))) {
      return <span className="font-semibold">{String(value)}</span>;
    }

    return String(value);
  };

  const renderObject = (obj: any): JSX.Element => (
    <div className="pl-4 space-y-2 border-l-2 border-border">
      {Object.entries(obj).map(([k, v]) => (
        <div key={k}>
          <span className="text-xs font-medium text-muted-foreground">
            {k.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
          </span>
          <div className="mt-1">{renderValue(v, k)}</div>
        </div>
      ))}
    </div>
  );

  const renderSection = (title: string, data: any) => {
    if (!data) return null;
    return (
      <div className="space-y-2">
        <div className="text-sm font-semibold text-foreground">{title}</div>
        <div className="text-sm text-muted-foreground">
          {renderValue(data)}
        </div>
      </div>
    );
  };

  // Filter out conversation_id and other internal fields
  const filteredMetadata = { ...metadata };
  delete filteredMetadata.conversation_id;

  // Quick Start PoC
  if (sourceForm === 'quick-start-poc') {
    return (
      <div className="space-y-4">
        {metadata.targetAudience && renderSection("Grupa docelowa", metadata.targetAudience)}
        {metadata.keyFeatures && renderSection("Kluczowe funkcje", metadata.keyFeatures)}
        {metadata.visualStyle && renderSection("Styl wizualny", metadata.visualStyle)}
        {metadata.inspirations && renderSection("Inspiracje", metadata.inspirations)}
        {metadata.preferredDate && renderSection("Preferowany termin", metadata.preferredDate)}
      </div>
    );
  }

  // Interactive App PoC
  if (sourceForm === 'interactive-app-poc') {
    return (
      <div className="space-y-4">
        {metadata.targetAudience && renderSection("Grupa docelowa", metadata.targetAudience)}
        {metadata.appFeatures && renderSection("Funkcje aplikacji", metadata.appFeatures)}
        {metadata.leadData && renderSection("Dane lead", metadata.leadData)}
        {metadata.appType && renderSection("Typ aplikacji", metadata.appType)}
        {metadata.screens && renderSection("Ekrany", metadata.screens)}
        {metadata.visualStyle && renderSection("Styl wizualny", metadata.visualStyle)}
        {metadata.colors && renderSection("Kolory", metadata.colors)}
        {metadata.timeline && renderSection("Timeline", metadata.timeline)}
        {metadata.pricing && renderSection("Cena", metadata.pricing)}
      </div>
    );
  }

  // Complete Package PoC
  if (sourceForm === 'complete-package-poc') {
    return (
      <div className="space-y-4">
        {metadata.product && renderSection("Produkt", metadata.product)}
        {metadata.targetAudience && renderSection("Grupa docelowa", metadata.targetAudience)}
        {metadata.video && renderSection("Film", metadata.video)}
        {metadata.landingPage && renderSection("Landing Page", metadata.landingPage)}
        {metadata.communication && renderSection("Komunikacja", metadata.communication)}
        {metadata.materials && renderSection("Materiały", metadata.materials)}
        {metadata.timeline && renderSection("Termin", metadata.timeline)}
        {metadata.pricing && renderSection("Cena", metadata.pricing)}
      </div>
    );
  }

  // Professional Website PoC
  if (sourceForm === 'professional-website-poc') {
    return (
      <div className="space-y-4">
        {metadata.industry && renderSection("Branża", metadata.industry)}
        {metadata.products && renderSection("Produkty/Usługi", metadata.products)}
        {metadata.clientType && renderSection("Typ klienta", metadata.clientType)}
        {metadata.subpages && renderSection("Podstrony", metadata.subpages)}
        {metadata.websiteGoal && renderSection("Cel strony", metadata.websiteGoal)}
        {metadata.userActions && renderSection("Akcje użytkownika", metadata.userActions)}
        {metadata.formTypes && renderSection("Typy formularzy", metadata.formTypes)}
        {metadata.integrations && renderSection("Integracje", metadata.integrations)}
        {metadata.ai && renderSection("Funkcje AI", metadata.ai)}
        {metadata.colors && renderSection("Kolory", metadata.colors)}
        {metadata.timeline && renderSection("Timeline", metadata.timeline)}
        {metadata.pricing && renderSection("Cena", metadata.pricing)}
      </div>
    );
  }

  // Generic fallback for other forms
  return (
    <div className="space-y-3">
      {Object.entries(filteredMetadata).map(([key, value]) => (
        <div key={key}>
          <div className="text-sm font-semibold text-foreground mb-1">
            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          </div>
          <div className="text-sm text-muted-foreground">
            {renderValue(value, key)}
          </div>
        </div>
      ))}
    </div>
  );
};

export function LeadsTable() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null);

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

  const toggleExpand = (id: string) => {
    setExpandedLeadId(expandedLeadId === id ? null : id);
  };

  const handleGoToConversation = (conversationId: string) => {
    navigate(`/admin/conversations?id=${conversationId}`);
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
              <>
                <TableRow key={lead.id} className="hover:bg-muted/30">
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
                      {lead.metadata?.conversation_id && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleGoToConversation(lead.metadata.conversation_id)}
                          title="Przejdź do rozmowy"
                        >
                          <MessageSquare className="h-4 w-4 text-blue-500" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpand(lead.id)}
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
                
                {expandedLeadId === lead.id && (
                  <TableRow key={`${lead.id}-details`}>
                    <TableCell colSpan={8} className="bg-muted/20 p-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {lead.message && (
                            <div className="col-span-2">
                              <div className="text-sm font-semibold text-foreground mb-1">Wiadomość</div>
                              <div className="text-sm text-muted-foreground bg-background p-3 rounded-md">
                                {lead.message}
                              </div>
                            </div>
                          )}
                          
                          {lead.service && (
                            <div>
                              <div className="text-sm font-semibold text-foreground mb-1">Usługa</div>
                              <div className="text-sm text-muted-foreground">{lead.service}</div>
                            </div>
                          )}
                          
                          {lead.problem && (
                            <div>
                              <div className="text-sm font-semibold text-foreground mb-1">Problem do rozwiązania</div>
                              <div className="text-sm text-muted-foreground">{lead.problem}</div>
                            </div>
                          )}
                          
                          {lead.data_sources && (
                            <div>
                              <div className="text-sm font-semibold text-foreground mb-1">Źródła danych</div>
                              <div className="text-sm text-muted-foreground">{lead.data_sources}</div>
                            </div>
                          )}
                          
                          {lead.additional_requirements && (
                            <div>
                              <div className="text-sm font-semibold text-foreground mb-1">Dodatkowe wymagania</div>
                              <div className="text-sm text-muted-foreground">{lead.additional_requirements}</div>
                            </div>
                          )}
                          
                          {lead.appointment_date && (
                            <div>
                              <div className="text-sm font-semibold text-foreground mb-1">Data spotkania</div>
                              <div className="text-sm text-muted-foreground">
                                {format(new Date(lead.appointment_date), "dd MMMM yyyy", { locale: pl })}
                                {lead.appointment_time && ` o ${lead.appointment_time}`}
                              </div>
                            </div>
                          )}
                        </div>

                        {lead.metadata && Object.keys(lead.metadata).length > 0 && (
                          <div className="mt-6 pt-6 border-t border-border">
                            <div className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                              <span>Szczegółowe dane z formularza</span>
                              <Badge variant="outline" className="text-xs">
                                {formLabels[lead.source_form] || lead.source_form}
                              </Badge>
                            </div>
                            <div className="bg-background p-4 rounded-md">
                              {renderMetadata(lead.metadata, lead.source_form)}
                            </div>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
