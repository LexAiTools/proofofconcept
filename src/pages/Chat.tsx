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
import { useTranslation } from 'react-i18next';
import { LeadCaptureForm } from '@/components/chat/LeadCaptureForm';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chat() {
  const { t } = useTranslation(['chat', 'engine']);
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [characterQueue, setCharacterQueue] = useState<string[]>([]);
  const characterQueueRef = useRef<string[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [showLeadForm, setShowLeadForm] = useState<number | null>(null);
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
  }, [messages, displayedText]);

  // Character-by-character typing effect
  useEffect(() => {
    if (!isStreaming || characterQueueRef.current.length === 0) return;

    const TYPING_SPEED = 30; // ms between characters
    
    const timer = setInterval(() => {
      if (characterQueueRef.current.length > 0) {
        const nextChar = characterQueueRef.current.shift()!;
        setDisplayedText(prev => prev + nextChar);
        setStreamingMessage(prev => prev + nextChar);
        setCharacterQueue([...characterQueueRef.current]); // Trigger re-render
      } else {
        clearInterval(timer);
      }
    }, TYPING_SPEED);

    return () => clearInterval(timer);
  }, [isStreaming, characterQueue.length]);

  // Handle initial message from navigation
  useEffect(() => {
    const initialMessage = location.state?.initialMessage;
    const featureKey = location.state?.featureKey;
    
    if (initialMessage && messages.length === 0 && !isLoading) {
      // If featureKey exists, show explanation directly from translations
      if (featureKey) {
        const explanation = t(`engine:howItWorks.featureExplanations.${featureKey}`, { defaultValue: '' });
        
        if (explanation) {
          // Don't send to API, just display the explanation
          setMessages([
            { 
              role: 'assistant', 
              content: explanation 
            }
          ]);
          return;
        }
      }
      
      // Otherwise, send the initial message to the API as before
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

    // Reset typing animation state
    characterQueueRef.current = [];
    setCharacterQueue([]);
    setDisplayedText('');
    setStreamingMessage('');

    // Add user message immediately
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    setIsWaiting(true);

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
      let firstChunk = true;

      if (reader) {
        let textBuffer = ''; // Buffer for incomplete lines

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          textBuffer += decoder.decode(value, { stream: true });

          // Process only complete lines
          let newlineIndex: number;
          while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
            let line = textBuffer.slice(0, newlineIndex);
            textBuffer = textBuffer.slice(newlineIndex + 1);

            if (line.endsWith('\r')) line = line.slice(0, -1); // Handle CRLF
            if (line.startsWith(':') || line.trim() === '') continue; // SSE comments
            if (!line.startsWith('data: ')) continue;

            const data = line.slice(6).trim();
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                // Hide waiting indicator and start streaming on first chunk
                if (firstChunk) {
                  setIsWaiting(false);
                  setIsStreaming(true);
                  setDisplayedText('');
                  firstChunk = false;
                }
                
                assistantMessage += parsed.content;
                // Add characters to queue for typing animation
                const newChars = parsed.content.split('');
                characterQueueRef.current.push(...newChars);
                setCharacterQueue([...characterQueueRef.current]);
              }
              if (parsed.conversationId && !conversationId) {
                setConversationId(parsed.conversationId);
              }
            } catch (e) {
              console.error('Failed to parse JSON:', data, e);
            }
          }
        }

        // Final flush buffer
        if (textBuffer.trim()) {
          for (let raw of textBuffer.split('\n')) {
            if (!raw) continue;
            if (raw.endsWith('\r')) raw = raw.slice(0, -1);
            if (raw.startsWith(':') || raw.trim() === '') continue;
            if (!raw.startsWith('data: ')) continue;
            const data = raw.slice(6).trim();
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                if (firstChunk) {
                  setIsWaiting(false);
                  setIsStreaming(true);
                  setDisplayedText('');
                  firstChunk = false;
                }
                assistantMessage += parsed.content;
                // Add characters to queue for typing animation
                const newChars = parsed.content.split('');
                characterQueueRef.current.push(...newChars);
                setCharacterQueue([...characterQueueRef.current]);
              }
              if (parsed.conversationId && !conversationId) {
                setConversationId(parsed.conversationId);
              }
            } catch (e) {
              // Ignore partial leftovers
            }
          }
        }
        
        // Wait for all characters to be displayed before finalizing
        if (assistantMessage) {
          // Wait for queue to empty
          while (characterQueueRef.current.length > 0) {
            await new Promise(resolve => setTimeout(resolve, 50));
          }
          
          setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
          setIsStreaming(false);
          setStreamingMessage('');
          setDisplayedText('');
          characterQueueRef.current = [];
          setCharacterQueue([]);
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast.error(error instanceof Error ? error.message : t('errors.general'));
    } finally {
      setIsLoading(false);
      setIsWaiting(false);
      setIsStreaming(false);
      setStreamingMessage('');
    }
  };

  const detectLeadTrigger = (content: string): boolean => {
    // Disable automatic form trigger - AI now collects data naturally in conversation
    // Only show form if AI explicitly asks to "fill form" or "click button"
    const formTriggers = ['fill form', 'formularz', 'wypełnij formularz', 'click here', 'kliknij tutaj'];
    return formTriggers.some(trigger => content.toLowerCase().includes(trigger));
  };

  const handleLeadFormSuccess = () => {
    setShowLeadForm(null);
    toast.success(t('leads:success'));
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
                {t('welcome.title')}
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                {t('welcome.description')}
              </p>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <div key={index} className="space-y-2">
                  <div
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
                  
                  {message.role === "assistant" && 
                   detectLeadTrigger(message.content) && 
                   showLeadForm !== index && (
                    <div className="flex justify-start ml-14">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowLeadForm(index)}
                        className="text-sm"
                      >
                        {t('leads:actions.showForm')}
                      </Button>
                    </div>
                  )}
                  
                  {showLeadForm === index && conversationId && (
                    <div className="ml-14">
                      <LeadCaptureForm
                        conversationId={conversationId}
                        onSuccess={handleLeadFormSuccess}
                        onCancel={() => setShowLeadForm(null)}
                        lastUserMessage={messages[messages.length - 1]?.content}
                      />
                    </div>
                  )}
                </div>
              ))}
              
              {/* Typing indicator during waiting */}
              {isWaiting && (
                <div className="flex gap-4 items-start justify-start animate-fade-in">
                  <div className="bg-primary/10 rounded-full p-2 shrink-0">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <div className="bg-muted rounded-2xl px-6 py-4">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Streaming message with typing cursor */}
              {isStreaming && displayedText && (
                <div className="flex gap-4 items-start justify-start animate-fade-in">
                  <div className="bg-primary/10 rounded-full p-2 shrink-0">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <div className="bg-muted rounded-2xl px-6 py-4">
                    <p className="whitespace-pre-wrap leading-relaxed">
                      {displayedText}
                      <span className="inline-block w-[2px] h-5 bg-primary ml-1 animate-pulse">▊</span>
                    </p>
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
                placeholder={t('input.placeholder')}
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
                onClick={() => handleSubmit(undefined, t('quickActions.needApp.message'))}
                className="h-9 gap-2 text-muted-foreground hover:text-foreground"
              >
                <Lightbulb className="h-4 w-4" />
                <span className="text-sm">{t('quickActions.needApp.label')}</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleSubmit(undefined, t('quickActions.technologies.message'))}
                className="h-9 gap-2 text-muted-foreground hover:text-foreground"
              >
                <Settings className="h-4 w-4" />
                <span className="text-sm">{t('quickActions.technologies.label')}</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleSubmit(undefined, t('quickActions.pricing.message'))}
                className="h-9 gap-2 text-muted-foreground hover:text-foreground"
              >
                <DollarSign className="h-4 w-4" />
                <span className="text-sm">{t('quickActions.pricing.label')}</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleSubmit(undefined, t('quickActions.timeline.message'))}
                className="h-9 gap-2 text-muted-foreground hover:text-foreground"
              >
                <Clock className="h-4 w-4" />
                <span className="text-sm">{t('quickActions.timeline.label')}</span>
              </Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
