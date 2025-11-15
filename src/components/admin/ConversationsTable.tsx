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
import { Eye, MessageSquare, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  role: string;
  content: string;
  created_at: string;
}

interface Conversation {
  id: string;
  created_at: string;
  email: string | null;
  name: string | null;
  phone: string | null;
  metadata: any;
  message_count: number;
  lead_id: string | null;
  lead_name: string | null;
  lead_email: string | null;
}

interface ConversationsTableProps {
  searchQuery: string;
  onRefresh: () => void;
}

export function ConversationsTable({ searchQuery, onRefresh }: ConversationsTableProps) {
  const { t } = useTranslation('admin');
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedConvId, setExpandedConvId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const fetchConversations = async () => {
    try {
      const { data: conversationsData, error: convError } = await supabase
        .from("chat_conversations")
        .select("*")
        .order("created_at", { ascending: false });

      if (convError) throw convError;

      // Get message counts for each conversation
      const conversationsWithCounts = await Promise.all(
        (conversationsData || []).map(async (conv) => {
          const { count } = await supabase
            .from("chat_messages")
            .select("*", { count: "exact", head: true })
            .eq("conversation_id", conv.id);

          // Check if there's a linked lead
          let leadData = null;
          if (conv.metadata && (conv.metadata as any).lead_id) {
            const { data: lead } = await supabase
              .from("leads")
              .select("id, name, email")
              .eq("id", (conv.metadata as any).lead_id)
              .single();
            leadData = lead;
          }

          return {
            ...conv,
            message_count: count || 0,
            lead_id: leadData?.id || null,
            lead_name: leadData?.name || null,
            lead_email: leadData?.email || null,
          };
        })
      );

      setConversations(conversationsWithCounts);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      toast.error("Błąd podczas wczytywania rozmów");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchMessages = async (conversationId: string) => {
    setLoadingMessages(true);
    try {
      const { data, error } = await supabase
        .from("chat_messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Błąd podczas wczytywania wiadomości");
    } finally {
      setLoadingMessages(false);
    }
  };

  const toggleExpand = async (id: string) => {
    if (expandedConvId === id) {
      setExpandedConvId(null);
      setMessages([]);
    } else {
      setExpandedConvId(id);
      await fetchMessages(id);
    }
  };

  const filteredConversations = conversations.filter((conv) => {
    if (!searchQuery) return true;
    const search = searchQuery.toLowerCase();
    return (
      conv.email?.toLowerCase().includes(search) ||
      conv.name?.toLowerCase().includes(search) ||
      conv.phone?.toLowerCase().includes(search)
    );
  });

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Wczytywanie...</div>;
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('conversations.table.date')}</TableHead>
            <TableHead>{t('conversations.table.contact')}</TableHead>
            <TableHead>{t('conversations.table.messages')}</TableHead>
            <TableHead>{t('conversations.table.leadStatus')}</TableHead>
            <TableHead className="text-right">{t('conversations.table.actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredConversations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                Brak rozmów
              </TableCell>
            </TableRow>
          ) : (
            filteredConversations.map((conv) => (
              <>
                <TableRow key={conv.id}>
                  <TableCell>
                    {format(new Date(conv.created_at), "dd.MM.yyyy, HH:mm", { locale: pl })}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {conv.name && <div className="font-medium">{conv.name}</div>}
                      {conv.email && <div className="text-sm text-muted-foreground">{conv.email}</div>}
                      {conv.phone && <div className="text-sm text-muted-foreground">{conv.phone}</div>}
                      {!conv.name && !conv.email && !conv.phone && (
                        <div className="text-sm text-muted-foreground">Brak danych</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="gap-1">
                      <MessageSquare className="h-3 w-3" />
                      {conv.message_count}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {conv.lead_id ? (
                      <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                        {t('conversations.status.withLead')}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground">
                        {t('conversations.status.withoutLead')}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpand(conv.id)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        {t('conversations.table.viewTranscript')}
                      </Button>
                      {conv.lead_id && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate('/admin', { state: { highlightLead: conv.lead_id } })}
                        >
                          <LinkIcon className="h-4 w-4 mr-1" />
                          {t('conversations.table.viewLead')}
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
                {expandedConvId === conv.id && (
                  <TableRow>
                    <TableCell colSpan={5} className="bg-muted/50">
                      <div className="p-4 space-y-4">
                        <div className="font-semibold text-sm">
                          {t('conversations.transcript.title')}
                        </div>
                        {loadingMessages ? (
                          <div className="text-center py-4 text-muted-foreground">
                            Wczytywanie transkrypcji...
                          </div>
                        ) : messages.length === 0 ? (
                          <div className="text-center py-4 text-muted-foreground">
                            {t('conversations.transcript.noMessages')}
                          </div>
                        ) : (
                          <div className="space-y-3 max-h-[500px] overflow-y-auto">
                            {messages.map((msg) => (
                              <div
                                key={msg.id}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                              >
                                <div
                                  className={`max-w-[70%] rounded-lg p-3 ${
                                    msg.role === 'user'
                                      ? 'bg-primary text-primary-foreground'
                                      : 'bg-muted text-foreground'
                                  }`}
                                >
                                  <div className="text-xs font-semibold mb-1 opacity-70">
                                    {msg.role === 'user' 
                                      ? t('conversations.transcript.user')
                                      : t('conversations.transcript.assistant')
                                    }
                                  </div>
                                  <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                                  <div className="text-xs opacity-70 mt-1">
                                    {format(new Date(msg.created_at), "HH:mm", { locale: pl })}
                                  </div>
                                </div>
                              </div>
                            ))}
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
