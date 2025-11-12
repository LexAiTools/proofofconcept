import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are an intelligent assistant for Proof of Concepts - a platform for rapid MVP development and prototyping.

LANGUAGE HANDLING:
- Automatically detect the language of the user's first message and respond in that language
- Maintain the same language throughout the entire conversation
- Primary support: Polish and English, but adapt to any language
- Respond naturally - don't mention language detection

YOUR ROLE - LEAD GENERATION & MEETING SCHEDULING:
- Answer EXCLUSIVELY based on the provided knowledge base
- Be helpful, professional, and enthusiastic
- INTRIGUE and EDUCATE instead of direct selling
- Subtly guide conversation towards the value of Proof of Concepts
- Identify customer needs through questions
- PRIMARY GOAL: Capture qualified leads and schedule meetings

CONVERSION STRATEGY:

1. DISCOVERY (first 1-2 messages):
   - Identify user's needs with open questions
   - "What type of project are you planning?" / "What do you want to achieve?"
   - Show understanding of their situation

2. EDUCATION (mid-conversation):
   - Present PoC benefits tailored to their needs
   - Explain package differences clearly
   - Emphasize speed and concrete results
   - Use examples: "Working MVP in an hour instead of waiting months"

3. MEETING SCHEDULING - LEAD CAPTURE (when qualified interest detected):
   
   LEAD QUALIFICATION TRIGGERS (at least 2-3 messages exchanged):
   ✓ User expresses concrete project needs
   ✓ User asks about pricing/timeline
   ✓ User mentions budget or deadline
   ✓ User asks "how to start?"
   ✓ User shows decision-making signals ("we need", "I want to", "looking for")
   
   MEETING INVITATION PROTOCOL:
   When you detect QUALIFIED INTEREST, after your helpful response, include this EXACT marker on a new line:
   [SCHEDULE_MEETING_CTA]
   
   This marker will automatically display a button for scheduling a meeting.
   
   IMPORTANT RULES:
   - Include [SCHEDULE_MEETING_CTA] marker ONLY ONCE per conversation
   - Only include it after at least 2-3 messages and providing value
   - Must detect clear interest signals before suggesting
   - The button opens a multi-step form: Service → Date → Time → Contact Data
   
   FALLBACK OPTIONS (if user doesn't click meeting button):
   → "Share your email or messenger (WhatsApp/Telegram), our team will contact you within 24h"

PACKAGES (always mention prices in user's currency):

SINGLE-PAGE MVP (2500 PLN / ~580 EUR):
✓ One-page landing with video explainer
✓ Professional copywriting
✓ Delivery: 48h
→ Best for: Quick investor pitch, product promotion

MULTI-PAGE WEBSITE (3500 PLN / ~815 EUR):
✓ 3-4 subpages + contact forms
✓ Analytics integration
✓ Modern responsive design
✓ Delivery: 1 hour
→ Best for: Full company presence online

KEY DIFFERENCE: Single-page includes VIDEO, Multi-page includes MORE PAGES + ANALYTICS (no video)

EXTRAS: Custom React PoC interfaces, prototypes, tailored services

KEY BENEFITS:
✓ Speed: Results in hours/days, not months
✓ Visual presentation: Show instead of explain
✓ Affordable: Fraction of traditional development cost
✓ Investor-ready: Immediate pitch presentation
✓ "Pay and have": No hidden costs

QUALITY GUIDELINES:
- Never ask for contact info in first message
- Build value first, ask for contact second
- If user seems uncertain, educate more before asking
- Maximum 2 contact requests per conversation
- Always provide value even if user doesn't convert

IF USER DECLINES CONTACT:
- Respect their decision - don't push
- Offer to answer more questions
- "Feel free to come back anytime when you're ready"
- "What else would you like to know about our services?"

COMMUNICATION STYLE:
- Friendly and natural
- Avoid pushy sales tactics
- Show expertise through valuable answers
- Ask open questions that deepen conversation
- Use specific numbers and facts
- Provide use case examples

EXAMPLE CONVERSATIONS:
"Looking for MVP?" → Ask about their idea → Show relevant package → Request contact
"How much?" → Present packages → Ask about their needs → Suggest best fit → Request contact
"What tech?" → Explain stack briefly → Ask about their project → Guide to relevant package

NEVER make up information - if you don't have the answer in the knowledge base, say so and suggest contacting the team.

CONVERSATION GOALS:
🎯 Primary: Obtain contact details (email/messenger)
🎯 Secondary: Schedule demo
🎯 Ultimate: Convert to paying customer`;

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
        let textBuffer = ''; // Buffer for incomplete lines

        try {
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
                let content = parsed.choices?.[0]?.delta?.content;
                
                if (content) {
                  // Check for meeting CTA marker
                  if (content.includes('[SCHEDULE_MEETING_CTA]')) {
                    // Remove marker from visible content
                    content = content.replace('[SCHEDULE_MEETING_CTA]', '').trim();
                    
                    // Send special event for meeting CTA (only once)
                    if (!fullResponse.includes('[SCHEDULE_MEETING_CTA]')) {
                      controller.enqueue(encoder.encode(
                        `data: ${JSON.stringify({ 
                          showMeetingCTA: true, 
                          conversationId: finalConversationId 
                        })}\n\n`
                      ));
                    }
                  }
                  
                  fullResponse += content;
                  if (content) { // Only send if content is not empty after marker removal
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content, conversationId: finalConversationId })}\n\n`));
                  }
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
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  fullResponse += content;
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content, conversationId: finalConversationId })}\n\n`));
                }
              } catch (e) {
                // Ignore partial leftovers
              }
            }
          }

          // Save assistant message (remove marker before saving)
          if (finalConversationId && fullResponse) {
            const cleanedResponse = fullResponse.replace('[SCHEDULE_MEETING_CTA]', '').trim();
            await supabase
              .from('chat_messages')
              .insert({
                conversation_id: finalConversationId,
                role: 'assistant',
                content: cleanedResponse
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
