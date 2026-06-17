"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  mockUser,
  mockCompany,
  mockProjects,
  mockMessages,
  mockFiles,
  mockInvoices,
  podTemplates,
} from "./mock-data";
import type {
  User,
  Company,
  Project,
  ProjectMessage,
  ProjectFile,
  Invoice,
  Brief,
  ProjectStatus,
} from "./types";

/* ------------------------------------------------------------------ toasts */

type Toast = { id: string; message: string };

/* ------------------------------------------------------------------- state */

interface AppState {
  user: User | null;
  company: Company | null;
  projects: Project[];
  messages: ProjectMessage[];
  files: ProjectFile[];
  invoices: Invoice[];
}

const defaultState: AppState = {
  user: null,
  company: null,
  projects: mockProjects,
  messages: mockMessages,
  files: mockFiles,
  invoices: mockInvoices,
};

interface SignupInput {
  fullName: string;
  email: string;
  phone?: string;
  companyName: string;
  website?: string;
}

interface AppContextValue extends AppState {
  hydrated: boolean;
  isAuthed: boolean;
  toasts: Toast[];
  toast: (message: string) => void;
  dismissToast: (id: string) => void;
  signup: (input: SignupInput) => void;
  login: (email: string) => void;
  logout: () => void;
  completeOnboarding: (data: Partial<Company>) => void;
  submitBrief: (brief: Brief) => string;
  requestRevision: (projectId: string, what: string, priority: string) => void;
  uploadFile: (projectId: string, file: { name: string; type: string; size: string }) => void;
  sendMessage: (projectId: string, body: string) => void;
  approveProject: (projectId: string) => void;
  getProject: (id: string) => Project | undefined;
}

const AppContext = createContext<AppContextValue | null>(null);

const STORAGE_KEY = "topdoerr.app.v1";

const categoryByType: Record<string, string> = {
  "AI Voice Agent": "AI Voice Agents",
  "AI Automation": "AI Automation",
  "AI Chatbot": "AI Chatbots & Assistants",
  "AI Website or App": "AI Websites & Apps",
  "AI Marketing Campaign": "AI Marketing & Growth",
  "AI Creative Asset": "AI Creative Studio",
  Dashboard: "Data & Dashboards",
  "AI Strategy": "AI Strategy & Consulting",
  "Business Operations": "AI Business Operations",
  "Security / Governance": "AI Security & Compliance",
  "Not sure": "AI Strategy & Consulting",
};

function id(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);
  const [hydrated, setHydrated] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Hydrate persisted state on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<AppState>;
        setState((s) => ({
          ...s,
          user: parsed.user ?? null,
          company: parsed.company ?? null,
          projects: parsed.projects ?? s.projects,
          messages: parsed.messages ?? s.messages,
          files: parsed.files ?? s.files,
          invoices: parsed.invoices ?? s.invoices,
        }));
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  // Persist on change (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, hydrated]);

  const toast = useCallback((message: string) => {
    const t = { id: id("toast"), message };
    setToasts((prev) => [...prev, t]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== t.id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((tid: string) => {
    setToasts((prev) => prev.filter((x) => x.id !== tid));
  }, []);

  const signup = useCallback((input: SignupInput) => {
    const user: User = {
      id: id("usr"),
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      role: "buyer",
      createdAt: new Date().toISOString(),
    };
    const company: Company = {
      id: id("co"),
      userId: user.id,
      name: input.companyName,
      website: input.website,
      tools: [],
      goals: [],
      createdAt: new Date().toISOString(),
    };
    setState((s) => ({ ...s, user, company }));
  }, []);

  const login = useCallback((email: string) => {
    // Placeholder auth: log in as the demo buyer (swap for real auth later).
    setState((s) => ({
      ...s,
      user: { ...mockUser, email: email || mockUser.email },
      company: s.company ?? mockCompany,
    }));
  }, []);

  const logout = useCallback(() => {
    setState((s) => ({ ...s, user: null }));
  }, []);

  const completeOnboarding = useCallback((data: Partial<Company>) => {
    setState((s) => ({
      ...s,
      company: { ...(s.company ?? mockCompany), ...data },
    }));
  }, []);

  const submitBrief = useCallback((brief: Brief) => {
    const projectId = id("prj");
    const category = categoryByType[brief.projectType] ?? "AI Strategy & Consulting";
    const pod =
      podTemplates[brief.projectType] ?? podTemplates.default;
    const project: Project = {
      id: projectId,
      companyId: "co_topdoerr",
      userId: "usr_kevin",
      title: brief.title || "New AI Project",
      category,
      packageName: "Custom Scope",
      status: "Submitted",
      description: brief.problem || brief.desiredOutcome,
      budgetRange: brief.budgetRange,
      timeline: brief.timeline,
      assignedPod: pod,
      progress: 5,
      currentMilestone: "TopDoerr reviewing your brief",
      startDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      dueDate: "Pending",
      milestones: [
        "Brief submitted",
        "Scope confirmed",
        "Pod assigned",
        "Build started",
        "Internal QA",
        "Client review",
        "Revisions",
        "Final delivery",
      ].map((title, i) => ({
        id: `${projectId}_m${i}`,
        projectId,
        title,
        status: i === 0 ? "done" : i === 1 ? "active" : "upcoming",
        owner: "TopDoerr Pod",
      })),
      deliverables: [
        { id: "d1", label: "Strategy brief", done: false },
        { id: "d2", label: "Workflow / solution map", done: false },
        { id: "d3", label: "Prototype", done: false },
        { id: "d4", label: "Integration setup", done: false },
        { id: "d5", label: "QA report", done: false },
        { id: "d6", label: "Final delivery files", done: false },
        { id: "d7", label: "Training notes", done: false },
      ],
      clientActions: [
        { id: "a1", label: "Confirm scope with TopDoerr", done: false },
        { id: "a2", label: "Share relevant access / files", done: false },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const invoice: Invoice = {
      id: id("inv"),
      projectId,
      packageName: "Custom Scope",
      amount: 0,
      status: "draft",
    };
    setState((s) => ({
      ...s,
      projects: [project, ...s.projects],
      invoices: [invoice, ...s.invoices],
    }));
    return projectId;
  }, []);

  const updateProject = useCallback(
    (projectId: string, patch: Partial<Project>) => {
      setState((s) => ({
        ...s,
        projects: s.projects.map((p) =>
          p.id === projectId ? { ...p, ...patch, updatedAt: new Date().toISOString() } : p
        ),
      }));
    },
    []
  );

  const requestRevision = useCallback(
    (projectId: string, what: string, priority: string) => {
      updateProject(projectId, { status: "Revision Requested" as ProjectStatus });
      setState((s) => ({
        ...s,
        messages: [
          ...s.messages,
          {
            id: id("msg"),
            projectId,
            senderType: "buyer",
            senderName: "You",
            body: `Revision requested (${priority}): ${what}`,
            createdAt: new Date().toISOString(),
          },
        ],
      }));
      toast("Revision request sent to TopDoerr.");
    },
    [toast, updateProject]
  );

  const uploadFile = useCallback(
    (projectId: string, file: { name: string; type: string; size: string }) => {
      setState((s) => ({
        ...s,
        files: [
          {
            id: id("f"),
            projectId,
            name: file.name,
            type: file.type,
            size: file.size,
            uploadedBy: "buyer",
            url: "#",
            createdAt: new Date().toISOString(),
          },
          ...s.files,
        ],
      }));
      toast("File uploaded successfully.");
    },
    [toast]
  );

  const sendMessage = useCallback(
    (projectId: string, body: string) => {
      setState((s) => ({
        ...s,
        messages: [
          ...s.messages,
          {
            id: id("msg"),
            projectId,
            senderType: "buyer",
            senderName: "You",
            body,
            createdAt: new Date().toISOString(),
          },
        ],
      }));
    },
    []
  );

  const approveProject = useCallback(
    (projectId: string) => {
      updateProject(projectId, { status: "Completed" as ProjectStatus, progress: 100 });
      toast("Project approved. Thank you!");
    },
    [toast, updateProject]
  );

  const getProject = useCallback(
    (pid: string) => state.projects.find((p) => p.id === pid),
    [state.projects]
  );

  const value = useMemo<AppContextValue>(
    () => ({
      ...state,
      hydrated,
      isAuthed: !!state.user,
      toasts,
      toast,
      dismissToast,
      signup,
      login,
      logout,
      completeOnboarding,
      submitBrief,
      requestRevision,
      uploadFile,
      sendMessage,
      approveProject,
      getProject,
    }),
    [
      state,
      hydrated,
      toasts,
      toast,
      dismissToast,
      signup,
      login,
      logout,
      completeOnboarding,
      submitBrief,
      requestRevision,
      uploadFile,
      sendMessage,
      approveProject,
      getProject,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
