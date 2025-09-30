-- Enable pgvector extension for vector similarity search
CREATE EXTENSION IF NOT EXISTS vector;

-- Create knowledge base table for storing documents
CREATE TABLE IF NOT EXISTS public.knowledge_base (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create conversations table
CREATE TABLE IF NOT EXISTS public.chat_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id text,
  email text,
  name text,
  phone text,
  interested_in text[],
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create messages table
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid REFERENCES public.chat_conversations(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  content text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for knowledge_base (public read access)
CREATE POLICY "Anyone can read knowledge base"
  ON public.knowledge_base FOR SELECT
  USING (true);

-- RLS Policies for chat_conversations (anyone can create and read their own)
CREATE POLICY "Anyone can create conversations"
  ON public.chat_conversations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read their own conversations"
  ON public.chat_conversations FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update their own conversations"
  ON public.chat_conversations FOR UPDATE
  USING (true);

-- RLS Policies for chat_messages
CREATE POLICY "Anyone can create messages"
  ON public.chat_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read messages"
  ON public.chat_messages FOR SELECT
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_knowledge_base_updated_at
  BEFORE UPDATE ON public.knowledge_base
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_chat_conversations_updated_at
  BEFORE UPDATE ON public.chat_conversations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample knowledge base content
INSERT INTO public.knowledge_base (title, content, metadata) VALUES
(
  'O firmie MVPBlocks',
  'MVPBlocks to innowacyjna platforma do szybkiego tworzenia MVP (Minimum Viable Product). Specjalizujemy się w budowaniu prototypów aplikacji webowych i mobilnych w rekordowo krótkim czasie. Nasza usługa pozwala przedsiębiorcom i startupom na szybką walidację pomysłów biznesowych bez konieczności dużych inwestycji. Oferujemy kompleksowe rozwiązania od koncepcji po wdrożenie.',
  '{"category": "company", "language": "pl"}'::jsonb
),
(
  'Usługi MVPBlocks',
  'Oferujemy szeroki zakres usług: 1) Szybkie prototypowanie - tworzymy funkcjonalne prototypy w 2-4 tygodnie. 2) Rozwój MVP - budujemy pełne MVP gotowe do testów z użytkownikami. 3) Konsultacje techniczne - pomagamy wybrać odpowiednie technologie. 4) Design UI/UX - projektujemy intuicyjne interfejsy użytkownika. 5) Integracje API - łączymy z popularnymi serwisami i platformami. 6) Hosting i wdrożenie - zapewniamy infrastrukturę i deployment.',
  '{"category": "services", "language": "pl"}'::jsonb
),
(
  'Technologie',
  'Pracujemy z najnowszymi technologiami: React, Next.js, TypeScript dla frontendu. Node.js, Python, Supabase dla backendu. Tailwind CSS dla stylowania. Wykorzystujemy AI i automatyzację do przyspieszenia rozwoju. Nasze rozwiązania są skalowalne i gotowe na rozwój produktu.',
  '{"category": "technology", "language": "pl"}'::jsonb
),
(
  'Proces współpracy',
  'Nasz proces jest prosty i efektywny: 1) Konsultacja - omawiamy Twój pomysł i cele biznesowe. 2) Planowanie - definiujemy zakres MVP i timeline. 3) Projektowanie - tworzymy mockupy i prototypy. 4) Rozwój - budujemy Twoje MVP iteracyjnie. 5) Testy - weryfikujemy działanie przed startem. 6) Wdrożenie - publikujemy i monitorujemy. Cały proces trwa średnio 3-6 tygodni.',
  '{"category": "process", "language": "pl"}'::jsonb
),
(
  'Cennik',
  'Oferujemy elastyczne pakiety cenowe: Pakiet Starter (od 5000 zł) - podstawowe MVP, 1-2 funkcjonalności kluczowe, design responsywny. Pakiet Standard (od 12000 zł) - rozszerzone MVP, 3-5 funkcjonalności, integracje API, panel administracyjny. Pakiet Premium (od 25000 zł) - kompleksowe MVP, nielimitowane funkcjonalności, zaawansowane integracje, wsparcie po wdrożeniu. Wszystkie ceny są negocjowalne w zależności od zakresu projektu.',
  '{"category": "pricing", "language": "pl"}'::jsonb
),
(
  'Portfolio i case studies',
  'Zrealizowaliśmy ponad 50 projektów MVP dla klientów z różnych branż: e-commerce, fintech, edtech, healthtech, SaaS. Nasze MVP pomogły klientom pozyskać seed funding, zwalidować pomysły biznesowe i szybko wejść na rynek. Średni czas od pierwszej konsultacji do działającego MVP to 4 tygodnie. 85% naszych MVP przechodzi do fazy dalszego rozwoju produktu.',
  '{"category": "portfolio", "language": "pl"}'::jsonb
),
(
  'Kontakt',
  'Skontaktuj się z nami, aby omówić Twój projekt: Email: hello@mvpblocks.com, Telefon: +48 123 456 789. Oferujemy darmową 30-minutową konsultację, podczas której omówimy Twój pomysł i zaproponujemy najlepsze rozwiązanie. Odpowiadamy na zapytania w ciągu 24 godzin. Jesteśmy otwarci na współpracę z klientami z całego świata.',
  '{"category": "contact", "language": "pl"}'::jsonb
)