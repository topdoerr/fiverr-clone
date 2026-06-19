"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/dashboard/primitives";
import { FileUploadModal } from "@/components/dashboard/modals";
import { useApp } from "@/lib/dashboard/store";
import { useT } from "@/lib/i18n/client";

export default function FilesPage() {
  const { files, projects } = useApp();
  const t = useT();
  const [selectedId, setSelectedId] = useState(projects[0]?.id ?? "");
  const [uploadOpen, setUploadOpen] = useState(false);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-forest">
            {t("Files")}
          </h1>
          <p className="mt-2 text-sm text-forest/60">
            {t("Files you've shared and deliverables from TopDoerr.")}
          </p>
        </div>
        {projects.length > 0 && (
          <div className="flex shrink-0 items-center gap-2">
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="h-10 rounded-full border border-forest/15 bg-white px-4 text-sm text-forest focus:border-cobalt/40 focus:outline-none"
              aria-label="Select project"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
            <Button variant="lime" onClick={() => setUploadOpen(true)}>
              {t("Upload File")}
            </Button>
          </div>
        )}
      </div>

      {files.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No files yet."
          description="Start a project and share files with your TopDoerr pod — deliverables will show up here too."
        />
      ) : (
        <div className="space-y-3">
          {files.map((f) => {
            const projectTitle = projects.find((p) => p.id === f.projectId)?.title;
            const mine = f.uploadedBy === "buyer";
            return (
              <div
                key={f.id}
                className="flex flex-col gap-3 rounded-2xl border border-forest/10 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-cream text-forest">
                    <FileText className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-forest">{f.name}</p>
                    {projectTitle && (
                      <p className="text-xs text-forest/55">{projectTitle}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-forest/60 sm:justify-end">
                  <span className="inline-flex items-center rounded-full border border-forest/10 bg-forest/5 px-2 py-0.5 font-medium text-forest/60">
                    {f.type}
                  </span>
                  <span>{f.size}</span>
                  <span className="inline-flex items-center rounded-full border border-cobalt/20 bg-cobalt/10 px-2 py-0.5 font-medium text-cobalt">
                    {mine ? t("You") : "TopDoerr"}
                  </span>
                  <span>{new Date(f.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {uploadOpen && (
        <FileUploadModal
          open
          onClose={() => setUploadOpen(false)}
          projectId={selectedId}
        />
      )}
    </div>
  );
}
