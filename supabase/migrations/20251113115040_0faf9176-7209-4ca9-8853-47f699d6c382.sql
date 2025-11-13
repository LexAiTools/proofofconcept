-- Add keywords column and indexes for intelligent search
ALTER TABLE knowledge_base 
ADD COLUMN IF NOT EXISTS keywords text[];

CREATE INDEX IF NOT EXISTS idx_knowledge_base_keywords ON knowledge_base USING GIN(keywords);
CREATE INDEX IF NOT EXISTS idx_knowledge_base_language ON knowledge_base ((metadata->>'language'));
CREATE INDEX IF NOT EXISTS idx_knowledge_base_category ON knowledge_base ((metadata->>'category'));

-- Insert FAQ items in Polish
INSERT INTO knowledge_base (title, content, keywords, metadata) VALUES
('FAQ #1: Różnica między Quick Start a Interactive App PoC', 
'Q: Czym różni się Quick Start PoC od Interactive App PoC? A: Quick Start PoC (24h, €349) to prosty prototyp jednostronicowy idealny do szybkiej weryfikacji pomysłu. Interactive App PoC (3 dni, €488) to zaawansowana aplikacja wielostronicowa z interaktywnymi elementami, formularzami i podstawową integracją API. Interactive App oferuje pełniejsze doświadczenie użytkownika i więcej funkcjonalności.', 
ARRAY['quick start', 'interactive app', 'różnica', 'porównanie', 'pakiety', 'cena'],
'{"category": "faq", "language": "pl", "faq_id": 1, "priority": 10}'::jsonb),

('FAQ #2: Ceny pakietów PoC', 
'Q: Ile kosztuje każdy pakiet PoC i co jest w cenie? A: Quick Start PoC: €349 (24h), Interactive App PoC: €488 (3 dni), Complete Package PoC: €651 (7 dni), Professional Website z AI: €3,814 (14 dni), Custom PoC: wycena indywidualna. W cenie każdego pakietu: projekt UI/UX, kod źródłowy, hosting na 30 dni, dokumentacja techniczna, panel administracyjny (w wybranych pakietach).', 
ARRAY['cena', 'koszt', 'ile kosztuje', 'pakiety', 'pricing', 'euro'],
'{"category": "faq", "language": "pl", "faq_id": 2, "priority": 10}'::jsonb),

('FAQ #3: Czas realizacji pakietów', 
'Q: Jak długo trwa realizacja każdego pakietu? A: Quick Start PoC: 24 godziny, Interactive App PoC: 3 dni robocze, Complete Package PoC: 7 dni roboczych, Professional Website z AI: 14 dni roboczych, Custom PoC: ustalane indywidualnie (zazwyczaj 5-30 dni w zależności od złożoności).', 
ARRAY['czas', 'termin', 'jak długo', 'realizacja', 'deadline'],
'{"category": "faq", "language": "pl", "faq_id": 3, "priority": 9}'::jsonb),

('FAQ #4: Zawartość Complete Package PoC', 
'Q: Co zawiera pakiet Complete Package PoC? A: Complete Package PoC (€651, 7 dni) zawiera: zaawansowaną aplikację wielostronicową, 5+ ekranów, pełną integrację API, autentykację użytkowników, bazę danych, responsywny design, zaawansowane funkcjonalności (wyszukiwanie, filtry, sortowanie), panel administracyjny, dokumentację API, hosting na 30 dni i 2 rundy poprawek.', 
ARRAY['complete package', 'zawartość', 'co zawiera', 'funkcje', 'pakiet kompletny'],
'{"category": "faq", "language": "pl", "faq_id": 4, "priority": 8}'::jsonb),

('FAQ #5: Professional Website z AI - chatbot', 
'Q: Czy pakiet Professional Website z AI obejmuje chatbota? A: Tak! Professional Website z AI (€3,814, 14 dni) zawiera w pełni funkcjonalnego chatbota AI opartego na RAG (Retrieval Augmented Generation), który: odpowiada na pytania klientów 24/7, posiada bazę wiedzy o Twoich produktach/usługach, zbiera leady automatycznie, wspiera język polski i angielski, integruje się z Twoją stroną bez szwów.', 
ARRAY['professional website', 'ai', 'chatbot', 'sztuczna inteligencja', 'rag'],
'{"category": "faq", "language": "pl", "faq_id": 5, "priority": 9}'::jsonb),

('FAQ #6: Technologie PoC', 
'Q: Jakie technologie są używane do tworzenia PoC? A: Używamy nowoczesnego stacku: React + TypeScript (frontend), Tailwind CSS (styling), Supabase/Lovable Cloud (backend, baza danych, autentykacja), Vercel/Netlify (hosting), OpenAI/Lovable AI (chatboty AI). Wszystkie technologie są open-source, skalowalne i łatwe w utrzymaniu.', 
ARRAY['technologie', 'stack', 'react', 'typescript', 'supabase', 'ai'],
'{"category": "faq", "language": "pl", "faq_id": 6, "priority": 7}'::jsonb),

('FAQ #7: Kod źródłowy aplikacji', 
'Q: Czy otrzymam kod źródłowy aplikacji? A: Tak! W każdym pakiecie otrzymujesz pełny kod źródłowy aplikacji wraz z prawami własności. Kod jest dostarczany przez GitHub/GitLab, zawiera dokumentację techniczną i możesz go swobodnie modyfikować, rozwijać i deployować według własnych potrzeb.', 
ARRAY['kod źródłowy', 'source code', 'github', 'własność', 'prawa'],
'{"category": "faq", "language": "pl", "faq_id": 7, "priority": 8}'::jsonb),

('FAQ #8: Testowanie prototypu', 
'Q: Czy mogę testować prototyp przed finalną dostawą? A: Tak! Podczas realizacji otrzymujesz dostęp do wersji development na żywo. Możesz testować funkcjonalności, zgłaszać uwagi i proponować zmiany w trakcie procesu. Po finalnej dostawie masz 7 dni na testy i zgłoszenie ewentualnych poprawek (w ramach ustalonego scope).', 
ARRAY['testowanie', 'testing', 'prototyp', 'demo', 'preview'],
'{"category": "faq", "language": "pl", "faq_id": 8, "priority": 7}'::jsonb),

('FAQ #9: Proces zamówienia i realizacji', 
'Q: Jak wygląda proces zamówienia i realizacji? A: 1) Wypełniasz formularz lub kontaktujesz się z nami, 2) Omawiamy wymagania i wybieramy pakiet, 3) Płacisz 100% z góry (model "Płać i Miej"), 4) Rozpoczynamy realizację (24h-14 dni), 5) Otrzymujesz dostęp do wersji development, 6) Po akceptacji otrzymujesz kod źródłowy i dokumentację.', 
ARRAY['proces', 'zamówienie', 'jak zamówić', 'realizacja', 'kroki'],
'{"category": "faq", "language": "pl", "faq_id": 9, "priority": 9}'::jsonb),

('FAQ #10: Model Płać i Miej', 
'Q: Co to jest model "Płać i Miej"? A: Model "Płać i Miej" oznacza, że płacisz 100% wartości projektu z góry przed rozpoczęciem prac. W zamian gwarantujemy stały deadline, brak dodatkowych kosztów i natychmiastowy start realizacji. To eliminuje ryzyko dla obu stron i przyspiesza cały proces. Jesteśmy na tyle pewni jakości, że oferujemy gwarancję satysfakcji.', 
ARRAY['płać i miej', 'płatność', 'model biznesowy', 'payment', 'z góry'],
'{"category": "faq", "language": "pl", "faq_id": 10, "priority": 8}'::jsonb),

('FAQ #11: Customowy pakiet', 
'Q: Czy mogę zamówić customowy pakiet dostosowany do moich potrzeb? A: Absolutnie! Oferujemy pakiet "Custom PoC" z indywidualną wyceną. Opowiedz nam o swoim projekcie, określ wymagania i otrzymasz szczegółową wycenę z harmonogramem. Customowy pakiet może łączyć elementy różnych pakietów lub zawierać unikalne funkcjonalności specyficzne dla Twojego biznesu.', 
ARRAY['custom', 'customowy', 'indywidualny', 'na zamówienie', 'własny pakiet'],
'{"category": "faq", "language": "pl", "faq_id": 11, "priority": 7}'::jsonb),

('FAQ #12: Modyfikacja prototypu po dostawie', 
'Q: Czy mogę modyfikować prototyp po dostawie? A: Tak! Otrzymujesz pełny kod źródłowy z prawami własności, więc możesz swobodnie modyfikować aplikację. Dodatkowo oferujemy: wsparcie techniczne (30 dni gratis), rozbudowę do pełnej aplikacji produkcyjnej, miesięczne pakiety utrzymania i rozwoju, szkolenia dla Twojego teamu.', 
ARRAY['modyfikacja', 'zmiany', 'rozwój', 'edycja', 'własność'],
'{"category": "faq", "language": "pl", "faq_id": 12, "priority": 6}'::jsonb),

('FAQ #13: Rozbudowa PoC do pełnej aplikacji', 
'Q: Czy jest możliwość rozbudowy PoC do pełnej aplikacji? A: Tak! PoC to idealna baza do budowy aplikacji produkcyjnej. Oferujemy: migrację do production-ready infrastructure, dodanie zaawansowanych funkcji (płatności, analytics, notyfikacje), optymalizację performance i SEO, full testing suite (unit, integration, e2e), CI/CD deployment pipeline. Wycena indywidualna na podstawie zakresu.', 
ARRAY['rozbudowa', 'rozwój', 'pełna aplikacja', 'produkcja', 'scaling'],
'{"category": "faq", "language": "pl", "faq_id": 13, "priority": 7}'::jsonb),

('FAQ #14: Wsparcie techniczne', 
'Q: Czy oferujecie wsparcie techniczne po dostawie? A: Tak! Każdy pakiet zawiera 30 dni wsparcia technicznego gratis (email, konsultacje, bugfixy). Dodatkowo oferujemy: miesięczne pakiety utrzymania (od €199/mc), wsparcie on-demand (€99/h), SLA agreements dla projektów enterprise, szkolenia techniczne dla Twojego zespołu.', 
ARRAY['wsparcie', 'support', 'pomoc', 'maintenance', 'utrzymanie'],
'{"category": "faq", "language": "pl", "faq_id": 14, "priority": 6}'::jsonb),

('FAQ #15: Dla kogo są pakiety PoC', 
'Q: Dla kogo są pakiety PoC? Kto może z nich skorzystać? A: Pakiety PoC są idealne dla: Startupów (weryfikacja MVP przed inwestycją), Przedsiębiorców (test pomysłu na biznes cyfrowy), Firm (prototyp nowego produktu/usługi), Agencji (szybkie delivery dla klientów), Inwestorów (prezentacja wizji przed funding), Innowatorów (proof of concept nowej technologii). Jeśli masz pomysł na aplikację web/mobile - pakiety PoC są dla Ciebie!', 
ARRAY['dla kogo', 'target', 'startupy', 'przedsiębiorcy', 'firmy', 'klienci'],
'{"category": "faq", "language": "pl", "faq_id": 15, "priority": 8}'::jsonb),

-- Insert FAQ items in English
('FAQ #1: Difference between Quick Start and Interactive App PoC', 
'Q: What is the difference between Quick Start PoC and Interactive App PoC? A: Quick Start PoC (24h, €349) is a simple single-page prototype ideal for quick idea validation. Interactive App PoC (3 days, €488) is an advanced multi-page application with interactive elements, forms, and basic API integration. Interactive App offers a fuller user experience and more functionality.', 
ARRAY['quick start', 'interactive app', 'difference', 'comparison', 'packages', 'price'],
'{"category": "faq", "language": "en", "faq_id": 1, "priority": 10}'::jsonb),

('FAQ #2: PoC Package Pricing', 
'Q: How much does each PoC package cost and what is included? A: Quick Start PoC: €349 (24h), Interactive App PoC: €488 (3 days), Complete Package PoC: €651 (7 days), Professional Website with AI: €3,814 (14 days), Custom PoC: individual pricing. Each package includes: UI/UX design, source code, 30-day hosting, technical documentation, admin panel (in selected packages).', 
ARRAY['price', 'cost', 'how much', 'packages', 'pricing', 'euro'],
'{"category": "faq", "language": "en", "faq_id": 2, "priority": 10}'::jsonb),

('FAQ #3: Package Delivery Times', 
'Q: How long does each package take to deliver? A: Quick Start PoC: 24 hours, Interactive App PoC: 3 business days, Complete Package PoC: 7 business days, Professional Website with AI: 14 business days, Custom PoC: determined individually (typically 5-30 days depending on complexity).', 
ARRAY['time', 'deadline', 'how long', 'delivery', 'duration'],
'{"category": "faq", "language": "en", "faq_id": 3, "priority": 9}'::jsonb),

('FAQ #4: Complete Package PoC Contents', 
'Q: What does the Complete Package PoC include? A: Complete Package PoC (€651, 7 days) includes: advanced multi-page application, 5+ screens, full API integration, user authentication, database, responsive design, advanced features (search, filters, sorting), admin panel, API documentation, 30-day hosting, and 2 revision rounds.', 
ARRAY['complete package', 'contents', 'what includes', 'features', 'full package'],
'{"category": "faq", "language": "en", "faq_id": 4, "priority": 8}'::jsonb),

('FAQ #5: Professional Website with AI - chatbot', 
'Q: Does the Professional Website with AI package include a chatbot? A: Yes! Professional Website with AI (€3,814, 14 days) includes a fully functional AI chatbot based on RAG (Retrieval Augmented Generation) that: answers customer questions 24/7, has a knowledge base about your products/services, collects leads automatically, supports Polish and English, integrates seamlessly with your website.', 
ARRAY['professional website', 'ai', 'chatbot', 'artificial intelligence', 'rag'],
'{"category": "faq", "language": "en", "faq_id": 5, "priority": 9}'::jsonb),

('FAQ #6: PoC Technologies', 
'Q: What technologies are used to create PoC? A: We use a modern stack: React + TypeScript (frontend), Tailwind CSS (styling), Supabase/Lovable Cloud (backend, database, authentication), Vercel/Netlify (hosting), OpenAI/Lovable AI (AI chatbots). All technologies are open-source, scalable, and easy to maintain.', 
ARRAY['technologies', 'stack', 'react', 'typescript', 'supabase', 'ai'],
'{"category": "faq", "language": "en", "faq_id": 6, "priority": 7}'::jsonb),

('FAQ #7: Application Source Code', 
'Q: Will I receive the application source code? A: Yes! Every package includes full source code with ownership rights. Code is delivered via GitHub/GitLab, includes technical documentation, and you can freely modify, develop, and deploy it according to your needs.', 
ARRAY['source code', 'code', 'github', 'ownership', 'rights'],
'{"category": "faq", "language": "en", "faq_id": 7, "priority": 8}'::jsonb),

('FAQ #8: Testing the Prototype', 
'Q: Can I test the prototype before final delivery? A: Yes! During development you get access to a live development version. You can test features, report feedback, and suggest changes during the process. After final delivery you have 7 days to test and report any corrections (within agreed scope).', 
ARRAY['testing', 'test', 'prototype', 'demo', 'preview'],
'{"category": "faq", "language": "en", "faq_id": 8, "priority": 7}'::jsonb),

('FAQ #9: Order and Delivery Process', 
'Q: What does the order and delivery process look like? A: 1) You fill out a form or contact us, 2) We discuss requirements and choose a package, 3) You pay 100% upfront ("Pay and Have" model), 4) We start development (24h-14 days), 5) You get access to development version, 6) After approval you receive source code and documentation.', 
ARRAY['process', 'order', 'how to order', 'delivery', 'steps'],
'{"category": "faq", "language": "en", "faq_id": 9, "priority": 9}'::jsonb),

('FAQ #10: Pay and Have Model', 
'Q: What is the "Pay and Have" model? A: The "Pay and Have" model means you pay 100% of the project value upfront before work begins. In return we guarantee a fixed deadline, no additional costs, and immediate start of development. This eliminates risk for both parties and speeds up the entire process. We are so confident in quality that we offer a satisfaction guarantee.', 
ARRAY['pay and have', 'payment', 'business model', 'upfront', 'prepay'],
'{"category": "faq", "language": "en", "faq_id": 10, "priority": 8}'::jsonb),

('FAQ #11: Custom Package', 
'Q: Can I order a custom package tailored to my needs? A: Absolutely! We offer a "Custom PoC" package with individual pricing. Tell us about your project, specify requirements, and receive a detailed quote with timeline. Custom package can combine elements from different packages or include unique features specific to your business.', 
ARRAY['custom', 'tailored', 'individual', 'bespoke', 'own package'],
'{"category": "faq", "language": "en", "faq_id": 11, "priority": 7}'::jsonb),

('FAQ #12: Modifying Prototype After Delivery', 
'Q: Can I modify the prototype after delivery? A: Yes! You receive full source code with ownership rights, so you can freely modify the application. Additionally we offer: technical support (30 days free), expansion to full production application, monthly maintenance and development packages, training for your team.', 
ARRAY['modification', 'changes', 'development', 'editing', 'ownership'],
'{"category": "faq", "language": "en", "faq_id": 12, "priority": 6}'::jsonb),

('FAQ #13: Expanding PoC to Full Application', 
'Q: Is it possible to expand PoC to a full application? A: Yes! PoC is an ideal base for building a production application. We offer: migration to production-ready infrastructure, adding advanced features (payments, analytics, notifications), performance and SEO optimization, full testing suite (unit, integration, e2e), CI/CD deployment pipeline. Individual pricing based on scope.', 
ARRAY['expansion', 'development', 'full application', 'production', 'scaling'],
'{"category": "faq", "language": "en", "faq_id": 13, "priority": 7}'::jsonb),

('FAQ #14: Technical Support', 
'Q: Do you offer technical support after delivery? A: Yes! Every package includes 30 days of free technical support (email, consultations, bugfixes). Additionally we offer: monthly maintenance packages (from €199/mo), on-demand support (€99/h), SLA agreements for enterprise projects, technical training for your team.', 
ARRAY['support', 'technical support', 'help', 'maintenance', 'after delivery'],
'{"category": "faq", "language": "en", "faq_id": 14, "priority": 6}'::jsonb),

('FAQ #15: Who Are PoC Packages For', 
'Q: Who are PoC packages for? Who can use them? A: PoC packages are ideal for: Startups (MVP verification before investment), Entrepreneurs (testing digital business ideas), Companies (new product/service prototype), Agencies (quick delivery for clients), Investors (vision presentation before funding), Innovators (proof of concept for new technology). If you have an idea for a web/mobile app - PoC packages are for you!', 
ARRAY['who for', 'target', 'startups', 'entrepreneurs', 'companies', 'clients'],
'{"category": "faq", "language": "en", "faq_id": 15, "priority": 8}'::jsonb),

-- Insert PoC Package details in Polish
('Pakiet: Quick Start PoC', 
'Quick Start PoC to najszybszy sposób na weryfikację pomysłu. Cena: €349. Czas realizacji: 24 godziny. Zawiera: jednostronicową aplikację, responsywny design, podstawowe komponenty UI, hosting na 30 dni, kod źródłowy. Idealny dla: szybkiej weryfikacji MVP, prezentacji dla inwestorów, testowania rynku. Technologie: React, TypeScript, Tailwind CSS.', 
ARRAY['quick start', 'pakiet', 'cena', '349', '24h', 'szybki'],
'{"category": "pricing", "language": "pl", "package_id": "quick-start", "price": 349, "duration_days": 1}'::jsonb),

('Pakiet: Interactive App PoC', 
'Interactive App PoC to zaawansowana aplikacja z interaktywnymi funkcjami. Cena: €488. Czas realizacji: 3 dni robocze. Zawiera: wielostronicową aplikację, formularze z walidacją, integrację API, routing, stan globalny, responsywny design, hosting, kod źródłowy. Idealny dla: prototypów SaaS, dashboardów, aplikacji biznesowych. Technologie: React, TypeScript, React Router, Zustand/Context API.', 
ARRAY['interactive app', 'pakiet', 'cena', '488', '3 dni', 'aplikacja'],
'{"category": "pricing", "language": "pl", "package_id": "interactive-app", "price": 488, "duration_days": 3}'::jsonb),

('Pakiet: Complete Package PoC', 
'Complete Package PoC to kompletne rozwiązanie z autentykacją i bazą danych. Cena: €651. Czas realizacji: 7 dni roboczych. Zawiera: 5+ ekranów, autentykację użytkowników, bazę danych Supabase, CRUD operations, panel administracyjny, zaawansowane funkcje (wyszukiwanie, filtry), dokumentację API, 2 rundy poprawek, hosting. Idealny dla: MVP produktowe, platformy B2B/B2C, systemy zarządzania. Technologie: React, TypeScript, Supabase, React Query.', 
ARRAY['complete package', 'pakiet', 'cena', '651', '7 dni', 'kompletny'],
'{"category": "pricing", "language": "pl", "package_id": "complete-package", "price": 651, "duration_days": 7}'::jsonb),

('Pakiet: Professional Website z AI', 
'Professional Website z AI to w pełni funkcjonalna strona z chatbotem AI. Cena: €3,814. Czas realizacji: 14 dni roboczych. Zawiera: profesjonalny landing page, chatbot AI z RAG, panel administracyjny, system CMS, integrację z bazą wiedzy, lead capture, analytics, SEO optimization, responsywny design, dokumentację. Idealny dla: firm B2B, agencji, konsultantów, produktów SaaS. Technologie: React, TypeScript, Supabase, OpenAI/Lovable AI, RAG.', 
ARRAY['professional website', 'ai', 'pakiet', 'cena', '3814', '14 dni', 'chatbot'],
'{"category": "pricing", "language": "pl", "package_id": "professional-website", "price": 3814, "duration_days": 14}'::jsonb),

('Pakiet: Custom PoC', 
'Custom PoC to w pełni customowy projekt dostosowany do Twoich potrzeb. Cena: Wycena indywidualna. Czas realizacji: 5-30 dni (w zależności od złożoności). Zawiera: wszystko co potrzebujesz - od prostych prototypów po złożone systemy enterprise. Możliwość łączenia funkcji z różnych pakietów, dodawania unikalnych feature''ów, integracji z external APIs. Idealny dla: projektów niestandardowych, integracji legacy systems, rozwiązań enterprise. Skontaktuj się z nami po szczegóły.', 
ARRAY['custom', 'pakiet', 'indywidualny', 'wycena', 'customowy'],
'{"category": "pricing", "language": "pl", "package_id": "custom", "price": null, "duration_days": null}'::jsonb),

-- Insert PoC Package details in English
('Package: Quick Start PoC', 
'Quick Start PoC is the fastest way to validate your idea. Price: €349. Delivery time: 24 hours. Includes: single-page application, responsive design, basic UI components, 30-day hosting, source code. Ideal for: quick MVP validation, investor presentations, market testing. Technologies: React, TypeScript, Tailwind CSS.', 
ARRAY['quick start', 'package', 'price', '349', '24h', 'fast'],
'{"category": "pricing", "language": "en", "package_id": "quick-start", "price": 349, "duration_days": 1}'::jsonb),

('Package: Interactive App PoC', 
'Interactive App PoC is an advanced application with interactive features. Price: €488. Delivery time: 3 business days. Includes: multi-page application, forms with validation, API integration, routing, global state, responsive design, hosting, source code. Ideal for: SaaS prototypes, dashboards, business applications. Technologies: React, TypeScript, React Router, Zustand/Context API.', 
ARRAY['interactive app', 'package', 'price', '488', '3 days', 'application'],
'{"category": "pricing", "language": "en", "package_id": "interactive-app", "price": 488, "duration_days": 3}'::jsonb),

('Package: Complete Package PoC', 
'Complete Package PoC is a complete solution with authentication and database. Price: €651. Delivery time: 7 business days. Includes: 5+ screens, user authentication, Supabase database, CRUD operations, admin panel, advanced features (search, filters), API documentation, 2 revision rounds, hosting. Ideal for: product MVPs, B2B/B2C platforms, management systems. Technologies: React, TypeScript, Supabase, React Query.', 
ARRAY['complete package', 'package', 'price', '651', '7 days', 'full'],
'{"category": "pricing", "language": "en", "package_id": "complete-package", "price": 651, "duration_days": 7}'::jsonb),

('Package: Professional Website with AI', 
'Professional Website with AI is a fully functional website with AI chatbot. Price: €3,814. Delivery time: 14 business days. Includes: professional landing page, AI chatbot with RAG, admin panel, CMS system, knowledge base integration, lead capture, analytics, SEO optimization, responsive design, documentation. Ideal for: B2B companies, agencies, consultants, SaaS products. Technologies: React, TypeScript, Supabase, OpenAI/Lovable AI, RAG.', 
ARRAY['professional website', 'ai', 'package', 'price', '3814', '14 days', 'chatbot'],
'{"category": "pricing", "language": "en", "package_id": "professional-website", "price": 3814, "duration_days": 14}'::jsonb),

('Package: Custom PoC', 
'Custom PoC is a fully custom project tailored to your needs. Price: Individual pricing. Delivery time: 5-30 days (depending on complexity). Includes: everything you need - from simple prototypes to complex enterprise systems. Ability to combine features from different packages, add unique features, integrate with external APIs. Ideal for: non-standard projects, legacy system integrations, enterprise solutions. Contact us for details.', 
ARRAY['custom', 'package', 'individual', 'pricing', 'bespoke'],
'{"category": "pricing", "language": "en", "package_id": "custom", "price": null, "duration_days": null}'::jsonb);