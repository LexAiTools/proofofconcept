import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are an intelligent assistant for Proof of Concepts, a platform for rapid MVP development. 

LANGUAGE HANDLING:
- Automatically detect the language of the user's first message and respond in that language
- Maintain the same language throughout the entire conversation
- Primary support for Polish and English, but adapt to any language the user uses
- Respond naturally in the detected language - don't mention that you detected the language

STRATEGY:
- Answer EXCLUSIVELY based on the provided knowledge base
- Be helpful, professional, and enthusiastic
- Instead of directly selling, INTRIGUE and EDUCATE
- Subtly guide the conversation towards the value that Proof of Concepts offers
- Identify customer needs through questions
- At the right moment (when the user shows interest) propose contact and registration with us
- Ask for email address or messenger they use, Telegram or other

WHEN TO ENCOURAGE CONTACT:
- When user asks about specific services or pricing
- When they describe their idea/project
- When they ask 'how to start' or 'what next'
- When they show interest in specific solutions

COMMUNICATION STYLE:
- Be friendly and natural
- Avoid overly salesy phrases
- Show expertise through valuable answers
- Ask open questions that deepen the conversation

NEVER make up information - if you don't have the answer in the knowledge base, simply say you don't have that information and propose contact with the team.`;

// Language detection function
function detectLanguage(text: string): string {
  // Polish specific characters
  const polishChars = /[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/;
  
  // Common Polish words
  const polishWords = /\b(jak|co|czy|jest|w|z|na|do|i|że|się|nie|aby|który|która|które|kiedy|gdzie|dlaczego|potrzebuję|chcę|mogę|jestem)\b/i;
  
  if (polishChars.test(text) || polishWords.test(text)) {
    return 'pl';
  }
  
  return 'en'; // Default to English
}

// Error messages in multiple languages
const ERROR_MESSAGES = {
  rate_limit: {
    pl: 'Limit zapytań przekroczony. Spróbuj ponownie za chwilę.',
    en: 'Rate limit exceeded. Please try again in a moment.'
  },
  payment_required: {
    pl: 'Brak środków w koncie AI. Skontaktuj się z administratorem.',
    en: 'AI credits exhausted. Please contact the administrator.'
  }
};

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

    // 1. Search knowledge base for relevant content
    const { data: knowledgeData, error: kbError } = await supabase
      .from('knowledge_base')
      .select('title, content')
      .limit(5);

    if (kbError) {
      console.error('Knowledge base error:', kbError);
    }

    // Build context from knowledge base
    const context = knowledgeData && knowledgeData.length > 0
      ? knowledgeData.map(item => `${item.title}: ${item.content}`).join('\n\n')
      : '';

    // 2. Get conversation history and metadata if conversationId exists
    let conversationHistory: any[] = [];
    let conversationLanguage = 'en';
    
    if (conversationId) {
      // Get conversation metadata
      const { data: conversation } = await supabase
        .from('chat_conversations')
        .select('metadata')
        .eq('id', conversationId)
        .single();
      
      if (conversation?.metadata?.language) {
        conversationLanguage = conversation.metadata.language;
      }
      
      // Get messages
      const { data: messages } = await supabase
        .from('chat_messages')
        .select('role, content')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })
        .limit(10);

      if (messages) {
        conversationHistory = messages;
      }
    }

    // 3. Create new conversation if needed and detect language
    let finalConversationId = conversationId;
    if (!finalConversationId) {
      // Detect language from first user message
      conversationLanguage = detectLanguage(message);
      
      const { data: newConv, error: convError } = await supabase
        .from('chat_conversations')
        .insert({
          metadata: { 
            started_at: new Date().toISOString(),
            language: conversationLanguage
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

    // 5. Build messages for AI with language context
    const languageContext = conversationLanguage === 'pl' 
      ? '\n\nIMPORTANT: This conversation is in POLISH. Continue responding in Polish.'
      : '\n\nIMPORTANT: This conversation is in ENGLISH. Continue responding in English.';
    
    const messages = [
      { 
        role: 'system', 
        content: `${SYSTEM_PROMPT}${languageContext}\n\nBAZA WIEDZY:\n${context}` 
      },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    // 6. Call Lovable AI with streaming
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
          JSON.stringify({ error: ERROR_MESSAGES.rate_limit[conversationLanguage as 'pl' | 'en'] || ERROR_MESSAGES.rate_limit.en }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: ERROR_MESSAGES.payment_required[conversationLanguage as 'pl' | 'en'] || ERROR_MESSAGES.payment_required.en }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI API error: ${response.status}`);
    }

    // 7. Stream response back to client and save assistant message
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
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
