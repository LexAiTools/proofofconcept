import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { toast } from "sonner";
import { useState } from "react";
import { Mail, Phone, Building2, Calendar, Clock, FileText, AlertCircle, Tag } from "lucide-react";

interface Lead {
  id: string;
  email: string | null;
  name: string | null;
  company: string | null;
  phone: string | null;
  message: string | null;
  service: string | null;
  data_sources: string | null;
  problem: string | null;
  additional_requirements: string | null;
  appointment_date: string | null;
  appointment_time: string | null;
  source_form: string;
  status: string;
  metadata: any;
  created_at: string;
  updated_at: string;
}

interface LeadDetailsModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const statusOptions = [
  { value: "new", label: "Nowy" },
  { value: "contacted", label: "Skontaktowany" },
  { value: "qualified", label: "Kwalifikowany" },
  { value: "converted", label: "Przekonwertowany" },
  { value: "closed", label: "Zamknięty" },
];

const formLabels: Record<string, string> = {
  contact: "Kontakt",
  "book-demo": "Demo",
  pricing: "Pricing",
  "request-access": "Spotkanie",
};

export function LeadDetailsModal({ lead, isOpen, onClose, onUpdate }: LeadDetailsModalProps) {
  const [status, setStatus] = useState(lead?.status || "new");
  const [updating, setUpdating] = useState(false);

  if (!lead) return null;

  const handleStatusUpdate = async () => {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from("leads")
        .update({ status })
        .eq("id", lead.id);

      if (error) throw error;
      toast.success("Status został zaktualizowany");
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Błąd podczas aktualizacji statusu");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Szczegóły Leada</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Update Section */}
          <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={handleStatusUpdate} 
              disabled={updating || status === lead.status}
              className="mt-6"
            >
              {updating ? "Zapisywanie..." : "Zaktualizuj Status"}
            </Button>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="font-medium">Email</span>
              </div>
              <p className="text-base">{lead.email || "-"}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span className="font-medium">Imię</span>
              </div>
              <p className="text-base">{lead.name || "-"}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span className="font-medium">Telefon</span>
              </div>
              <p className="text-base">{lead.phone || "-"}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="h-4 w-4" />
                <span className="font-medium">Firma</span>
              </div>
              <p className="text-base">{lead.company || "-"}</p>
            </div>
          </div>

          {/* Source Information */}
          <div className="space-y-2 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Tag className="h-4 w-4" />
              <span className="font-medium">Źródło Zgłoszenia</span>
            </div>
            <Badge variant="outline" className="text-base">
              {formLabels[lead.source_form] || lead.source_form}
            </Badge>
          </div>

          {/* Appointment Information */}
          {(lead.appointment_date || lead.appointment_time) && (
            <div className="grid grid-cols-2 gap-4">
              {lead.appointment_date && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">Data Spotkania</span>
                  </div>
                  <p className="text-base">
                    {format(new Date(lead.appointment_date), "dd MMMM yyyy", { locale: pl })}
                  </p>
                </div>
              )}

              {lead.appointment_time && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">Godzina</span>
                  </div>
                  <p className="text-base">{lead.appointment_time}</p>
                </div>
              )}
            </div>
          )}

          {/* Service & Data Sources */}
          {(lead.service || lead.data_sources) && (
            <div className="space-y-4">
              {lead.service && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span className="font-medium">Usługa</span>
                  </div>
                  <p className="text-base">{lead.service}</p>
                </div>
              )}

              {lead.data_sources && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span className="font-medium">Źródła Danych</span>
                  </div>
                  <p className="text-base">{lead.data_sources}</p>
                </div>
              )}
            </div>
          )}

          {/* Problem & Requirements */}
          {(lead.problem || lead.additional_requirements || lead.message) && (
            <div className="space-y-4">
              {lead.problem && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <AlertCircle className="h-4 w-4" />
                    <span className="font-medium">Problem</span>
                  </div>
                  <p className="text-base bg-muted/30 p-3 rounded">{lead.problem}</p>
                </div>
              )}

              {lead.additional_requirements && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span className="font-medium">Dodatkowe Wymagania</span>
                  </div>
                  <p className="text-base bg-muted/30 p-3 rounded">{lead.additional_requirements}</p>
                </div>
              )}

              {lead.message && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span className="font-medium">Wiadomość</span>
                  </div>
                  <p className="text-base bg-muted/30 p-3 rounded">{lead.message}</p>
                </div>
              )}
            </div>
          )}

          {/* Metadata & Dates */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Data Utworzenia</p>
              <p className="text-sm">
                {format(new Date(lead.created_at), "dd MMM yyyy, HH:mm", { locale: pl })}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Ostatnia Aktualizacja</p>
              <p className="text-sm">
                {format(new Date(lead.updated_at), "dd MMM yyyy, HH:mm", { locale: pl })}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
