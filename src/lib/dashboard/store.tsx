"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
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
import {
  getSupabaseBrowser,
  isSupabaseConfigured,
} from "@/lib/supabase/client";
import * as db from "./db";
import type { User as SupabaseUser } from "@supabase/supabase-js";

function uuid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id_${Math.random().toString(36).slice(2, 11)}`;
}

function mapSupabaseUser(u: SupabaseUser): User {
  const meta = (u.user_metadata ?? {}) as Record<string, string>;
  return {
    id: u.id,
    fullName: meta.full_name || u.email?.split("@")[0] || "User",
    email: u.email ?? "",
    phone: meta.phone,
    role: "buyer",
    createdAt: u.created_at ?? new Date().toISOString(),
  };
}

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
  password: string;
}

type AuthResult = { error?: string };

interface AppContextValue extends AppState {
  hydrated: boolean;
  isAuthed: boolean;
  toasts: Toast[];
  toast: (message: string) => void;
  dismissToast: (id: string) => void;
  authMode: "supabase" | "local";
  signup: (input: SignupInput) => Promise<AuthResult>;
  login: (email: string, password: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
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

  // Latest user id, for DB writes inside stable callbacks.
  const userIdRef = useRef<string | null>(null);
  useEffect(() => {
    userIdRef.current = state.user?.id ?? null;
  }, [state.user?.id]);

  // Hydrate state on mount + sync auth
  useEffect(() => {
    if (isSupabaseConfigured) {
      // Supabase is the source of truth: no mock data for real users.
      const supabase = getSupabaseBrowser();
      if (!supabase) {
        setHydrated(true);
        return;
      }
      setState((s) => ({
        ...s,
        projects: [],
        messages: [],
        files: [],
        invoices: [],
        company: null,
      }));

      const loadFor = async (session: { user: SupabaseUser } | null) => {
        if (session) {
          setState((s) => ({ ...s, user: mapSupabaseUser(session.user) }));
          const data = await db.loadUserData();
          if (data) {
            setState((s) => ({
              ...s,
              company: data.company,
              projects: data.projects,
              messages: data.messages,
              files: data.files,
              invoices: data.invoices,
            }));
          }
        } else {
          setState((s) => ({
            ...s,
            user: null,
            company: null,
            projects: [],
            messages: [],
            files: [],
            invoices: [],
          }));
        }
      };

      supabase.auth.getSession().then(async ({ data }) => {
        await loadFor(data.session);
        setHydrated(true);
      });
      const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
        void loadFor(session);
      });
      return () => sub.subscription.unsubscribe();
    }

    // Local fallback: restore from localStorage (mock seed).
    let parsed: Partial<AppState> | null = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) parsed = JSON.parse(raw) as Partial<AppState>;
    } catch {
      /* ignore */
    }
    setState((s) => ({
      ...s,
      user: parsed?.user ?? null,
      company: parsed?.company ?? null,
      projects: parsed?.projects ?? s.projects,
      messages: parsed?.messages ?? s.messages,
      files: parsed?.files ?? s.files,
      invoices: parsed?.invoices ?? s.invoices,
    }));
    setHydrated(true);
  }, []);

  // Persist on change (local fallback only; Supabase is the source of truth).
  useEffect(() => {
    if (!hydrated || isSupabaseConfigured) return;
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

  const signup = useCallback(
    async (input: SignupInput): Promise<AuthResult> => {
      const company: Company = {
        id: id("co"),
        userId: "pending",
        name: input.companyName,
        website: input.website,
        tools: [],
        goals: [],
        createdAt: new Date().toISOString(),
      };

      if (isSupabaseConfigured) {
        const supabase = getSupabaseBrowser();
        if (!supabase) return { error: "Auth is not available." };
        const { data, error } = await supabase.auth.signUp({
          email: input.email,
          password: input.password,
          options: {
            data: {
              full_name: input.fullName,
              phone: input.phone ?? "",
              company_name: input.companyName,
              website: input.website ?? "",
            },
          },
        });
        if (error) return { error: error.message };
        setState((s) => ({
          ...s,
          company,
          user: data.user ? mapSupabaseUser(data.user) : s.user,
        }));
        return {};
      }

      // Local placeholder auth.
      const user: User = {
        id: id("usr"),
        fullName: input.fullName,
        email: input.email,
        phone: input.phone,
        role: "buyer",
        createdAt: new Date().toISOString(),
      };
      setState((s) => ({ ...s, user, company: { ...company, userId: user.id } }));
      return {};
    },
    []
  );

  const login = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      if (isSupabaseConfigured) {
        const supabase = getSupabaseBrowser();
        if (!supabase) return { error: "Auth is not available." };
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) return { error: error.message };
        // user is set by the onAuthStateChange listener
        return {};
      }
      // Local placeholder auth.
      setState((s) => ({
        ...s,
        user: { ...mockUser, email: email || mockUser.email },
        company: s.company ?? mockCompany,
      }));
      return {};
    },
    []
  );

  const logout = useCallback(async () => {
    if (isSupabaseConfigured) {
      await getSupabaseBrowser()?.auth.signOut();
    }
    setState((s) => ({ ...s, user: null }));
  }, []);

  const completeOnboarding = useCallback((data: Partial<Company>) => {
    setState((s) => ({
      ...s,
      company: { ...(s.company ?? mockCompany), ...data },
    }));
    const uid = userIdRef.current;
    if (isSupabaseConfigured && uid) {
      const company: Company = {
        id: uuid(),
        userId: uid,
        name: data.name ?? "",
        website: data.website,
        industry: data.industry,
        size: data.size,
        location: data.location,
        tools: data.tools ?? [],
        goals: data.goals ?? [],
        createdAt: new Date().toISOString(),
      };
      db.upsertCompany(company, uid)
        .then((saved) => {
          if (saved) setState((s) => ({ ...s, company: saved }));
        })
        .catch(() => {});
    }
  }, []);

  const submitBrief = useCallback((brief: Brief) => {
    const uid = userIdRef.current;
    const projectId = uuid();
    const category = categoryByType[brief.projectType] ?? "AI Strategy & Consulting";
    const pod =
      podTemplates[brief.projectType] ?? podTemplates.default;
    const project: Project = {
      id: projectId,
      companyId: "",
      userId: uid ?? "usr_kevin",
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
      id: uuid(),
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
    if (isSupabaseConfigured && uid) {
      db.insertProject(project, uid).catch(() => {});
      db.insertBrief({ ...brief, projectId }, uid, projectId).catch(() => {});
      db.insertInvoice(invoice, uid).catch(() => {});
    }
    return projectId;
  }, []);

  const requestRevision = useCallback(
    (projectId: string, what: string, priority: string) => {
      const uid = userIdRef.current;
      const msg: ProjectMessage = {
        id: uuid(),
        projectId,
        senderType: "buyer",
        senderName: "You",
        body: `Revision requested (${priority}): ${what}`,
        createdAt: new Date().toISOString(),
      };
      setState((s) => ({
        ...s,
        projects: s.projects.map((p) =>
          p.id === projectId
            ? { ...p, status: "Revision Requested" as ProjectStatus, updatedAt: new Date().toISOString() }
            : p
        ),
        messages: [...s.messages, msg],
      }));
      if (isSupabaseConfigured && uid) {
        db.updateProjectRow(projectId, { status: "Revision Requested" }).catch(() => {});
        db.insertMessage(msg, uid).catch(() => {});
      }
      toast("Revision request sent to TopDoerr.");
    },
    [toast]
  );

  const uploadFile = useCallback(
    (projectId: string, file: { name: string; type: string; size: string }) => {
      const uid = userIdRef.current;
      const f: ProjectFile = {
        id: uuid(),
        projectId,
        name: file.name,
        type: file.type,
        size: file.size,
        uploadedBy: "buyer",
        url: "#",
        createdAt: new Date().toISOString(),
      };
      setState((s) => ({ ...s, files: [f, ...s.files] }));
      if (isSupabaseConfigured && uid) db.insertFile(f, uid).catch(() => {});
      toast("File uploaded successfully.");
    },
    [toast]
  );

  const sendMessage = useCallback(
    (projectId: string, body: string) => {
      const uid = userIdRef.current;
      const msg: ProjectMessage = {
        id: uuid(),
        projectId,
        senderType: "buyer",
        senderName: "You",
        body,
        createdAt: new Date().toISOString(),
      };
      setState((s) => ({ ...s, messages: [...s.messages, msg] }));
      if (isSupabaseConfigured && uid) db.insertMessage(msg, uid).catch(() => {});
    },
    []
  );

  const approveProject = useCallback(
    (projectId: string) => {
      const uid = userIdRef.current;
      setState((s) => ({
        ...s,
        projects: s.projects.map((p) =>
          p.id === projectId
            ? { ...p, status: "Completed" as ProjectStatus, progress: 100, updatedAt: new Date().toISOString() }
            : p
        ),
      }));
      if (isSupabaseConfigured && uid) {
        db.updateProjectRow(projectId, { status: "Completed", progress: 100 }).catch(() => {});
      }
      toast("Project approved. Thank you!");
    },
    [toast]
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
      authMode: isSupabaseConfigured ? "supabase" : "local",
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
