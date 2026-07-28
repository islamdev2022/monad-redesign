import { createContext, useContext, useState, useCallback } from 'react'

const translations = {
  en: {
    dir: 'ltr',
    nav: {
      products: 'Products',
      services: 'Services',
      clients: 'Clients',
      contact: 'Contact',
      cta: 'Get in touch',
    },
    hero: {
      badge: 'Local expertise, global technology',
      title1: 'Empowering Algerian',
      title2: 'industries with',
      titleAccent: 'tailored AI',
      description: 'From social listening to semantic search, we build AI tools designed for the nuances of the Algerian market — in every language your business speaks.',
      cta1: 'Explore products',
      cta2: 'Book a call',
      scroll: 'Scroll',
    },
    products: {
      label: 'Products',
      title: 'AI solutions built for how Algeria actually works',
      description: 'Each product is purpose-built for the local market — understanding dialect, navigating local regulations, and integrating with how businesses here operate.',
      learnMore: 'Learn more',
      tryProduct: 'Test this product',
      items: [
        {
          tag: 'Narwhal',
          title: 'Social Listening Intelligence',
          description: 'Real-time insights from social media across Algeria. Digest emerging trends, monitor brand sentiment, and understand public opinion — powered by AI that understands Algerian dialect.',
          features: ['Real-time monitoring', 'Sentiment analysis', 'Trend detection', 'Competitive intel'],
        },
        {
          tag: '9anun',
          title: 'AI Legal Assistant',
          description: 'Navigate Algerian law with precision. Built from official journals and organized into knowledge graphs, each legal element is contextualized with its interactions with other texts.',
          features: ['Contract review', 'Compliance monitoring', 'Case research', 'Legal graph DB'],
        },
        {
          tag: 'Monad Chatbot',
          title: 'Conversational AI Assistants',
          description: 'More than simple Q&A bots. Our AI assistants understand the subtleties of Algerian language — Darija, French, Arabic — guiding visitors with natural, context-aware conversations.',
          features: ['Multilingual NLU', 'Brand customization', 'Platform integration', 'In-house deployment'],
        },
        {
          tag: '3xS',
          title: 'Semantic Search Services',
          description: 'State-of-the-art semantic search delivering contextually relevant results from vast unstructured data. Privacy-focused, customizable, built to turn data into intelligence.',
          features: ['Contextual results', 'Privacy-first', 'Custom pipelines', 'Unstructured data'],
        },
      ],
    },
    services: {
      label: 'Data Services',
      title: 'Raw data, refined',
      description: 'Whether from the internet or physical documents, we get you the data you need in the structure you require.',
      pipelineStatus: 'Processing pipeline active',
      visual: [
        { label: 'OCR', desc: 'Document → Text' },
        { label: 'Extract', desc: 'Web → Data' },
        { label: 'Collect', desc: 'Pipeline → Output' },
      ],
      items: [
        { title: 'OCR Solutions', description: 'Convert scanned documents and images into editable, searchable text with Arabic and French support.' },
        { title: 'Data Extraction', description: 'Pull structured data from websites and online sources — product info, pricing, reviews — at scale.' },
        { title: 'Data Collection', description: 'Custom data pipelines tailored to your requirements — maximum accuracy, structured output, any format.' },
      ],
    },
    clients: {
      title: 'Trusted by brands across Algeria',
    },
    contact: {
      label: 'Contact',
      title: "Let's build something for Algeria",
      description: "Whether you need a custom AI solution or want to explore our existing products, we'd love to hear about your challenges.",
      email: 'Email',
      linkedin: 'LinkedIn',
      location: 'Location',
      locationValue: 'Algiers, Algeria',
      form: {
        name: 'Name',
        namePlaceholder: 'Your name',
        email: 'Email',
        emailPlaceholder: 'you@company.com',
        company: 'Company',
        companyPlaceholder: 'Your company',
        message: 'Message',
        messagePlaceholder: 'Tell us about your project...',
        submit: 'Send message',
        note: 'We typically respond within 24 hours.',
      },
    },
    footer: {
      tagline: 'Empowering Algerian industries with tailored AI solutions. Local expertise, global technology.',
      products: 'Products',
      services: 'Services',
      company: 'Company',
      contactLink: 'Contact',
      copyright: '© 2026 Monad. All rights reserved.',
      builtFor: 'Built for Algeria',
    },
    pricing: {
      label: 'Pricing',
      title: 'Pricing designed to suit all business',
      description: 'We offer a wide range of products in the form of monthly subscriptions for a minimum of 6 months.',
      monthly: 'Monthly',
      yearly: 'Yearly',
      month: 'mo',
      year: 'yr',
      popular: 'Most Popular',
      cta: 'Get Started',
      note: 'All plans require a minimum 6-month commitment. Custom enterprise plans available on request.',
      plans: [
        {
          name: 'Starter',
          desc: 'For small teams getting started',
          monthlyPrice: '49,000 DA',
          yearlyPrice: '39,000 DA',
          features: ['1 AI product access', 'Basic analytics', 'Email support', 'Up to 5 users'],
        },
        {
          name: 'Business',
          desc: 'For growing companies',
          monthlyPrice: '149,000 DA',
          yearlyPrice: '119,000 DA',
          features: ['All AI products', 'Advanced analytics', 'Priority support', 'Up to 25 users', 'Custom integrations'],
        },
        {
          name: 'Enterprise',
          desc: 'For large organizations',
          monthlyPrice: 'Custom',
          yearlyPrice: 'Custom',
          features: ['Unlimited access', 'Dedicated account manager', 'On-premise deployment', 'Unlimited users', 'SLA guarantee', 'Custom development'],
        },
      ],
    },
    productDetails: {
      narwhal: {
        tag: 'Narwhal',
        title: 'E-Reputation Solution',
        description: 'Narwhal is an AI-driven tool for data-driven decision-making. By delivering real-time insights from social media, Narwhal enables you to digest emerging trends, monitor brand sentiment, and understand public opinion in your target markets.',
        tabs: [
          { title: 'Reputation Monitoring', content: 'Track mentions of your brand across various online channels, including social media, forums, and news websites. Get real-time alerts and sentiment analysis for every mention.' },
          { title: 'Competitive Intelligence', content: 'Benchmark your brand\'s reputation against competitors and identify areas for improvement. Understand market positioning and discover opportunities.' },
          { title: 'Data-driven Decision-making', content: 'Make strategic decisions based on real-time analytics and trends, ensuring your brand remains competitive and relevant in today\'s dynamic market.' },
        ],
      },
      qanun: {
        tag: '9anun',
        title: 'AI Legal Assistant',
        description: 'Optimize your legal workflows and streamline decision-making. Our database, built from official journals, organized into graphs — each element is contextualized with its interactions with other legal texts, enabling intuitive navigation and a deep understanding of legislative documents.',
        tabs: [
          { title: 'Contract Review', content: 'Automatically analyze contracts for compliance with Algerian law, identify potential risks, and suggest amendments based on current legal requirements.' },
          { title: 'Legal Research', content: 'Search through thousands of legal texts using natural language. Find relevant articles, precedents, and cross-references in seconds instead of hours.' },
          { title: 'Compliance Monitoring', content: 'Stay updated on regulatory changes that affect your business. Receive alerts when new laws or amendments impact your existing contracts or operations.' },
        ],
      },
      chatbot: {
        tag: 'Monad Chatbot',
        title: 'AI Conversational Assistants',
        description: 'Leverage Monad\'s cutting-edge AI chatbot technology to elevate customer interactions. More than just simple question-answering bots, our personalized AI-driven customer assistants guide your visitors seamlessly through their journey.',
        tabs: [
          { title: 'Multilingual Understanding', content: 'Our chatbots understand and respond in Darija, French, and Arabic — handling the natural code-switching that Algerians use in everyday conversation.' },
          { title: 'Brand Customization', content: 'Fully customizable personality, knowledge base, and conversation flows. Your chatbot speaks with your brand voice and knows your products inside out.' },
          { title: 'Platform Integration', content: 'Deploy on your website, WhatsApp, Facebook Messenger, or any platform your customers use. One brain, multiple channels.' },
        ],
      },
      '3xs': {
        tag: '3xS',
        title: 'Semantic Search Services',
        description: 'Leverages state-of-the-art semantic search algorithms to deliver precise, contextually relevant results. Turn vast amounts of unstructured data into actionable insights, driving smarter business decisions.',
        tabs: [
          { title: 'Contextual Understanding', content: 'Goes beyond keyword matching to understand the meaning and intent behind queries. Find what you\'re looking for even when you don\'t know the exact terms.' },
          { title: 'Privacy-First Architecture', content: 'Your data stays yours. On-premise deployment options ensure sensitive information never leaves your infrastructure.' },
          { title: 'Custom Pipelines', content: 'Tailored data ingestion and processing pipelines for your specific document types, languages, and use cases.' },
        ],
      },
    },
  },
  fr: {
    dir: 'ltr',
    nav: {
      products: 'Produits',
      services: 'Services',
      clients: 'Clients',
      contact: 'Contact',
      cta: 'Nous contacter',
    },
    hero: {
      badge: 'Expertise locale, technologie mondiale',
      title1: "Renforcer les industries",
      title2: "algériennes avec une",
      titleAccent: "IA sur mesure",
      description: "De l'écoute sociale à la recherche sémantique, nous créons des outils d'IA conçus pour les spécificités du marché algérien — dans chaque langue que parle votre entreprise.",
      cta1: 'Découvrir nos produits',
      cta2: 'Réserver un appel',
      scroll: 'Défiler',
    },
    products: {
      label: 'Produits',
      title: "Des solutions d'IA conçues pour le fonctionnement réel de l'Algérie",
      description: "Chaque produit est conçu spécifiquement pour le marché local — comprenant le dialecte, naviguant les réglementations locales, et s'intégrant au fonctionnement des entreprises ici.",
      learnMore: 'En savoir plus',
      tryProduct: 'Tester ce produit',
      items: [
        {
          tag: 'Narwhal',
          title: 'Intelligence de veille sociale',
          description: "Analyses en temps réel des réseaux sociaux en Algérie. Identifiez les tendances émergentes, surveillez le sentiment de marque et comprenez l'opinion publique — propulsé par une IA qui comprend le dialecte algérien.",
          features: ['Surveillance en temps réel', 'Analyse de sentiment', 'Détection de tendances', 'Veille concurrentielle'],
        },
        {
          tag: '9anun',
          title: 'Assistant juridique IA',
          description: "Naviguez le droit algérien avec précision. Construit à partir des journaux officiels et organisé en graphes de connaissances, chaque élément juridique est contextualisé avec ses interactions avec d'autres textes.",
          features: ['Revue de contrats', 'Suivi de conformité', 'Recherche jurisprudentielle', 'Base graphe juridique'],
        },
        {
          tag: 'Monad Chatbot',
          title: 'Assistants conversationnels IA',
          description: "Bien plus que de simples bots. Nos assistants IA comprennent les subtilités de la langue algérienne — Darija, Français, Arabe — guidant vos visiteurs avec des conversations naturelles et contextuelles.",
          features: ['NLU multilingue', 'Personnalisation de marque', 'Intégration plateforme', 'Déploiement interne'],
        },
        {
          tag: '3xS',
          title: 'Services de recherche sémantique',
          description: "Recherche sémantique de pointe offrant des résultats contextuellement pertinents à partir de vastes données non structurées. Axée sur la confidentialité, personnalisable, conçue pour transformer vos données en intelligence.",
          features: ['Résultats contextuels', 'Confidentialité d\'abord', 'Pipelines personnalisés', 'Données non structurées'],
        },
      ],
    },
    services: {
      label: 'Services de données',
      title: 'Données brutes, raffinées',
      description: "Qu'il s'agisse d'internet ou de documents physiques, nous vous fournissons les données dont vous avez besoin dans la structure requise.",
      pipelineStatus: 'Pipeline de traitement actif',
      visual: [
        { label: 'OCR', desc: 'Document → Texte' },
        { label: 'Extraction', desc: 'Web → Données' },
        { label: 'Collecte', desc: 'Pipeline → Sortie' },
      ],
      items: [
        { title: 'Solutions OCR', description: "Convertissez documents numérisés et images en texte éditable et recherchable avec support arabe et français." },
        { title: 'Extraction de données', description: "Extrayez des données structurées de sites web et sources en ligne — infos produits, prix, avis — à grande échelle." },
        { title: 'Collecte de données', description: "Pipelines de données personnalisés selon vos besoins — précision maximale, sortie structurée, tout format." },
      ],
    },
    clients: {
      title: "Des marques algériennes nous font confiance",
    },
    contact: {
      label: 'Contact',
      title: "Construisons quelque chose pour l'Algérie",
      description: "Que vous ayez besoin d'une solution IA personnalisée ou souhaitiez explorer nos produits existants, nous serions ravis d'entendre vos défis.",
      email: 'Email',
      linkedin: 'LinkedIn',
      location: 'Localisation',
      locationValue: 'Alger, Algérie',
      form: {
        name: 'Nom',
        namePlaceholder: 'Votre nom',
        email: 'Email',
        emailPlaceholder: 'vous@entreprise.com',
        company: 'Entreprise',
        companyPlaceholder: 'Votre entreprise',
        message: 'Message',
        messagePlaceholder: 'Parlez-nous de votre projet...',
        submit: 'Envoyer le message',
        note: 'Nous répondons généralement sous 24 heures.',
      },
    },
    footer: {
      tagline: "Renforcer les industries algériennes avec des solutions d'IA sur mesure. Expertise locale, technologie mondiale.",
      products: 'Produits',
      services: 'Services',
      company: 'Entreprise',
      contactLink: 'Contact',
      copyright: '© 2026 Monad. Tous droits réservés.',
      builtFor: "Conçu pour l'Algérie",
    },
    pricing: {
      label: 'Tarification',
      title: 'Des tarifs adaptés à toutes les entreprises',
      description: "Nous proposons une large gamme de produits sous forme d'abonnements mensuels pour un minimum de 6 mois.",
      monthly: 'Mensuel',
      yearly: 'Annuel',
      month: 'mois',
      year: 'an',
      popular: 'Plus populaire',
      cta: 'Commencer',
      note: "Tous les plans nécessitent un engagement minimum de 6 mois. Plans entreprise personnalisés disponibles sur demande.",
      plans: [
        {
          name: 'Starter',
          desc: 'Pour les petites équipes',
          monthlyPrice: '49 000 DA',
          yearlyPrice: '39 000 DA',
          features: ["Accès à 1 produit IA", "Analytique de base", "Support par email", "Jusqu'à 5 utilisateurs"],
        },
        {
          name: 'Business',
          desc: 'Pour les entreprises en croissance',
          monthlyPrice: '149 000 DA',
          yearlyPrice: '119 000 DA',
          features: ["Tous les produits IA", "Analytique avancée", "Support prioritaire", "Jusqu'à 25 utilisateurs", "Intégrations personnalisées"],
        },
        {
          name: 'Entreprise',
          desc: 'Pour les grandes organisations',
          monthlyPrice: 'Sur mesure',
          yearlyPrice: 'Sur mesure',
          features: ["Accès illimité", "Gestionnaire de compte dédié", "Déploiement sur site", "Utilisateurs illimités", "Garantie SLA", "Développement personnalisé"],
        },
      ],
    },
    productDetails: {
      narwhal: {
        tag: 'Narwhal',
        title: 'Solution E-Réputation',
        description: "Narwhal est un outil piloté par l'IA pour la prise de décision basée sur les données. En fournissant des analyses en temps réel des réseaux sociaux, Narwhal vous permet de suivre les tendances émergentes et le sentiment de marque.",
        tabs: [
          { title: 'Surveillance de réputation', content: "Suivez les mentions de votre marque sur les réseaux sociaux, forums et sites d'actualités. Recevez des alertes en temps réel et une analyse de sentiment." },
          { title: 'Intelligence concurrentielle', content: "Comparez la réputation de votre marque à celle de vos concurrents et identifiez les axes d'amélioration." },
          { title: 'Décisions basées sur les données', content: "Prenez des décisions stratégiques basées sur des analyses en temps réel, assurant la compétitivité de votre marque." },
        ],
      },
      qanun: {
        tag: '9anun',
        title: 'Assistant juridique IA',
        description: "Optimisez vos flux juridiques. Notre base de données, construite à partir des journaux officiels et organisée en graphes, contextualise chaque élément avec ses interactions avec d'autres textes juridiques.",
        tabs: [
          { title: 'Revue de contrats', content: "Analysez automatiquement les contrats pour leur conformité avec le droit algérien, identifiez les risques potentiels et suggérez des amendements." },
          { title: 'Recherche juridique', content: "Recherchez dans des milliers de textes juridiques en langage naturel. Trouvez les articles pertinents en secondes." },
          { title: 'Suivi de conformité', content: "Restez informé des changements réglementaires. Recevez des alertes quand de nouvelles lois impactent vos opérations." },
        ],
      },
      chatbot: {
        tag: 'Monad Chatbot',
        title: 'Assistants conversationnels IA',
        description: "Exploitez la technologie chatbot de pointe de Monad. Bien plus que de simples robots, nos assistants IA personnalisés guident vos visiteurs à travers leur parcours.",
        tabs: [
          { title: 'Compréhension multilingue', content: "Nos chatbots comprennent et répondent en Darija, Français et Arabe — gérant le mélange naturel des langues utilisé par les Algériens." },
          { title: 'Personnalisation de marque', content: "Personnalité, base de connaissances et flux de conversation entièrement personnalisables. Votre chatbot parle avec la voix de votre marque." },
          { title: 'Intégration multi-plateforme', content: "Déployez sur votre site web, WhatsApp, Facebook Messenger ou toute plateforme utilisée par vos clients." },
        ],
      },
      '3xs': {
        tag: '3xS',
        title: 'Services de recherche sémantique',
        description: "Utilise des algorithmes de recherche sémantique de pointe pour fournir des résultats précis et contextuellement pertinents à partir de données non structurées.",
        tabs: [
          { title: 'Compréhension contextuelle', content: "Va au-delà de la correspondance de mots-clés pour comprendre le sens et l'intention derrière les requêtes." },
          { title: 'Architecture privacy-first', content: "Vos données restent les vôtres. Options de déploiement sur site pour que les informations sensibles ne quittent jamais votre infrastructure." },
          { title: 'Pipelines personnalisés', content: "Pipelines d'ingestion et de traitement adaptés à vos types de documents, langues et cas d'usage spécifiques." },
        ],
      },
    },
  },
  ar: {
    dir: 'rtl',
    nav: {
      products: 'المنتجات',
      services: 'الخدمات',
      clients: 'العملاء',
      contact: 'اتصل بنا',
      cta: 'تواصل معنا',
    },
    hero: {
      badge: 'خبرة محلية، تكنولوجيا عالمية',
      title1: 'تمكين الصناعات',
      title2: ' الجزائرية من خلال حلول',
      titleAccent: 'الذكاء الاصطناعي المصممة خصيصاً لها',
      description: 'من الاستماع الاجتماعي إلى البحث الدلالي، نبني أدوات ذكاء اصطناعي مصممة لخصوصيات السوق الجزائري — بكل لغة يتحدثها عملك.',
      cta1: 'اكتشف منتجاتنا',
      cta2: 'احجز مكالمة',
      scroll: 'مرر',
    },
    products: {
      label: 'المنتجات',
      title: 'حلول ذكاء اصطناعي مبنية لطريقة عمل الجزائر الفعلية',
      description: 'كل منتج مصمم خصيصاً للسوق المحلي — يفهم اللهجة، يتنقل في اللوائح المحلية، ويتكامل مع طريقة عمل المؤسسات هنا.',
      learnMore: 'اعرف المزيد',
      tryProduct: 'جرّب هذا المنتج',
      items: [
        {
          tag: 'ناروال',
          title: 'ذكاء الاستماع الاجتماعي',
          description: 'رؤى فورية من وسائل التواصل الاجتماعي عبر الجزائر. اكتشف الاتجاهات الناشئة، راقب مشاعر العلامة التجارية، وافهم الرأي العام — بذكاء اصطناعي يفهم اللهجة الجزائرية.',
          features: ['مراقبة فورية', 'تحليل المشاعر', 'كشف الاتجاهات', 'استخبارات تنافسية'],
        },
        {
          tag: '9انون',
          title: 'مساعد قانوني بالذكاء الاصطناعي',
          description: 'تنقل في القانون الجزائري بدقة. مبني من الجرائد الرسمية ومنظم في رسوم بيانية معرفية، كل عنصر قانوني مُوضع في سياقه مع تفاعلاته مع النصوص الأخرى.',
          features: ['مراجعة العقود', 'مراقبة الامتثال', 'البحث القضائي', 'قاعدة بيانات قانونية'],
        },
        {
          tag: 'شات بوت موناد',
          title: 'مساعدات محادثة ذكية',
          description: 'أكثر من مجرد روبوتات أسئلة وأجوبة. مساعداتنا الذكية تفهم دقائق اللغة الجزائرية — الدارجة، الفرنسية، العربية — ترشد الزوار بمحادثات طبيعية وواعية بالسياق.',
          features: ['فهم لغوي متعدد', 'تخصيص العلامة التجارية', 'تكامل المنصات', 'نشر داخلي'],
        },
        {
          tag: '3xS',
          title: 'خدمات استخراج البيانات  ',
          description: 'بحث دلالي متقدم يقدم نتائج ذات صلة سياقية من بيانات غير منظمة واسعة. يركز على الخصوصية، قابل للتخصيص، مصمم لتحويل البيانات إلى ذكاء.',
          features: ['نتائج سياقية', 'الخصوصية أولاً', 'خطوط أنابيب مخصصة', 'بيانات غير منظمة'],
        },
      ],
    },
    services: {
      label: 'خدمات البيانات',
      title: 'بيانات خام، مُكررة',
      description: 'سواء من الإنترنت أو المستندات المادية، نوفر لك البيانات التي تحتاجها بالهيكل المطلوب.',
      pipelineStatus: 'خط أنابيب المعالجة نشط',
      visual: [
        { label: 'التعرف الضوئي', desc: 'مستند ← نص' },
        { label: 'الاستخراج', desc: 'ويب ← بيانات' },
        { label: 'الجمع', desc: 'خط أنابيب ← مخرجات' },
      ],
      items: [
        { title: 'حلول التعرف الضوئي', description: 'حوّل المستندات الممسوحة والصور إلى نص قابل للتحرير والبحث مع دعم العربية والفرنسية.' },
        { title: 'استخراج البيانات', description: 'استخرج بيانات منظمة من المواقع والمصادر الإلكترونية — معلومات المنتجات، الأسعار، المراجعات — على نطاق واسع.' },
        { title: 'جمع البيانات', description: 'خطوط أنابيب بيانات مخصصة حسب متطلباتك — دقة قصوى، مخرجات منظمة، أي تنسيق.' },
      ],
    },
    clients: {
      title: 'موثوق به من قبل العلامات التجارية في جميع أنحاء العالم    ',
    },
    contact: {
      label: 'اتصل بنا',
      title: 'لنبني شيئاً للجزائر',
      description: 'سواء كنت بحاجة إلى حل ذكاء اصطناعي مخصص أو تريد استكشاف منتجاتنا الحالية، يسعدنا سماع تحدياتك.',
      email: 'البريد الإلكتروني',
      linkedin: 'لينكد إن',
      location: 'الموقع',
      locationValue: 'الجزائر العاصمة، الجزائر',
      form: {
        name: 'الاسم',
        namePlaceholder: 'اسمك',
        email: 'البريد الإلكتروني',
        emailPlaceholder: 'you@company.com',
        company: 'الشركة',
        companyPlaceholder: 'شركتك',
        message: 'الرسالة',
        messagePlaceholder: 'أخبرنا عن مشروعك...',
        submit: 'إرسال الرسالة',
        note: 'نرد عادةً خلال 24 ساعة.',
      },
    },
    footer: {
      tagline: 'تمكين الصناعات الجزائرية بحلول ذكاء اصطناعي مخصصة. خبرة محلية، تكنولوجيا عالمية.',
      products: 'المنتجات',
      services: 'الخدمات',
      company: 'الشركة',
      contactLink: 'اتصل بنا',
      copyright: '© 2026 موناد. جميع الحقوق محفوظة.',
      builtFor: 'صُنع للجزائر',
    },
    pricing: {
      label: 'التسعير',
      title: 'أسعار مصممة لتناسب جميع الأعمال',
      description: 'نقدم مجموعة واسعة من المنتجات في شكل اشتراكات شهرية لمدة 6 أشهر كحد أدنى.',
      monthly: 'شهري',
      yearly: 'سنوي',
      month: 'شهر',
      year: 'سنة',
      popular: 'الأكثر شعبية',
      cta: 'ابدأ الآن',
      note: 'جميع الخطط تتطلب التزاماً لمدة 6 أشهر كحد أدنى. خطط مؤسسية مخصصة متاحة عند الطلب.',
      plans: [
        {
          name: 'المبتدئ',
          desc: 'للفرق الصغيرة',
          monthlyPrice: '49,000 د.ج',
          yearlyPrice: '39,000 د.ج',
          features: ['الوصول لمنتج ذكاء اصطناعي واحد', 'تحليلات أساسية', 'دعم بالبريد الإلكتروني', 'حتى 5 مستخدمين'],
        },
        {
          name: 'الأعمال',
          desc: 'للشركات النامية',
          monthlyPrice: '149,000 د.ج',
          yearlyPrice: '119,000 د.ج',
          features: ['جميع منتجات الذكاء الاصطناعي', 'تحليلات متقدمة', 'دعم ذو أولوية', 'حتى 25 مستخدم', 'تكاملات مخصصة'],
        },
        {
          name: 'المؤسسة',
          desc: 'للمنظمات الكبيرة',
          monthlyPrice: 'مخصص',
          yearlyPrice: 'مخصص',
          features: ['وصول غير محدود', 'مدير حساب مخصص', 'نشر محلي', 'مستخدمون غير محدودين', 'ضمان SLA', 'تطوير مخصص'],
        },
      ],
    },
    productDetails: {
      narwhal: {
        tag: 'ناروال',
        title: 'حل السمعة الإلكترونية',
        description: 'ناروال هو أداة مدعومة بالذكاء الاصطناعي لاتخاذ القرارات المبنية على البيانات. من خلال تقديم رؤى فورية من وسائل التواصل الاجتماعي.',
        tabs: [
          { title: 'مراقبة السمعة', content: 'تتبع إشارات علامتك التجارية عبر القنوات الإلكترونية المختلفة بما في ذلك وسائل التواصل الاجتماعي والمنتديات ومواقع الأخبار.' },
          { title: 'الاستخبارات التنافسية', content: 'قارن سمعة علامتك التجارية بالمنافسين وحدد مجالات التحسين.' },
          { title: 'قرارات مبنية على البيانات', content: 'اتخذ قرارات استراتيجية بناءً على تحليلات واتجاهات في الوقت الفعلي.' },
        ],
      },
      qanun: {
        tag: '9انون',
        title: 'مساعد قانوني بالذكاء الاصطناعي',
        description: 'حسّن سير العمل القانوني. قاعدة بياناتنا مبنية من الجرائد الرسمية ومنظمة في رسوم بيانية، كل عنصر موضع في سياقه مع تفاعلاته مع النصوص القانونية الأخرى.',
        tabs: [
          { title: 'مراجعة العقود', content: 'حلل العقود تلقائياً للتأكد من امتثالها للقانون الجزائري وحدد المخاطر المحتملة.' },
          { title: 'البحث القانوني', content: 'ابحث في آلاف النصوص القانونية باللغة الطبيعية. اعثر على المواد ذات الصلة في ثوانٍ.' },
          { title: 'مراقبة الامتثال', content: 'ابقَ على اطلاع بالتغييرات التنظيمية. احصل على تنبيهات عندما تؤثر قوانين جديدة على عملياتك.' },
        ],
      },
      chatbot: {
        tag: 'شات بوت موناد',
        title: 'مساعدات محادثة ذكية',
        description: 'استفد من تقنية الشات بوت المتقدمة من موناد. أكثر من مجرد روبوتات أسئلة وأجوبة، مساعداتنا الشخصية ترشد زوارك بسلاسة.',
        tabs: [
          { title: 'فهم متعدد اللغات', content: 'شات بوتاتنا تفهم وتجيب بالدارجة والفرنسية والعربية — تتعامل مع التبديل الطبيعي بين اللغات.' },
          { title: 'تخصيص العلامة التجارية', content: 'شخصية وقاعدة معرفة ومسارات محادثة قابلة للتخصيص بالكامل. شات بوتك يتحدث بصوت علامتك التجارية.' },
          { title: 'تكامل المنصات', content: 'انشر على موقعك، واتساب، فيسبوك ماسنجر أو أي منصة يستخدمها عملاؤك.' },
        ],
      },
      '3xs': {
        tag: '3xS',
        title: 'خدمات البحث الدلالي',
        description: 'يستخدم خوارزميات بحث دلالي متقدمة لتقديم نتائج دقيقة وذات صلة سياقية من بيانات غير منظمة واسعة.',
        tabs: [
          { title: 'فهم السياق', content: 'يتجاوز مطابقة الكلمات المفتاحية لفهم المعنى والنية وراء الاستعلامات.' },
          { title: 'بنية الخصوصية أولاً', content: 'بياناتك تبقى لك. خيارات النشر المحلي تضمن عدم مغادرة المعلومات الحساسة لبنيتك التحتية.' },
          { title: 'خطوط أنابيب مخصصة', content: 'خطوط أنابيب معالجة مخصصة لأنواع مستنداتك ولغاتك وحالات استخدامك المحددة.' },
        ],
      },
    },
  },
}

const I18nContext = createContext()

export function I18nProvider({ children }) {
  const [lang, setLang] = useState('en')

  const t = useCallback((path) => {
    const keys = path.split('.')
    let val = translations[lang]
    for (const key of keys) {
      val = val?.[key]
    }
    return val || path
  }, [lang])

  const dir = translations[lang].dir

  return (
    <I18nContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  return useContext(I18nContext)
}
