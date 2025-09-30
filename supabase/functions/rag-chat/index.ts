import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper function to detect language from text
function detectLanguage(text: string): string {
  const lowerText = text.toLowerCase();
  
  // Polish indicators
  const polishWords = ['potrzebuję', 'jak', 'gdzie', 'kiedy', 'dlaczego', 'czy', 'jest', 'może', 'chcę', 'proszę', 'dziękuję', 'ile', 'kosztuje'];
  const polishChars = /[ąćęłńóśźż]/i;
  
  if (polishChars.test(text) || polishWords.some(word => lowerText.includes(word))) {
    return 'pl';
  }
  
  // Default to English
  return 'en';
}

// Error messages by language
const ERROR_MESSAGES = {
  rateLimit: {
    pl: 'Limit zapytań przekroczony. Spróbuj ponownie za chwilę.',
    en: 'Rate limit exceeded. Please try again in a moment.'
  },
  payment: {
    pl: 'Brak środków w koncie AI. Skontaktuj się z administratorem.',
    en: 'AI account out of credits. Please contact administrator.'
  },
  general: {
    pl: 'Wystąpił błąd. Spróbuj ponownie.',
    en: 'An error occurred. Please try again.'
  }
};

const SYSTEM_PROMPT = `You are an intelligent assistant for Proof of Concepts, a platform for rapid MVP development. 

  "strategy_points": {
    "knowledge_base": "Answer EXCLUSIVELY based on the provided knowledge base",
    "be_helpful": "Be helpful, professional, and enthusiastic",
    "intrigue_educate": "Instead of directly selling, INTRIGUE and EDUCATE",
    "guide_conversation": "Subtly guide the conversation towards the value that Proof of Concepts offers",
    "identify_needs": "Identify customer needs through questions",
    "propose_contact": "At the right moment (when the user shows interest) propose contact and registration with us",
    "ask_contact_info": "Ask for email address or messenger they use, Telegram or other"
  },
  "when_to_encourage_contact": "GUIDELINES WHEN TO ENCOURAGE CONTACT:",
  "contact_triggers": {
    "services_pricing": "When user asks about specific services or pricing",
    "describes_project": "When they describe their idea/project",
    "asks_next_steps": "When they ask 'how to start' or 'what next'",
    "shows_interest": "When they show interest in specific solutions"
  },
  "communication_style": "COMMUNICATION STYLE:",
  "style_points": {
    "language_adaptation": "CRITICAL: Detect the language of the user's first message and respond EXCLUSIVELY in that language throughout the entire conversation. Match the user's language exactly.",
    "be_friendly": "Be friendly and natural",
    "avoid_sales": "Avoid overly salesy phrases",
    "show_expertise": "Show expertise through valuable answers",
    "ask_open_questions": "Ask open questions that deepen the conversation"
  },
  "never_fabricate": "NEVER make up information - if you don't have the answer in the knowledge base, simply say you don't have that information and propose contact with the team.";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationId } = await req.json();
    
    if (!message || typeof message !== 'string') {
      throw new Error('Message is required');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Detect language from user message
    const detectedLanguage = detectLanguage(message);

    // 1. Get or create conversation and detect language
    let finalConversationId = conversationId;
    let conversationLanguage = detectedLanguage;
    
    if (conversationId) {
      // Get existing conversation to check stored language
      const { data: existingConv } = await supabase
        .from('chat_conversations')
        .select('metadata')
        .eq('id', conversationId)
        .single();
      
      if (existingConv?.metadata?.language) {
        conversationLanguage = existingConv.metadata.language;
      }
    } else {
      // Create new conversation with detected language
      const { data: newConv, error: convError } = await supabase
        .from('chat_conversations')
        .insert({
          metadata: { 
            started_at: new Date().toISOString(),
            language: detectedLanguage
          }
        })
        .select('id')
        .single();

      if (convError) {
        console.error('Error creating conversation:', convError);
      } else if (newConv) {
        finalConversationId = newConv.id;
      }
    }

    // 2. Search knowledge base for relevant content (prefer content in conversation language)
    const { data: knowledgeData, error: kbError } = await supabase
      .from('knowledge_base')
      .select('title, content, metadata')
      .limit(10);

    if (kbError) {
      console.error('Knowledge base error:', kbError);
    }

    // Build context from knowledge base, prioritizing content in the conversation language
    let context = '';
    if (knowledgeData && knowledgeData.length > 0) {
      // First, try to get content in the conversation language
      const languageSpecificContent = knowledgeData.filter(
        (item) => {
          const lang = item.metadata as any;
          return lang && lang.language === conversationLanguage;
        }
      );
      
      // If no language-specific content, use all content
      const contentToUse = languageSpecificContent.length > 0 
        ? languageSpecificContent 
        : knowledgeData;
      
      const contextParts: string[] = [];
      for (const item of contentToUse.slice(0, 5)) {
        contextParts.push(item.title + ': ' + item.content);
      }
      context = contextParts.join('\n\n');
    }

    // 3. Get conversation history if conversationId exists
    let conversationHistory: any[] = [];
    if (finalConversationId) {
      const { data: messages } = await supabase
        .from('chat_messages')
        .select('role, content')
        .eq('conversation_id', finalConversationId)
        .order('created_at', { ascending: true })
        .limit(10);

      if (messages) {
        conversationHistory = messages;
      }
    }

    // 4. Save user message
    if (finalConversationId) {
      await supabase
        .from('chat_messages')
        .insert({
          conversation_id: finalConversationId,
          role: 'user',
          content: message
        });
    }

    // 4. Build messages for AI with language instruction
    const languageInstruction = conversationLanguage === 'pl' 
      ? '\n\nIMPORTANT: Respond in POLISH language.'
      : '\n\nIMPORTANT: Respond in ENGLISH language.';
    
    const systemContent = SYSTEM_PROMPT + languageInstruction + '\n\nKNOWLEDGE BASE:\n' + context;
    
    const messages = [
      { 
        role: 'system', 
        content: systemContent
      },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    // 5. Call Lovable AI with streaming
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages,
        stream: true,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: ERROR_MESSAGES.rateLimit[conversationLanguage] || ERROR_MESSAGES.rateLimit.en }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: ERROR_MESSAGES.payment[conversationLanguage] || ERROR_MESSAGES.payment.en }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI API error: ${response.status}`);
    }

    // 6. Stream response back to client and save assistant message
    let fullResponse = '';
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body!.getReader();
        const decoder = new TextDecoder();

        try {
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
                  const content = parsed.choices?.[0]?.delta?.content;
                  
                  if (content) {
                    fullResponse += content;
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content, conversationId: finalConversationId })}\n\n`));
                  }
                } catch (e) {
                  // Skip invalid JSON
                }
              }
            }
          }

          // Save assistant message
          if (finalConversationId && fullResponse) {
            await supabase
              .from('chat_messages')
              .insert({
                conversation_id: finalConversationId,
                role: 'assistant',
                content: fullResponse
              });
          }

          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          console.error('Stream error:', error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Error in rag-chat function:', error);
    
    // Try to detect language from error context
    const errorLang = 'en'; // Default to English for error messages
    
    return new Response(
      JSON.stringify({ 
        error: ERROR_MESSAGES.general[errorLang] || error.message || 'Internal server error' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
