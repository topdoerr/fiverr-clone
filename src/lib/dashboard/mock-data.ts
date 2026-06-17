import type {
  User,
  Company,
  Project,
  ProjectMessage,
  ProjectFile,
  Invoice,
  RecommendedService,
  Milestone,
  PodMember,
} from "./types";

export const mockUser: User = {
  id: "usr_kevin",
  fullName: "Kevin Velazquez",
  email: "kevin@topdoerr.com",
  phone: "+1 (787) 555-0142",
  role: "buyer",
  createdAt: "2026-05-01T09:00:00Z",
};

export const mockCompany: Company = {
  id: "co_topdoerr",
  userId: "usr_kevin",
  name: "TopDoerr",
  website: "https://topdoerr.com",
  industry: "Professional Services",
  size: "11-50",
  location: "San Juan, Puerto Rico",
  tools: ["HubSpot", "Google Workspace", "Slack", "WhatsApp"],
  goals: ["Answer calls", "Automate workflows", "Build dashboards"],
  createdAt: "2026-05-01T09:00:00Z",
};

function milestones(
  projectId: string,
  activeIndex: number
): Milestone[] {
  const titles = [
    "Brief submitted",
    "Scope confirmed",
    "Pod assigned",
    "Build started",
    "Internal QA",
    "Client review",
    "Revisions",
    "Final delivery",
  ];
  return titles.map((title, i) => ({
    id: `${projectId}_m${i}`,
    projectId,
    title,
    description: undefined,
    status: i < activeIndex ? "done" : i === activeIndex ? "active" : "upcoming",
    owner: i >= 4 ? "TopDoerr QA" : "TopDoerr Pod",
    dueDate: undefined,
  }));
}

const voicePod: PodMember[] = [
  { id: "p1", name: "Marisol Rivera", role: "Project Manager", initials: "MR", internalOnly: true },
  { id: "p2", name: "Lucas Vega", role: "Voice AI Specialist", initials: "LV", internalOnly: true },
  { id: "p3", name: "Sofía León", role: "Conversation Designer", initials: "SL", internalOnly: true },
  { id: "p4", name: "Tomás Rey", role: "QA Reviewer", initials: "TR", internalOnly: true },
];

const automationPod: PodMember[] = [
  { id: "p1", name: "Marisol Rivera", role: "Project Manager", initials: "MR", internalOnly: true },
  { id: "p5", name: "Daniel Ortiz", role: "Automation Specialist", initials: "DO", internalOnly: true },
  { id: "p6", name: "Ana Ruiz", role: "AI Strategist", initials: "AR", internalOnly: true },
  { id: "p4", name: "Tomás Rey", role: "QA Reviewer", initials: "TR", internalOnly: true },
];

const dataPod: PodMember[] = [
  { id: "p1", name: "Marisol Rivera", role: "Project Manager", initials: "MR", internalOnly: true },
  { id: "p7", name: "Marco Díaz", role: "Data Specialist", initials: "MD", internalOnly: true },
  { id: "p8", name: "Priya Nair", role: "AI Engineer", initials: "PN", internalOnly: true },
  { id: "p4", name: "Tomás Rey", role: "QA Reviewer", initials: "TR", internalOnly: true },
];

export const mockProjects: Project[] = [
  {
    id: "prj_voice",
    companyId: "co_topdoerr",
    userId: "usr_kevin",
    title: "AI Voice Agent for Appointment Calls",
    category: "AI Voice Agents",
    packageName: "Voice Agent Launch",
    status: "In QA Review",
    description:
      "A Spanish-first AI voice agent that answers inbound calls, qualifies leads, and books appointments directly into the calendar.",
    budgetRange: "$3,000 - $10,000",
    timeline: "1-2 weeks",
    assignedPod: voicePod,
    progress: 75,
    currentMilestone: "Call flow testing",
    startDate: "Jun 6, 2026",
    dueDate: "Friday",
    milestones: milestones("prj_voice", 4),
    deliverables: [
      { id: "d1", label: "Strategy brief", done: true },
      { id: "d2", label: "Call flow map", done: true },
      { id: "d3", label: "Prototype agent", done: true },
      { id: "d4", label: "Integration setup", done: false },
      { id: "d5", label: "QA report", done: false },
      { id: "d6", label: "Final delivery files", done: false },
      { id: "d7", label: "Training notes", done: false },
    ],
    clientActions: [
      { id: "a1", label: "Upload current call script", done: true },
      { id: "a2", label: "Add CRM access details", done: false },
      { id: "a3", label: "Confirm brand voice", done: false },
      { id: "a4", label: "Review first version", done: false },
    ],
    createdAt: "2026-06-06T09:00:00Z",
    updatedAt: "2026-06-16T09:00:00Z",
  },
  {
    id: "prj_crm",
    companyId: "co_topdoerr",
    userId: "usr_kevin",
    title: "CRM Automation for Sales Follow-Up",
    category: "AI Automation",
    packageName: "Growth Automation",
    status: "Building",
    description:
      "Automated sales follow-up across HubSpot — lead routing, sequenced reminders, and synced activity logging.",
    budgetRange: "$1,000 - $3,000",
    timeline: "1-2 weeks",
    assignedPod: automationPod,
    progress: 45,
    currentMilestone: "HubSpot workflow setup",
    startDate: "Jun 10, 2026",
    dueDate: "Next Wednesday",
    milestones: milestones("prj_crm", 3),
    deliverables: [
      { id: "d1", label: "Strategy brief", done: true },
      { id: "d2", label: "Workflow map", done: true },
      { id: "d3", label: "Prototype", done: false },
      { id: "d4", label: "Integration setup", done: false },
      { id: "d5", label: "QA report", done: false },
      { id: "d6", label: "Final delivery files", done: false },
      { id: "d7", label: "Training notes", done: false },
    ],
    clientActions: [
      { id: "a1", label: "Confirm CRM access", done: false },
      { id: "a2", label: "Approve follow-up copy", done: false },
    ],
    createdAt: "2026-06-10T09:00:00Z",
    updatedAt: "2026-06-15T09:00:00Z",
  },
  {
    id: "prj_dashboard",
    companyId: "co_topdoerr",
    userId: "usr_kevin",
    title: "Executive KPI Dashboard",
    category: "Data & Dashboards",
    packageName: "Dashboard Starter",
    status: "Awaiting Client",
    description:
      "A live executive dashboard consolidating sales, operations, and finance KPIs into one source of truth.",
    budgetRange: "$1,000 - $3,000",
    timeline: "This month",
    assignedPod: dataPod,
    progress: 20,
    currentMilestone: "Waiting for source data",
    startDate: "Jun 12, 2026",
    dueDate: "Pending",
    milestones: milestones("prj_dashboard", 2),
    deliverables: [
      { id: "d1", label: "Strategy brief", done: true },
      { id: "d2", label: "Data source map", done: false },
      { id: "d3", label: "Dashboard prototype", done: false },
      { id: "d4", label: "Integration setup", done: false },
      { id: "d5", label: "QA report", done: false },
      { id: "d6", label: "Final delivery files", done: false },
      { id: "d7", label: "Training notes", done: false },
    ],
    clientActions: [
      { id: "a1", label: "Upload source data", done: false },
      { id: "a2", label: "Confirm KPI list", done: false },
    ],
    createdAt: "2026-06-12T09:00:00Z",
    updatedAt: "2026-06-14T09:00:00Z",
  },
];

export const mockMessages: ProjectMessage[] = [
  {
    id: "msg1",
    projectId: "prj_voice",
    senderType: "topdoerr",
    senderName: "Marisol Rivera · Project Manager",
    body: "We reviewed your call flow and are preparing the first AI voice agent test. We'll share a test number shortly.",
    createdAt: "2026-06-16T14:20:00Z",
  },
  {
    id: "msg2",
    projectId: "prj_voice",
    senderType: "buyer",
    senderName: "Kevin Velazquez",
    body: "Great — looking forward to testing it. Let me know if you need anything from our side.",
    createdAt: "2026-06-16T15:05:00Z",
  },
  {
    id: "msg3",
    projectId: "prj_crm",
    senderType: "topdoerr",
    senderName: "Daniel Ortiz · Automation Specialist",
    body: "Building out the HubSpot workflow now. Could you confirm CRM access so we can connect the sequences?",
    createdAt: "2026-06-15T11:00:00Z",
  },
];

export const mockFiles: ProjectFile[] = [
  {
    id: "f1",
    projectId: "prj_voice",
    name: "current-call-script.pdf",
    type: "PDF",
    size: "240 KB",
    uploadedBy: "buyer",
    url: "#",
    createdAt: "2026-06-07T10:00:00Z",
  },
  {
    id: "f2",
    projectId: "prj_voice",
    name: "voice-agent-flow-v1.pdf",
    type: "PDF",
    size: "1.2 MB",
    uploadedBy: "topdoerr",
    url: "#",
    createdAt: "2026-06-14T16:00:00Z",
  },
  {
    id: "f3",
    projectId: "prj_crm",
    name: "sales-process-notes.docx",
    type: "DOCX",
    size: "88 KB",
    uploadedBy: "buyer",
    url: "#",
    createdAt: "2026-06-11T09:30:00Z",
  },
];

export const mockInvoices: Invoice[] = [
  {
    id: "inv1",
    projectId: "prj_voice",
    packageName: "Voice Agent Launch",
    amount: 7500,
    status: "paid",
    paidAt: "2026-06-06T09:00:00Z",
  },
  {
    id: "inv2",
    projectId: "prj_crm",
    packageName: "Growth Automation",
    amount: 3500,
    status: "paid",
    paidAt: "2026-06-10T09:00:00Z",
  },
  {
    id: "inv3",
    projectId: "prj_dashboard",
    packageName: "Dashboard Starter",
    amount: 1500,
    status: "sent",
    dueDate: "Jun 20, 2026",
  },
];

export const recommendedServices: RecommendedService[] = [
  {
    id: "rs1",
    name: "AI Voice Agent Pilot",
    description: "Test a single call flow with one production-style voice agent.",
    startingPrice: "From $2,500",
    timeline: "7-14 days",
    slug: "ai-voice-agents",
  },
  {
    id: "rs2",
    name: "AI Automation Sprint",
    description: "Automate a connected set of workflows across your tools.",
    startingPrice: "From $3,500",
    timeline: "7-14 days",
    slug: "ai-automation",
  },
  {
    id: "rs3",
    name: "AI Chatbot Starter",
    description: "A chatbot trained on your FAQs and documents, embedded on your site.",
    startingPrice: "From $1,500",
    timeline: "5-10 days",
    slug: "ai-chatbots",
  },
  {
    id: "rs4",
    name: "AI Dashboard Starter",
    description: "One live dashboard wired to your key data source and KPIs.",
    startingPrice: "From $1,500",
    timeline: "1-2 weeks",
    slug: "data-intelligence",
  },
  {
    id: "rs5",
    name: "AI Strategy Roadmap",
    description: "A prioritized AI adoption roadmap with budget and timeline.",
    startingPrice: "From $2,500",
    timeline: "1-2 weeks",
    slug: "ai-strategy-consulting",
  },
];

export const onboardingOptions = {
  industries: [
    "Healthcare",
    "Real Estate",
    "Retail",
    "Logistics",
    "Professional Services",
    "Entertainment",
    "Education",
    "Government",
    "Finance",
    "Other",
  ],
  companySizes: ["1-10", "11-50", "51-200", "201-500", "500+"],
  goals: [
    "Answer calls",
    "Automate workflows",
    "Build a chatbot",
    "Build an AI website or app",
    "Create marketing content",
    "Build dashboards",
    "Improve sales",
    "Improve customer support",
    "Create AI videos or ads",
    "Build an internal assistant",
    "Not sure yet",
  ],
  tools: [
    "Google Workspace",
    "Microsoft 365",
    "HubSpot",
    "Salesforce",
    "Slack",
    "Zoom",
    "WhatsApp",
    "Shopify",
    "WordPress",
    "Airtable",
    "Notion",
    "Excel / Google Sheets",
    "Other",
  ],
  budgets: [
    "Under $1,000",
    "$1,000 - $3,000",
    "$3,000 - $10,000",
    "$10,000+",
    "Not sure",
  ],
  urgency: ["ASAP", "This week", "This month", "Exploring"],
};

export const briefOptions = {
  projectTypes: [
    "AI Voice Agent",
    "AI Automation",
    "AI Chatbot",
    "AI Website or App",
    "AI Marketing Campaign",
    "AI Creative Asset",
    "Dashboard",
    "AI Strategy",
    "Business Operations",
    "Security / Governance",
    "Not sure",
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
    "Excel / Sheets",
    "Custom API",
    "Other",
  ],
  budgets: [
    "Under $1,000",
    "$1,000 - $3,000",
    "$3,000 - $10,000",
    "$10,000+",
    "Not sure",
  ],
  timelines: ["ASAP", "3-5 days", "1-2 weeks", "This month", "Flexible"],
};

/** Pod templates by project type (internal roles only — never freelancers). */
export const podTemplates: Record<string, PodMember[]> = {
  "AI Voice Agent": voicePod,
  "AI Automation": automationPod,
  Dashboard: dataPod,
  default: [
    { id: "p1", name: "Marisol Rivera", role: "Project Manager", initials: "MR", internalOnly: true },
    { id: "p6", name: "Ana Ruiz", role: "AI Strategist", initials: "AR", internalOnly: true },
    { id: "p5", name: "Daniel Ortiz", role: "Automation Specialist", initials: "DO", internalOnly: true },
    { id: "p4", name: "Tomás Rey", role: "QA Reviewer", initials: "TR", internalOnly: true },
  ],
};
