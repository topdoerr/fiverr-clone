import {
  Workflow,
  PhoneCall,
  Bot,
  AppWindow,
  TrendingUp,
  Clapperboard,
  BarChart3,
  Compass,
  Briefcase,
  ShieldCheck,
  type LucideIcon,
  Search,
  PenLine,
  Users,
  CheckCircle2,
  PackageCheck,
} from "lucide-react";

/* ----------------------------------------------------------------------------
 * Types
 * ------------------------------------------------------------------------- */

export type Tier = "Starter" | "Growth" | "Scale";

export interface Package {
  tier: Tier;
  name: string;
  price: string;
  deliveryTime: string;
  bestFor: string;
  includes: string[];
  revisions: string;
  humanQA: boolean;
  aiSetup: boolean;
  integrations: string;
  support: string;
  highlight?: boolean;
}

export interface Vertical {
  slug: string;
  name: string;
  icon: LucideIcon;
  shortDescription: string;
  description: string;
  startingPrice: string;
  deliveryTime: string;
  tags: string[];
  services: string[];
  useCases: string[];
  includes: string[];
  clientNeeds: string[];
  addOns: { name: string; price: string }[];
  packages: Package[];
  faq: { q: string; a: string }[];
}

/* ----------------------------------------------------------------------------
 * Navigation
 * ------------------------------------------------------------------------- */

export const navItems = [
  { label: "Explore Services", href: "/marketplace" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Enterprise", href: "/enterprise" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export const footerNav = [
  {
    title: "Marketplace",
    links: [
      { label: "Explore Services", href: "/marketplace" },
      { label: "Start a Project", href: "/start" },
      { label: "Pricing", href: "/pricing" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Enterprise", href: "/enterprise" },
      { label: "About", href: "/about" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Verticals",
    links: [
      { label: "AI Automation", href: "/marketplace/ai-automation" },
      { label: "AI Voice Agents", href: "/marketplace/ai-voice-agents" },
      { label: "AI Chatbots", href: "/marketplace/ai-chatbots" },
      { label: "AI Websites & Apps", href: "/marketplace/ai-websites-apps" },
    ],
  },
];

/* ----------------------------------------------------------------------------
 * Trust bar
 * ------------------------------------------------------------------------- */

export const trustPoints = [
  "Internal AI talent",
  "Human-reviewed delivery",
  "Clear scopes and timelines",
  "Managed by TopDoerr",
  "Built for Puerto Rico, LATAM, and growth companies",
];

export const searchChips = [
  "AI voice agent",
  "Automate my sales process",
  "Build an AI chatbot",
  "Create AI ads",
  "AI website",
  "Dashboard automation",
  "AI strategy roadmap",
];

export const trustedLogos = [
  "Meta",
  "Google",
  "Netflix",
  "P&G",
  "PayPal",
  "Payoneer",
];

/* ----------------------------------------------------------------------------
 * Popular outcomes
 * ------------------------------------------------------------------------- */

export const popularOutcomes = [
  { label: "Answer my business calls", vertical: "ai-voice-agents" },
  { label: "Automate my CRM", vertical: "ai-automation" },
  { label: "Build an AI chatbot", vertical: "ai-chatbots" },
  { label: "Create AI ads", vertical: "ai-marketing-growth" },
  { label: "Launch an AI landing page", vertical: "ai-websites-apps" },
  { label: "Turn spreadsheets into dashboards", vertical: "data-intelligence" },
  { label: "Train an internal assistant", vertical: "ai-chatbots" },
  { label: "Build an AI MVP", vertical: "ai-websites-apps" },
  { label: "Create a voice agent", vertical: "ai-voice-agents" },
  { label: "Write and launch campaigns", vertical: "ai-marketing-growth" },
  { label: "Clean up operations", vertical: "ai-business-operations" },
  { label: "Build an AI roadmap", vertical: "ai-strategy-consulting" },
];

/* ----------------------------------------------------------------------------
 * Delivery process
 * ------------------------------------------------------------------------- */

export const deliverySteps = [
  {
    icon: Search,
    title: "Choose the outcome",
    description: "Browse services or describe what you need.",
  },
  {
    icon: PenLine,
    title: "Build your brief",
    description: "Our AI brief builder turns your idea into a clear scope.",
  },
  {
    icon: Users,
    title: "TopDoerr assigns the pod",
    description:
      "We match the project with internal strategists, builders, creatives, engineers, and AI agents.",
  },
  {
    icon: CheckCircle2,
    title: "We build and review",
    description:
      "AI accelerates delivery. Humans review quality, brand, security, and accuracy.",
  },
  {
    icon: PackageCheck,
    title: "You receive the final delivery",
    description:
      "Track status, request revisions, and scale into recurring support.",
  },
];

/* ----------------------------------------------------------------------------
 * Why TopDoerr
 * ------------------------------------------------------------------------- */

export const whyFeatures = [
  {
    title: "Internal talent only",
    description:
      "No public freelancers. Every project is handled by TopDoerr's internal network of AI builders, strategists, engineers, creatives, and operators.",
  },
  {
    title: "AI-assisted scoping",
    description:
      "Our brief builder turns vague ideas into clear project requirements, timelines, and delivery paths.",
  },
  {
    title: "Human-reviewed output",
    description:
      "AI accelerates the work, but humans review the strategy, quality, brand, accuracy, and final delivery.",
  },
  {
    title: "Clear packages",
    description:
      "Choose from starter, growth, or scale packages with transparent deliverables.",
  },
  {
    title: "One accountable brand",
    description:
      "No chasing sellers. No mixed standards. TopDoerr owns the delivery experience.",
  },
  {
    title: "Built to scale",
    description:
      "Start with one project, then expand into recurring AI operations, automations, agents, and enterprise systems.",
  },
];

/* ----------------------------------------------------------------------------
 * Freelance vs TopDoerr comparison
 * ------------------------------------------------------------------------- */

export const comparison: { freelance: string; topdoerr: string }[] = [
  { freelance: "Random sellers", topdoerr: "Internal talent only" },
  { freelance: "Uneven quality", topdoerr: "Standardized QA" },
  { freelance: "Manual negotiation", topdoerr: "Clear packages" },
  { freelance: "Unclear ownership", topdoerr: "One accountable brand" },
  {
    freelance: "No unified delivery standard",
    topdoerr: "AI-assisted delivery system",
  },
  { freelance: "Buyer manages the risk", topdoerr: "TopDoerr manages the outcome" },
];

/* ----------------------------------------------------------------------------
 * Enterprise
 * ------------------------------------------------------------------------- */

export const enterpriseFeatures = [
  "Dedicated AI strategist",
  "Internal delivery pod",
  "Multi-project roadmap",
  "Private workspace",
  "SLA-based delivery",
  "Security and compliance review",
  "Monthly optimization",
  "Executive reporting",
];

/* ----------------------------------------------------------------------------
 * Pricing paths
 * ------------------------------------------------------------------------- */

export const pricingPaths = [
  {
    name: "Marketplace Projects",
    tagline: "For scoped one-time AI work.",
    price: "From $500",
    priceSuffix: "to $10,000+",
    includes: [
      "Fixed deliverables",
      "Defined timeline",
      "Project workspace",
      "Human QA",
      "Included revisions",
    ],
    cta: "Start a Project",
    href: "/start",
    highlight: false,
  },
  {
    name: "Monthly AI Ops",
    tagline: "For recurring AI execution.",
    price: "From $2,500",
    priceSuffix: "/month",
    includes: [
      "Monthly project queue",
      "Automation support",
      "Content & ops workflows",
      "Reporting",
      "Continuous optimization",
    ],
    cta: "Start a Project",
    href: "/start",
    highlight: true,
  },
  {
    name: "Enterprise AI Partner",
    tagline: "For multi-department AI transformation.",
    price: "Custom",
    priceSuffix: "",
    includes: [
      "AI roadmap",
      "Dedicated pod",
      "SLAs",
      "Governance",
      "Integrations",
      "Executive reporting",
    ],
    cta: "Talk to Enterprise",
    href: "/enterprise",
    highlight: false,
  },
];

/* ----------------------------------------------------------------------------
 * Testimonials (placeholder)
 * ------------------------------------------------------------------------- */

export const testimonials = [
  {
    quote:
      "We replaced three disconnected tools and a backlog of manual work with one TopDoerr automation pod. The scope was clear from day one.",
    name: "Marisol Rivera",
    role: "COO, Caribe Logistics",
    initials: "MR",
  },
  {
    quote:
      "Our after-hours calls are now answered by a Spanish-first voice agent. Bookings went up and we never touched a freelancer.",
    name: "Daniel Ortiz",
    role: "Founder, Clínica Norte",
    initials: "DO",
  },
  {
    quote:
      "The AI brief builder turned a vague idea into a scoped MVP in a week. Humans reviewed everything before delivery.",
    name: "Priya Nair",
    role: "VP Product, Lumen Retail",
    initials: "PN",
  },
  {
    quote:
      "One accountable partner for automation, dashboards, and governance. TopDoerr feels like an internal AI team.",
    name: "Carlos Mendoza",
    role: "CFO, Vega Group",
    initials: "CM",
  },
];

/* ----------------------------------------------------------------------------
 * Dashboard mock
 * ------------------------------------------------------------------------- */

export const dashboardProjects = [
  {
    title: "AI Voice Agent for Appointment Calls",
    status: "In QA Review",
    statusTone: "amber" as const,
    pod: "Voice AI + Operations",
    due: "Friday",
    progress: 78,
    nextMilestone: "Final QA sign-off",
    qa: "In review",
    invoice: "Paid",
    files: 12,
    messages: 4,
  },
  {
    title: "CRM Automation for Sales Follow-up",
    status: "Building",
    statusTone: "blue" as const,
    pod: "Automation + Growth",
    due: "Next Wednesday",
    progress: 45,
    nextMilestone: "Integration testing",
    qa: "Pending",
    invoice: "Deposit paid",
    files: 8,
    messages: 7,
  },
  {
    title: "Executive KPI Dashboard",
    status: "Awaiting Client Files",
    statusTone: "gray" as const,
    pod: "Data + Intelligence",
    due: "Pending",
    progress: 15,
    nextMilestone: "Receive data sources",
    qa: "Not started",
    invoice: "Draft",
    files: 2,
    messages: 3,
  },
];

/* ----------------------------------------------------------------------------
 * Global FAQ
 * ------------------------------------------------------------------------- */

export const globalFaq = [
  {
    q: "Is TopDoerr a freelancer marketplace?",
    a: "No. TopDoerr gives you a marketplace-style buying experience, but delivery is handled by internal TopDoerr talent, systems, and AI agents.",
  },
  {
    q: "Who works on my project?",
    a: "TopDoerr assigns the right internal pod based on your service, industry, urgency, tools, and project complexity.",
  },
  {
    q: "Can I choose a specific person?",
    a: "For most projects, you choose the outcome and TopDoerr assigns the best team. Enterprise clients may request dedicated strategists or pods.",
  },
  {
    q: "Do you use AI to deliver the work?",
    a: "Yes. AI accelerates research, drafting, building, testing, and automation. Human experts review strategy, quality, accuracy, and final delivery.",
  },
  {
    q: "What happens after I submit a brief?",
    a: "Your brief is reviewed, scoped, priced if needed, and routed to the right internal delivery pod.",
  },
  {
    q: "Can I request revisions?",
    a: "Yes. Each package includes a defined number of revisions. Larger projects include milestone reviews.",
  },
  {
    q: "Do you work in Spanish?",
    a: "Yes. TopDoerr is Spanish-first and built for Puerto Rico, LATAM, and companies serving bilingual markets.",
  },
  {
    q: "Can this support enterprise projects?",
    a: "Yes. Enterprise clients can access dedicated pods, AI roadmaps, SLAs, governance, and recurring delivery.",
  },
];

/* ----------------------------------------------------------------------------
 * Brief builder
 * ------------------------------------------------------------------------- */

export const briefSteps = {
  goals: [
    "Automate a workflow",
    "Build an AI agent",
    "Launch an AI website/app",
    "Create marketing content",
    "Build a dashboard",
    "Improve operations",
    "Not sure yet",
  ],
  industries: [
    "Healthcare",
    "Real estate",
    "Retail",
    "Logistics",
    "Professional services",
    "Entertainment",
    "Education",
    "Government",
    "Other",
  ],
  tools: [
    "HubSpot",
    "Salesforce",
    "Google Workspace",
    "Microsoft 365",
    "Slack",
    "Zoom",
    "WhatsApp",
    "Shopify",
    "WordPress",
    "Airtable",
    "Notion",
    "Excel/Sheets",
    "Other",
  ],
  urgency: ["ASAP", "This week", "This month", "Exploring"],
  budgets: [
    "Under $1,000",
    "$1,000-$3,000",
    "$3,000-$10,000",
    "$10,000+",
    "Not sure",
  ],
};

export const keyPhrases = [
  "Buy the outcome, not the freelancer.",
  "Internal talent. AI speed. Human review.",
  "From idea to deployed AI system.",
  "One accountable AI partner.",
  "Marketplace simplicity. Managed delivery.",
  "Built by TopDoerr.",
  "We Keep It Human.",
];

/* ----------------------------------------------------------------------------
 * Verticals
 * ------------------------------------------------------------------------- */

export const verticals: Vertical[] = [
  {
    slug: "ai-automation",
    name: "AI Automation",
    icon: Workflow,
    shortDescription:
      "Automate repetitive work across sales, ops, admin, and support.",
    description:
      "Automate repetitive work across sales, operations, admin, reporting, and customer support.",
    startingPrice: "From $950",
    deliveryTime: "3-5 day starter delivery",
    tags: ["Workflows", "CRM", "Integrations", "Ops"],
    services: [
      "Workflow automation",
      "CRM automation",
      "Lead routing",
      "Internal AI assistants",
      "Document automation",
      "Email and calendar automation",
      "Zapier / Make / n8n automations",
      "SOP automation",
    ],
    useCases: [
      "Route inbound leads to the right rep automatically",
      "Sync data between your CRM and tools without manual entry",
      "Auto-generate and file documents from form submissions",
      "Trigger follow-ups across email and calendar",
    ],
    includes: [
      "Scoped automation map and documentation",
      "Connected tools and tested triggers",
      "Error handling and notifications",
      "Handover walkthrough",
    ],
    clientNeeds: [
      "Access to the tools being connected",
      "A description of the current manual process",
      "A point of contact for approvals",
    ],
    addOns: [
      { name: "Additional workflow", price: "+$450" },
      { name: "Custom dashboard", price: "+$900" },
      { name: "Team training session", price: "+$350" },
    ],
    packages: [
      {
        tier: "Starter",
        name: "Starter Automation",
        price: "From $950",
        deliveryTime: "3-5 days",
        bestFor: "One painful manual process",
        includes: [
          "One workflow automated",
          "Basic documentation",
          "Single tool trigger",
        ],
        revisions: "1 round",
        humanQA: true,
        aiSetup: true,
        integrations: "1 tool",
        support: "Email",
      },
      {
        tier: "Growth",
        name: "Growth Automation",
        price: "From $3,500",
        deliveryTime: "7-14 days",
        bestFor: "Connected, multi-step operations",
        includes: [
          "Multiple connected workflows",
          "CRM or tool integration",
          "QA testing",
          "Documentation + handover",
        ],
        revisions: "2 rounds",
        humanQA: true,
        aiSetup: true,
        integrations: "Up to 4 tools",
        support: "Priority email",
        highlight: true,
      },
      {
        tier: "Scale",
        name: "AI Ops System",
        price: "Custom",
        deliveryTime: "Custom timeline",
        bestFor: "Full department automation",
        includes: [
          "Full department automation",
          "Dashboards",
          "Multiple integrations",
          "Team training",
          "SLA support",
        ],
        revisions: "Milestone reviews",
        humanQA: true,
        aiSetup: true,
        integrations: "Unlimited",
        support: "SLA + dedicated pod",
      },
    ],
    faq: [
      {
        q: "Which automation tools do you work with?",
        a: "We build on Zapier, Make, n8n, and native APIs, and connect to most CRMs and business tools.",
      },
      {
        q: "Do you document the automations?",
        a: "Yes. Every build includes documentation and a handover walkthrough so your team can operate it.",
      },
    ],
  },
  {
    slug: "ai-voice-agents",
    name: "AI Voice Agents",
    icon: PhoneCall,
    shortDescription:
      "Human-sounding AI agents for calls, intake, booking, and follow-up.",
    description:
      "Human-sounding AI voice agents for calls, lead qualification, appointment booking, reminders, and customer service.",
    startingPrice: "From $2,500",
    deliveryTime: "Pilot in 7-14 days",
    tags: ["Calls", "Appointments", "Spanish", "CRM"],
    services: [
      "Appointment booking agents",
      "Call answering agents",
      "Lead qualification agents",
      "Patient intake agents",
      "Sales follow-up agents",
      "After-hours support agents",
      "Spanish-first voice agents",
      "Call analytics",
    ],
    useCases: [
      "Answer and route inbound calls 24/7",
      "Book appointments directly into your calendar",
      "Qualify leads before they reach your team",
      "Handle after-hours support in Spanish and English",
    ],
    includes: [
      "Designed call flow and scripts",
      "Voice agent with test number",
      "Escalation and fallback logic",
      "Call analytics dashboard",
    ],
    clientNeeds: [
      "Your call scripts or talking points",
      "Calendar or CRM access for booking",
      "Escalation contacts and hours",
    ],
    addOns: [
      { name: "Additional language", price: "+$1,200" },
      { name: "CRM integration", price: "+$1,500" },
      { name: "Compliance review", price: "+$2,000" },
    ],
    packages: [
      {
        tier: "Starter",
        name: "Voice Agent Pilot",
        price: "From $2,500",
        deliveryTime: "7-14 days",
        bestFor: "Testing a single call flow",
        includes: [
          "One call flow",
          "One voice agent",
          "Test number",
          "Basic analytics",
        ],
        revisions: "1 round",
        humanQA: true,
        aiSetup: true,
        integrations: "Test environment",
        support: "Email",
      },
      {
        tier: "Growth",
        name: "Voice Agent Launch",
        price: "From $7,500",
        deliveryTime: "2-4 weeks",
        bestFor: "Production-ready deployment",
        includes: [
          "Production-ready voice agent",
          "Integrations",
          "Escalation logic",
          "QA testing",
        ],
        revisions: "2 rounds",
        humanQA: true,
        aiSetup: true,
        integrations: "CRM + calendar",
        support: "Priority",
        highlight: true,
      },
      {
        tier: "Scale",
        name: "Voice Agent Network",
        price: "Custom",
        deliveryTime: "Custom timeline",
        bestFor: "Multiple agents and locations",
        includes: [
          "Multiple agents",
          "Departments and locations",
          "Dashboards",
          "Compliance review",
        ],
        revisions: "Milestone reviews",
        humanQA: true,
        aiSetup: true,
        integrations: "Multi-system",
        support: "SLA + dedicated pod",
      },
    ],
    faq: [
      {
        q: "Do the voice agents sound human?",
        a: "Yes. We use natural-sounding voices with conversational flows, and humans review tone and accuracy before launch.",
      },
      {
        q: "Can the agent speak Spanish?",
        a: "Spanish-first agents are a core offering, built for Puerto Rico, LATAM, and bilingual markets.",
      },
    ],
  },
  {
    slug: "ai-chatbots",
    name: "AI Chatbots & Assistants",
    icon: Bot,
    shortDescription:
      "Custom assistants trained on your business, docs, and workflows.",
    description:
      "Custom AI chatbots and assistants trained on your business, documents, website, FAQs, and workflows.",
    startingPrice: "From $1,500",
    deliveryTime: "Starter in 5-10 days",
    tags: ["Website", "RAG", "Support", "WhatsApp"],
    services: [
      "Website chatbot",
      "Internal knowledge assistant",
      "Sales assistant",
      "Customer support chatbot",
      "RAG chatbot",
      "Document Q&A bot",
      "WhatsApp AI assistant",
      "CRM-connected assistant",
    ],
    useCases: [
      "Answer customer questions on your website 24/7",
      "Let staff query internal docs instantly",
      "Qualify and route sales conversations",
      "Deflect support tickets with accurate answers",
    ],
    includes: [
      "Trained knowledge base",
      "Website or channel embed",
      "Escalation to a human",
      "Conversation analytics",
    ],
    clientNeeds: [
      "FAQs, documents, or website to train on",
      "Brand tone guidelines",
      "Escalation rules",
    ],
    addOns: [
      { name: "Extra knowledge source", price: "+$600" },
      { name: "WhatsApp channel", price: "+$900" },
      { name: "CRM connection", price: "+$1,200" },
    ],
    packages: [
      {
        tier: "Starter",
        name: "AI Chatbot Starter",
        price: "From $1,500",
        deliveryTime: "5-10 days",
        bestFor: "A focused FAQ or doc bot",
        includes: [
          "One chatbot",
          "Trained on core FAQs or documents",
          "Website embed",
        ],
        revisions: "1 round",
        humanQA: true,
        aiSetup: true,
        integrations: "Website",
        support: "Email",
      },
      {
        tier: "Growth",
        name: "AI Assistant Pro",
        price: "From $5,000",
        deliveryTime: "2-3 weeks",
        bestFor: "Connected, multi-source assistant",
        includes: [
          "Custom knowledge base",
          "Integrations",
          "Escalation logic",
          "Analytics",
        ],
        revisions: "2 rounds",
        humanQA: true,
        aiSetup: true,
        integrations: "Multi-tool",
        support: "Priority",
        highlight: true,
      },
      {
        tier: "Scale",
        name: "Enterprise Knowledge Agent",
        price: "Custom",
        deliveryTime: "Custom timeline",
        bestFor: "Secure internal knowledge agent",
        includes: [
          "Secure internal assistant",
          "Permissions",
          "Advanced retrieval",
          "Monitoring",
        ],
        revisions: "Milestone reviews",
        humanQA: true,
        aiSetup: true,
        integrations: "Enterprise systems",
        support: "SLA + dedicated pod",
      },
    ],
    faq: [
      {
        q: "How do you prevent wrong answers?",
        a: "We use retrieval-grounded responses (RAG), guardrails, and human review of the knowledge base before launch.",
      },
      {
        q: "Can it connect to our internal tools?",
        a: "Yes. Growth and Enterprise tiers connect to CRMs, knowledge bases, and internal systems with permissions.",
      },
    ],
  },
  {
    slug: "ai-websites-apps",
    name: "AI Websites & Apps",
    icon: AppWindow,
    shortDescription:
      "Launch AI-powered sites, portals, dashboards, and internal tools faster.",
    description:
      "Launch AI-powered websites, portals, dashboards, and internal tools faster.",
    startingPrice: "From $1,500",
    deliveryTime: "Landing page in 5-10 days",
    tags: ["Landing", "MVP", "Portals", "Apps"],
    services: [
      "AI landing pages",
      "AI SaaS prototypes",
      "Internal business tools",
      "Client portals",
      "AI search interfaces",
      "AI dashboards",
      "Replit / Vercel app builds",
      "MVP development",
    ],
    useCases: [
      "Ship a premium landing page that converts",
      "Validate a product idea with a working MVP",
      "Give clients a branded portal",
      "Build internal tools your team actually uses",
    ],
    includes: [
      "Responsive design and build",
      "Copywriting and structure",
      "AI feature integration",
      "Deployment",
    ],
    clientNeeds: [
      "Brand assets and references",
      "Product or content details",
      "Domain and hosting access (for deployment)",
    ],
    addOns: [
      { name: "Extra page", price: "+$500" },
      { name: "Auth + database", price: "+$1,500" },
      { name: "Ongoing maintenance", price: "Custom" },
    ],
    packages: [
      {
        tier: "Starter",
        name: "AI Landing Page",
        price: "From $1,500",
        deliveryTime: "5-10 days",
        bestFor: "A high-converting single page",
        includes: [
          "One premium landing page",
          "Copywriting",
          "Responsive design",
          "Basic form",
        ],
        revisions: "1 round",
        humanQA: true,
        aiSetup: true,
        integrations: "Form / analytics",
        support: "Email",
      },
      {
        tier: "Growth",
        name: "AI MVP Sprint",
        price: "From $6,500",
        deliveryTime: "3-5 weeks",
        bestFor: "Validating a product idea",
        includes: [
          "Functional app prototype",
          "Auth",
          "Database",
          "AI integration",
        ],
        revisions: "2 rounds",
        humanQA: true,
        aiSetup: true,
        integrations: "Auth + DB + AI",
        support: "Priority",
        highlight: true,
      },
      {
        tier: "Scale",
        name: "AI Product Build",
        price: "Custom",
        deliveryTime: "Custom timeline",
        bestFor: "A full product to ship and scale",
        includes: [
          "Full product architecture",
          "UX",
          "Engineering",
          "Deployment + QA",
        ],
        revisions: "Milestone reviews",
        humanQA: true,
        aiSetup: true,
        integrations: "Custom stack",
        support: "SLA + dedicated pod",
      },
    ],
    faq: [
      {
        q: "What stack do you build on?",
        a: "Typically Next.js, TypeScript, and modern AI APIs, deployed to Vercel or your environment.",
      },
      {
        q: "Do we own the code?",
        a: "Yes. You receive full ownership of the codebase and deployment.",
      },
    ],
  },
  {
    slug: "ai-marketing-growth",
    name: "AI Marketing & Growth",
    icon: TrendingUp,
    shortDescription:
      "Create, test, and optimize growth campaigns with AI.",
    description:
      "Use AI to create, test, and optimize growth campaigns across content, ads, SEO, email, and social.",
    startingPrice: "From $750",
    deliveryTime: "Audit in 3-5 days",
    tags: ["Ads", "SEO", "Email", "Content"],
    services: [
      "AI ad creative",
      "SEO content systems",
      "Email campaigns",
      "Social media content",
      "Landing page optimization",
      "Lead generation workflows",
      "AI sales scripts",
      "Campaign analytics",
    ],
    useCases: [
      "Spin up tested ad creative variations fast",
      "Build an SEO content engine that compounds",
      "Launch nurture and re-engagement email flows",
      "Optimize landing pages for conversion",
    ],
    includes: [
      "Campaign strategy and creative",
      "Copy and assets",
      "Tracking and analytics setup",
      "Optimization recommendations",
    ],
    clientNeeds: [
      "Brand guidelines and offers",
      "Ad and analytics account access",
      "Target audience details",
    ],
    addOns: [
      { name: "Extra ad set", price: "+$500" },
      { name: "Landing page", price: "+$1,500" },
      { name: "Monthly reporting", price: "Custom" },
    ],
    packages: [
      {
        tier: "Starter",
        name: "Growth Audit",
        price: "From $750",
        deliveryTime: "3-5 days",
        bestFor: "Finding your biggest opportunities",
        includes: [
          "AI-powered review of website, funnel, messaging",
          "Prioritized opportunity list",
        ],
        revisions: "1 round",
        humanQA: true,
        aiSetup: false,
        integrations: "Analytics review",
        support: "Email",
      },
      {
        tier: "Growth",
        name: "Campaign Launch",
        price: "From $2,500",
        deliveryTime: "1-2 weeks",
        bestFor: "Launching a full campaign",
        includes: [
          "Landing page copy",
          "Ads",
          "Email sequence",
          "Creative concepts",
        ],
        revisions: "2 rounds",
        humanQA: true,
        aiSetup: true,
        integrations: "Ad + email tools",
        support: "Priority",
        highlight: true,
      },
      {
        tier: "Scale",
        name: "Growth System",
        price: "From $5,000/mo",
        deliveryTime: "Ongoing",
        bestFor: "Compounding monthly growth",
        includes: [
          "Ongoing campaign production",
          "Testing",
          "Automation",
          "Reporting",
        ],
        revisions: "Continuous",
        humanQA: true,
        aiSetup: true,
        integrations: "Full stack",
        support: "Dedicated pod",
      },
    ],
    faq: [
      {
        q: "Do you manage ad spend?",
        a: "We build and optimize campaigns; ad spend is billed directly to your ad accounts.",
      },
      {
        q: "How do you measure results?",
        a: "Every engagement includes tracking setup and reporting against agreed KPIs.",
      },
    ],
  },
  {
    slug: "ai-creative-studio",
    name: "AI Creative Studio",
    icon: Clapperboard,
    shortDescription:
      "AI-native creative production for brands, ads, and storytelling.",
    description:
      "AI-native creative production for brands, artists, entertainment, ads, and cultural storytelling.",
    startingPrice: "From $750",
    deliveryTime: "Concept in 3-5 days",
    tags: ["Video", "Ads", "Brand", "Motion"],
    services: [
      "AI video concepts",
      "AI ad campaigns",
      "Brand visuals",
      "Motion graphics",
      "AI storyboards",
      "Social content",
      "Entertainment concepts",
      "Creative direction",
    ],
    useCases: [
      "Develop a campaign concept and visual direction",
      "Produce a pack of social and ad assets",
      "Storyboard and produce AI video",
      "Build a cohesive brand visual system",
    ],
    includes: [
      "Creative direction",
      "Concepts and sample assets",
      "Production-ready files",
      "Revisions",
    ],
    clientNeeds: [
      "Brand assets and references",
      "Campaign goals",
      "Channel and format requirements",
    ],
    addOns: [
      { name: "Extra asset pack", price: "+$900" },
      { name: "Long-form video", price: "Custom" },
      { name: "Voiceover", price: "+$400" },
    ],
    packages: [
      {
        tier: "Starter",
        name: "Creative Concept",
        price: "From $750",
        deliveryTime: "3-5 days",
        bestFor: "A direction to build from",
        includes: ["Campaign idea", "Visual direction", "Sample assets"],
        revisions: "1 round",
        humanQA: true,
        aiSetup: false,
        integrations: "N/A",
        support: "Email",
      },
      {
        tier: "Growth",
        name: "AI Content Pack",
        price: "From $2,500",
        deliveryTime: "1-2 weeks",
        bestFor: "A batch of ready-to-post assets",
        includes: [
          "Multiple social/video/ad assets",
          "Creative direction",
          "Format variations",
        ],
        revisions: "2 rounds",
        humanQA: true,
        aiSetup: true,
        integrations: "Asset delivery",
        support: "Priority",
        highlight: true,
      },
      {
        tier: "Scale",
        name: "Studio Production",
        price: "Custom",
        deliveryTime: "Custom timeline",
        bestFor: "A full produced campaign",
        includes: [
          "Full campaign",
          "Scripts",
          "AI production",
          "Editing + launch assets",
        ],
        revisions: "Milestone reviews",
        humanQA: true,
        aiSetup: true,
        integrations: "Full production",
        support: "Dedicated pod",
      },
    ],
    faq: [
      {
        q: "Is the work brand-safe?",
        a: "Yes. Human creative directors review every asset for brand, tone, and accuracy before delivery.",
      },
      {
        q: "Can you match our existing brand?",
        a: "Absolutely. We work from your brand system and references to stay on-brand.",
      },
    ],
  },
  {
    slug: "data-intelligence",
    name: "Data, Dashboards & Intelligence",
    icon: BarChart3,
    shortDescription:
      "Turn business data into dashboards, insights, and decision systems.",
    description:
      "Turn business data into dashboards, insights, alerts, and decision systems.",
    startingPrice: "From $1,500",
    deliveryTime: "Dashboard in 1-2 weeks",
    tags: ["KPIs", "Dashboards", "Forecasting", "Reporting"],
    services: [
      "KPI dashboards",
      "Sales dashboards",
      "Operations dashboards",
      "Google Sheets automation",
      "Looker / Power BI dashboards",
      "Data cleaning",
      "Forecasting",
      "AI reporting agents",
    ],
    useCases: [
      "See company KPIs in one live view",
      "Automate weekly and monthly reporting",
      "Forecast revenue and demand",
      "Get alerted when metrics move",
    ],
    includes: [
      "Connected data sources",
      "Designed dashboards",
      "Automated refresh",
      "Documentation",
    ],
    clientNeeds: [
      "Access to data sources",
      "The KPIs that matter to you",
      "Reporting cadence",
    ],
    addOns: [
      { name: "Extra data source", price: "+$700" },
      { name: "Automated alerts", price: "+$500" },
      { name: "Forecasting model", price: "Custom" },
    ],
    packages: [
      {
        tier: "Starter",
        name: "Dashboard Starter",
        price: "From $1,500",
        deliveryTime: "1-2 weeks",
        bestFor: "Your first live dashboard",
        includes: ["One dashboard", "One data source", "Key KPIs"],
        revisions: "1 round",
        humanQA: true,
        aiSetup: true,
        integrations: "1 source",
        support: "Email",
      },
      {
        tier: "Growth",
        name: "Intelligence System",
        price: "From $5,000",
        deliveryTime: "3-4 weeks",
        bestFor: "Automated reporting at scale",
        includes: [
          "Multiple sources",
          "Automated reporting",
          "Alerts",
          "Executive view",
        ],
        revisions: "2 rounds",
        humanQA: true,
        aiSetup: true,
        integrations: "Multi-source",
        support: "Priority",
        highlight: true,
      },
      {
        tier: "Scale",
        name: "AI Decision Engine",
        price: "Custom",
        deliveryTime: "Custom timeline",
        bestFor: "Predictive, recommendation-driven decisions",
        includes: [
          "Forecasting",
          "Recommendations",
          "Predictive analytics",
          "Custom models",
        ],
        revisions: "Milestone reviews",
        humanQA: true,
        aiSetup: true,
        integrations: "Custom pipelines",
        support: "Dedicated pod",
      },
    ],
    faq: [
      {
        q: "Which BI tools do you support?",
        a: "Looker, Power BI, Google Sheets, and custom dashboards, depending on your stack.",
      },
      {
        q: "Can you clean messy data first?",
        a: "Yes. Data cleaning and structuring is part of the build when needed.",
      },
    ],
  },
  {
    slug: "ai-strategy-consulting",
    name: "AI Strategy & Consulting",
    icon: Compass,
    shortDescription:
      "Roadmaps, audits, and plans to adopt AI correctly.",
    description:
      "Roadmaps, audits, and implementation plans for companies that want to adopt AI correctly.",
    startingPrice: "From $500",
    deliveryTime: "Audit in days",
    tags: ["Audit", "Roadmap", "Training", "Strategy"],
    services: [
      "AI readiness audit",
      "AI opportunity map",
      "AI transformation roadmap",
      "Vendor/tool evaluation",
      "Automation strategy",
      "Executive workshops",
      "AI policy",
      "Internal training",
    ],
    useCases: [
      "Identify where AI will actually pay off",
      "Build a prioritized adoption roadmap",
      "Evaluate vendors and tools objectively",
      "Upskill your team and leadership",
    ],
    includes: [
      "Current-state review",
      "Prioritized opportunities",
      "Roadmap and recommendations",
      "Executive-ready summary",
    ],
    clientNeeds: [
      "Access to stakeholders for interviews",
      "Overview of current tools and processes",
      "Business goals and constraints",
    ],
    addOns: [
      { name: "Executive workshop", price: "+$1,500" },
      { name: "Team training", price: "Custom" },
      { name: "Vendor evaluation", price: "+$1,000" },
    ],
    packages: [
      {
        tier: "Starter",
        name: "AI Opportunity Audit",
        price: "From $500",
        deliveryTime: "Days",
        bestFor: "A fast, focused starting point",
        includes: [
          "One session",
          "Current-state review",
          "Opportunity list",
        ],
        revisions: "1 round",
        humanQA: true,
        aiSetup: false,
        integrations: "N/A",
        support: "Email",
      },
      {
        tier: "Growth",
        name: "AI Roadmap",
        price: "From $2,500",
        deliveryTime: "1-2 weeks",
        bestFor: "A plan you can execute",
        includes: [
          "Prioritized implementation roadmap",
          "Budget",
          "Timeline",
          "Recommended stack",
        ],
        revisions: "2 rounds",
        humanQA: true,
        aiSetup: false,
        integrations: "Stack recommendations",
        support: "Priority",
        highlight: true,
      },
      {
        tier: "Scale",
        name: "AI Transformation Partner",
        price: "Custom",
        deliveryTime: "Ongoing",
        bestFor: "Hands-on, ongoing partnership",
        includes: [
          "Ongoing strategy",
          "Implementation",
          "Training",
          "Governance",
        ],
        revisions: "Continuous",
        humanQA: true,
        aiSetup: true,
        integrations: "Org-wide",
        support: "Dedicated strategist",
      },
    ],
    faq: [
      {
        q: "Is this just a slide deck?",
        a: "No. Roadmaps are practical and prioritized, with budgets, timelines, and a recommended stack you can act on.",
      },
      {
        q: "Can you also implement?",
        a: "Yes. The Transformation Partner tier moves from strategy into hands-on delivery.",
      },
    ],
  },
  {
    slug: "ai-business-operations",
    name: "AI Business Operations",
    icon: Briefcase,
    shortDescription:
      "Managed AI support for admin, ops, docs, and back-office work.",
    description:
      "Managed AI support for admin, operations, documentation, customer service, and back-office tasks.",
    startingPrice: "From $950",
    deliveryTime: "Cleanup in days",
    tags: ["Ops", "Admin", "Support", "Back office"],
    services: [
      "Virtual AI operations support",
      "Document processing",
      "Proposal generation",
      "Customer support workflows",
      "Inbox automation",
      "SOP creation",
      "CRM cleanup",
      "Admin task automation",
    ],
    useCases: [
      "Clear an operational bottleneck for good",
      "Generate proposals and documents on demand",
      "Automate inbox triage and responses",
      "Keep your CRM clean and current",
    ],
    includes: [
      "Process review",
      "Automation or AI-assisted workflow",
      "Documentation",
      "Ongoing support (recurring tiers)",
    ],
    clientNeeds: [
      "Access to the relevant systems",
      "A description of the bottleneck",
      "Approval contact",
    ],
    addOns: [
      { name: "Extra workflow", price: "+$450" },
      { name: "Dedicated hours", price: "Custom" },
      { name: "Reporting", price: "+$400" },
    ],
    packages: [
      {
        tier: "Starter",
        name: "Ops Cleanup",
        price: "From $950",
        deliveryTime: "Days",
        bestFor: "One bottleneck, fixed",
        includes: ["One operational bottleneck fixed or automated"],
        revisions: "1 round",
        humanQA: true,
        aiSetup: true,
        integrations: "1 system",
        support: "Email",
      },
      {
        tier: "Growth",
        name: "Ops Assistant",
        price: "From $2,500/mo",
        deliveryTime: "Ongoing",
        bestFor: "Recurring operations help",
        includes: ["Recurring AI-assisted operations support"],
        revisions: "Continuous",
        humanQA: true,
        aiSetup: true,
        integrations: "Multi-system",
        support: "Priority",
        highlight: true,
      },
      {
        tier: "Scale",
        name: "Managed AI Back Office",
        price: "Custom",
        deliveryTime: "Ongoing",
        bestFor: "A dedicated operations pod",
        includes: [
          "Dedicated internal pod",
          "Automations",
          "Reporting",
          "Continuous improvement",
        ],
        revisions: "Continuous",
        humanQA: true,
        aiSetup: true,
        integrations: "Org-wide",
        support: "Dedicated pod",
      },
    ],
    faq: [
      {
        q: "Is this a virtual assistant?",
        a: "It's more than that: AI-assisted workflows plus human oversight, managed by TopDoerr as one accountable partner.",
      },
      {
        q: "Can it be recurring?",
        a: "Yes. Ops Assistant and Managed AI Back Office are ongoing monthly engagements.",
      },
    ],
  },
  {
    slug: "ai-security-compliance",
    name: "AI Security, Policy & Compliance",
    icon: ShieldCheck,
    shortDescription:
      "Responsible AI with review, governance, privacy, and risk controls.",
    description:
      "Responsible AI systems with review, governance, privacy, and risk controls.",
    startingPrice: "From $750",
    deliveryTime: "Policy in days",
    tags: ["Policy", "Risk", "Privacy", "Governance"],
    services: [
      "AI usage policy",
      "Prompt risk review",
      "Data privacy review",
      "Internal AI guidelines",
      "Red-team testing",
      "Vendor risk review",
      "Compliance documentation",
      "AI system monitoring",
    ],
    useCases: [
      "Give employees clear, safe AI usage rules",
      "Review workflows for data exposure",
      "Red-team an AI system before launch",
      "Document compliance for stakeholders",
    ],
    includes: [
      "Policy and guidelines",
      "Risk assessment",
      "Recommendations",
      "Monitoring setup (enterprise)",
    ],
    clientNeeds: [
      "Overview of AI tools in use",
      "Data handling details",
      "Compliance requirements",
    ],
    addOns: [
      { name: "Red-team test", price: "+$1,500" },
      { name: "Vendor review", price: "+$1,000" },
      { name: "Monitoring setup", price: "Custom" },
    ],
    packages: [
      {
        tier: "Starter",
        name: "AI Policy Starter",
        price: "From $750",
        deliveryTime: "Days",
        bestFor: "Baseline safe usage",
        includes: ["Basic AI policy", "Employee usage guidelines"],
        revisions: "1 round",
        humanQA: true,
        aiSetup: false,
        integrations: "N/A",
        support: "Email",
      },
      {
        tier: "Growth",
        name: "Risk Review",
        price: "From $2,500",
        deliveryTime: "1-2 weeks",
        bestFor: "Finding and fixing risk points",
        includes: [
          "Review of AI workflow",
          "Data exposure analysis",
          "Risk points",
          "Recommendations",
        ],
        revisions: "2 rounds",
        humanQA: true,
        aiSetup: false,
        integrations: "Workflow review",
        support: "Priority",
        highlight: true,
      },
      {
        tier: "Scale",
        name: "Enterprise AI Governance",
        price: "Custom",
        deliveryTime: "Ongoing",
        bestFor: "Org-wide governance",
        includes: [
          "Policies",
          "Monitoring",
          "Review workflows",
          "Executive reporting",
        ],
        revisions: "Continuous",
        humanQA: true,
        aiSetup: true,
        integrations: "Org-wide",
        support: "Dedicated pod",
      },
    ],
    faq: [
      {
        q: "Do you cover data privacy?",
        a: "Yes. We review data handling and exposure and document privacy controls as part of the engagement.",
      },
      {
        q: "Can you monitor AI systems over time?",
        a: "Enterprise AI Governance includes ongoing monitoring and review workflows.",
      },
    ],
  },
];

export function getVertical(slug: string): Vertical | undefined {
  return verticals.find((v) => v.slug === slug);
}

export const packageTableRows: {
  key: keyof Package | "cta";
  label: string;
}[] = [
  { key: "bestFor", label: "Best for" },
  { key: "price", label: "Starting price" },
  { key: "deliveryTime", label: "Delivery time" },
  { key: "includes", label: "Includes" },
  { key: "revisions", label: "Revisions" },
  { key: "humanQA", label: "Human QA" },
  { key: "aiSetup", label: "AI setup" },
  { key: "integrations", label: "Integrations" },
  { key: "support", label: "Support" },
  { key: "cta", label: "" },
];
