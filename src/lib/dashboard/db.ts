import { getSupabaseBrowser } from "@/lib/supabase/client";
import type {
  Company,
  Project,
  ProjectMessage,
  ProjectFile,
  Invoice,
  Brief,
} from "./types";

/* ------------------------------------------------------------ row mappers */

// eslint-disable-next-line
type Row = Record<string, any>;

function rowToProject(r: Row): Project {
  return {
    id: r.id,
    companyId: r.company_id ?? "",
    userId: r.user_id,
    title: r.title,
    category: r.category ?? "",
    packageName: r.package_name ?? "",
    status: r.status,
    description: r.description ?? "",
    budgetRange: r.budget_range ?? "",
    timeline: r.timeline ?? "",
    assignedPod: r.assigned_pod ?? [],
    progress: r.progress ?? 0,
    currentMilestone: r.current_milestone ?? "",
    startDate: r.start_date ?? undefined,
    dueDate: r.due_date ?? "Pending",
    milestones: r.milestones ?? [],
    deliverables: r.deliverables ?? [],
    clientActions: r.client_actions ?? [],
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
}

function projectToRow(p: Project, userId: string) {
  return {
    id: p.id,
    user_id: userId,
    title: p.title,
    category: p.category,
    package_name: p.packageName,
    status: p.status,
    description: p.description,
    budget_range: p.budgetRange,
    timeline: p.timeline,
    assigned_pod: p.assignedPod,
    progress: p.progress,
    current_milestone: p.currentMilestone,
    start_date: p.startDate,
    due_date: p.dueDate,
    milestones: p.milestones,
    deliverables: p.deliverables,
    client_actions: p.clientActions,
  };
}

function rowToMessage(r: Row): ProjectMessage {
  return {
    id: r.id,
    projectId: r.project_id,
    senderType: r.sender_type,
    senderName: r.sender_name ?? "",
    body: r.body,
    createdAt: r.created_at,
  };
}

function rowToFile(r: Row): ProjectFile {
  return {
    id: r.id,
    projectId: r.project_id,
    name: r.name,
    type: r.type ?? "FILE",
    size: r.size ?? "—",
    uploadedBy: r.uploaded_by ?? "buyer",
    url: r.url ?? "#",
    createdAt: r.created_at,
  };
}

function rowToInvoice(r: Row): Invoice {
  return {
    id: r.id,
    projectId: r.project_id,
    packageName: r.package_name ?? "",
    amount: Number(r.amount ?? 0),
    status: r.status,
    dueDate: r.due_date ?? undefined,
    paidAt: r.paid_at ?? undefined,
  };
}

function rowToCompany(r: Row): Company {
  return {
    id: r.id,
    userId: r.user_id,
    name: r.name,
    website: r.website ?? undefined,
    industry: r.industry ?? undefined,
    size: r.size ?? undefined,
    location: r.location ?? undefined,
    tools: r.tools ?? [],
    goals: r.goals ?? [],
    createdAt: r.created_at,
  };
}

/* --------------------------------------------------------------- queries */

export interface UserData {
  company: Company | null;
  projects: Project[];
  messages: ProjectMessage[];
  files: ProjectFile[];
  invoices: Invoice[];
}

export async function loadUserData(): Promise<UserData | null> {
  const supabase = getSupabaseBrowser();
  if (!supabase) return null;

  const [companyRes, projectsRes, messagesRes, filesRes, invoicesRes] =
    await Promise.all([
      supabase.from("companies").select("*").limit(1).maybeSingle(),
      supabase.from("projects").select("*").order("created_at", { ascending: false }),
      supabase.from("messages").select("*").order("created_at", { ascending: true }),
      supabase.from("files").select("*").order("created_at", { ascending: false }),
      supabase.from("invoices").select("*").order("created_at", { ascending: false }),
    ]);

  return {
    company: companyRes.data ? rowToCompany(companyRes.data) : null,
    projects: (projectsRes.data ?? []).map(rowToProject),
    messages: (messagesRes.data ?? []).map(rowToMessage),
    files: (filesRes.data ?? []).map(rowToFile),
    invoices: (invoicesRes.data ?? []).map(rowToInvoice),
  };
}

export async function upsertCompany(
  company: Company,
  userId: string
): Promise<Company | null> {
  const supabase = getSupabaseBrowser();
  if (!supabase) return null;
  const payload = {
    user_id: userId,
    name: company.name,
    website: company.website,
    industry: company.industry,
    size: company.size,
    location: company.location,
    tools: company.tools,
    goals: company.goals,
  };
  // One company per user: update if exists, else insert.
  const existing = await supabase
    .from("companies")
    .select("id")
    .limit(1)
    .maybeSingle();
  if (existing.data?.id) {
    const { data } = await supabase
      .from("companies")
      .update(payload)
      .eq("id", existing.data.id)
      .select()
      .maybeSingle();
    return data ? rowToCompany(data) : null;
  }
  const { data } = await supabase
    .from("companies")
    .insert(payload)
    .select()
    .maybeSingle();
  return data ? rowToCompany(data) : null;
}

export async function insertProject(p: Project, userId: string) {
  const supabase = getSupabaseBrowser();
  if (!supabase) return;
  return supabase.from("projects").insert(projectToRow(p, userId));
}

export async function insertBrief(b: Brief, userId: string, projectId: string) {
  const supabase = getSupabaseBrowser();
  if (!supabase) return;
  return supabase.from("briefs").insert({
    user_id: userId,
    project_id: projectId,
    project_type: b.projectType,
    title: b.title,
    problem: b.problem,
    desired_outcome: b.desiredOutcome,
    audience: b.audience,
    current_process: b.currentProcess,
    tools: b.tools,
    files: b.files,
    budget_range: b.budgetRange,
    timeline: b.timeline,
    status: b.status,
  });
}

export async function insertInvoice(inv: Invoice, userId: string) {
  const supabase = getSupabaseBrowser();
  if (!supabase) return;
  return supabase.from("invoices").insert({
    id: inv.id,
    user_id: userId,
    project_id: inv.projectId,
    package_name: inv.packageName,
    amount: inv.amount,
    status: inv.status,
    due_date: inv.dueDate,
    paid_at: inv.paidAt,
  });
}

export async function updateProjectRow(
  projectId: string,
  patch: Partial<Project>
) {
  const supabase = getSupabaseBrowser();
  if (!supabase) return;
  const row: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (patch.status !== undefined) row.status = patch.status;
  if (patch.progress !== undefined) row.progress = patch.progress;
  if (patch.currentMilestone !== undefined)
    row.current_milestone = patch.currentMilestone;
  return supabase.from("projects").update(row).eq("id", projectId);
}

export async function insertMessage(m: ProjectMessage, userId: string) {
  const supabase = getSupabaseBrowser();
  if (!supabase) return;
  return supabase.from("messages").insert({
    id: m.id,
    user_id: userId,
    project_id: m.projectId,
    sender_type: m.senderType,
    sender_name: m.senderName,
    body: m.body,
  });
}

export async function insertFile(f: ProjectFile, userId: string) {
  const supabase = getSupabaseBrowser();
  if (!supabase) return;
  return supabase.from("files").insert({
    id: f.id,
    user_id: userId,
    project_id: f.projectId,
    name: f.name,
    type: f.type,
    size: f.size,
    uploaded_by: f.uploadedBy,
    url: f.url,
  });
}
