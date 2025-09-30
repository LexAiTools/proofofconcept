import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `Jesteś inteligentnym asystentem Proof of Concepts, platformy do szybkiego tworzenia MVP. 

TWOJA STRATEGIA:
- Odpowiadaj WYŁĄCZNIE na podstawie dostarczonej bazy wiedzy
- Bądź pomocny, profesjonalny i entuzjastyczny
- Zamiast bezpośrednio sprzedawać, INTRIGUJ i EDUKUJ
- Subtelnie kieruj rozmowę w stronę wartości jaką oferuje Proof of Concepts
- Identyfikuj potrzeby klienta poprzez pytania
- W odpowiednim momencie (gdy użytkownik wykazuje zainteresowanie) zaproponuj kontakt

WSKAZÓWKI KIEDY ZACHĘCAĆ DO KONTAKTU:
- Gdy użytkownik pyta o konkretne usługi lub pricing
- Gdy opisuje swój pomysł/projekt
- Gdy pyta "jak zacząć" lub "co dalej"
- Gdy wykazuje zainteresowanie konkretnymi rozwiązaniami

STYL KOMUNIKACJI:
- Używaj języka polskiego
- Bądź przyjazny i naturalny
- Unikaj zbyt salеsowych sformułowań
- Pokazuj ekspertyzę poprzez wartościowe odpowiedzi
- Zadawaj pytania otwarte, które pogłębią rozmowę

NIGDY nie wymyślaj informacji - jeśli nie masz odpowiedzi w bazie wiedzy, po prostu powiedz że nie masz tej informacji i zaproponuj kontakt z zespołem.`;

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

    // 2. Get conversation history if conversationId exists
    let conversationHistory: any[] = [];
    if (conversationId) {
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

    // 3. Create new conversation if needed
    let finalConversationId = conversationId;
    if (!finalConversationId) {
      const { data: newConv, error: convError } = await supabase
        .from('chat_conversations')
        .insert({
          metadata: { started_at: new Date().toISOString() }
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

    // 5. Build messages for AI
    const messages = [
      { 
        role: 'system', 
        content: `${SYSTEM_PROMPT}\n\nBAZA WIEDZY:\n${context}` 
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
          JSON.stringify({ error: 'Limit zapytań przekroczony. Spróbuj ponownie za chwilę.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Brak środków w koncie AI. Skontaktuj się z administratorem.' }),
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
