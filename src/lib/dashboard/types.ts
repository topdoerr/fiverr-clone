export type UserRole = "buyer" | "admin" | "internal";

export type ProjectStatus =
  | "Draft Brief"
  | "Submitted"
  | "Scoping"
  | "Waiting for Payment"
  | "Assigned"
  | "Building"
  | "In QA Review"
  | "Awaiting Client"
  | "Revision Requested"
  | "Delivered"
  | "Completed"
  | "Paused"
  | "Cancelled";

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: UserRole;
  createdAt: string;
}

export interface Company {
  id: string;
  userId: string;
  name: string;
  website?: string;
  industry?: string;
  size?: string;
  location?: string;
  tools: string[];
  goals: string[];
  createdAt: string;
}

export interface PodMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  internalOnly: true;
}

export interface Milestone {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: "done" | "active" | "upcoming";
  owner?: string;
  dueDate?: string;
  completedAt?: string;
}

export interface Deliverable {
  id: string;
  label: string;
  done: boolean;
}

export interface ClientAction {
  id: string;
  label: string;
  done: boolean;
}

export interface ProjectMessage {
  id: string;
  projectId: string;
  senderType: "buyer" | "topdoerr";
  senderName: string;
  body: string;
  createdAt: string;
}

export interface ProjectFile {
  id: string;
  projectId: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: "buyer" | "topdoerr";
  url: string;
  createdAt: string;
}

export interface Invoice {
  id: string;
  projectId: string;
  packageName: string;
  amount: number;
  status: "draft" | "sent" | "paid" | "overdue";
  dueDate?: string;
  paidAt?: string;
}

export interface Project {
  id: string;
  companyId: string;
  userId: string;
  title: string;
  category: string;
  packageName: string;
  status: ProjectStatus;
  description: string;
  budgetRange: string;
  timeline: string;
  assignedPod: PodMember[];
  progress: number;
  currentMilestone: string;
  startDate?: string;
  dueDate: string;
  milestones: Milestone[];
  deliverables: Deliverable[];
  clientActions: ClientAction[];
  createdAt: string;
  updatedAt: string;
}

export interface Brief {
  id: string;
  projectId?: string;
  userId: string;
  projectType: string;
  title: string;
  problem: string;
  desiredOutcome: string;
  audience: string;
  currentProcess: string;
  tools: string[];
  files: string[];
  budgetRange: string;
  timeline: string;
  status: "draft" | "submitted" | "reviewed";
  createdAt: string;
}

export interface RecommendedService {
  id: string;
  name: string;
  description: string;
  startingPrice: string;
  timeline: string;
  slug: string;
}
