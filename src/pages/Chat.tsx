import { useState, useRef, useEffect } from 'react';
import { Bot, ArrowUp, Loader2, MessageSquare, Lightbulb, Settings, DollarSign, Clock } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAutoResizeTextarea } from '@/hooks/use-auto-resize-textarea';
import { Header } from '@/components/Header';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { useLocation } from 'react-router-dom';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chat() {
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 56,
    maxHeight: 200,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle initial message from navigation
  useEffect(() => {
    const initialMessage = location.state?.initialMessage;
    if (initialMessage && messages.length === 0 && !isLoading) {
      setInput(initialMessage);
      // Small delay to ensure textarea is rendered
      setTimeout(() => {
        handleSubmit(undefined, initialMessage);
      }, 100);
    }
  }, [location.state]);

  const handleSubmit = async (e?: React.FormEvent, messageOverride?: string) => {
    e?.preventDefault();
    const userMessage = messageOverride || input.trim();
    if (!userMessage || isLoading) return;

    setInput('');
    adjustHeight(true);

    // Add user message immediately
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/rag-chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            message: userMessage,
            conversationId,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      if (reader) {
        // Add empty assistant message to start streaming
        setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;

              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  assistantMessage += parsed.content;
                  // Update last message with accumulated content
                  setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = {
                      role: 'assistant',
                      content: assistantMessage,
                    };
                    return newMessages;
                  });
                }
                if (parsed.conversationId && !conversationId) {
                  setConversationId(parsed.conversationId);
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast.error(error instanceof Error ? error.message : 'Wystąpił błąd');
      // Remove the empty assistant message if streaming failed
      setMessages(prev => prev.filter(m => m.content !== ''));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col max-w-4xl overflow-hidden">
        <ScrollArea className="flex-1 mb-6 pr-4">
          <div className="space-y-6 pt-20">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="bg-primary/10 rounded-full p-6 mb-6">
                <MessageSquare className="w-16 h-16 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Porozmawiaj z naszym asystentem
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Zapytaj o nasze usługi, technologie, proces współpracy lub cennik.
                Pomożemy Ci zrozumieć jak możemy wspólnie zrealizować Twój projekt MVP.
              </p>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex gap-4 items-start',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.role === 'assistant' && (
                    <div className="bg-primary/10 rounded-full p-2 shrink-0">
                      <Bot className="w-5 h-5 text-primary" />
                    </div>
                  )}
                  <div
                    className={cn(
                      'rounded-2xl px-6 py-4 max-w-[80%]',
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <div className="flex gap-4 items-start justify-start">
                  <div className="bg-primary/10 rounded-full p-2 shrink-0">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <div className="bg-muted rounded-2xl px-6 py-4">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
          </div>
        </ScrollArea>

        <form onSubmit={handleSubmit} className="relative">
          <div className="relative bg-muted/50 rounded-3xl border-2 border-border focus-within:border-primary transition-colors">
            <div className="relative">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  adjustHeight();
                }}
                onKeyDown={handleKeyDown}
                placeholder="Wpisz swoją wiadomość..."
                className={cn(
                  'w-full resize-none rounded-t-3xl border-none bg-transparent',
                  'py-4 pr-14 pl-6 text-base leading-relaxed',
                  'focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
                  'placeholder:text-muted-foreground/70',
                  'min-h-[56px]'
                )}
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className={cn(
                  'absolute top-3 right-3',
                  'rounded-xl h-10 w-10',
                  'transition-all duration-200'
                )}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <ArrowUp className="h-5 w-5" />
                )}
              </Button>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-3 border-t border-border/50">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleSubmit(undefined, "Potrzebuję aplikację MVP, jak mogę zacząć?")}
                className="h-9 gap-2 text-muted-foreground hover:text-foreground"
              >
                <Lightbulb className="h-4 w-4" />
                <span className="text-sm">Potrzebuję aplikację</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleSubmit(undefined, "Jakie technologie używacie do tworzenia aplikacji?")}
                className="h-9 gap-2 text-muted-foreground hover:text-foreground"
              >
                <Settings className="h-4 w-4" />
                <span className="text-sm">Jakie technologie?</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleSubmit(undefined, "Ile kosztuje stworzenie aplikacji MVP?")}
                className="h-9 gap-2 text-muted-foreground hover:text-foreground"
              >
                <DollarSign className="h-4 w-4" />
                <span className="text-sm">Ile to kosztuje?</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleSubmit(undefined, "Jak długo trwa stworzenie aplikacji MVP?")}
                className="h-9 gap-2 text-muted-foreground hover:text-foreground"
              >
                <Clock className="h-4 w-4" />
                <span className="text-sm">Jak długo trwa?</span>
              </Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
