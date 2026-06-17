"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { EmptyState } from "@/components/dashboard/primitives";
import { MessageThread } from "@/components/dashboard/message-thread";
import { useApp } from "@/lib/dashboard/store";
import { cn } from "@/lib/utils";

export default function MessagesPage() {
  const { projects, messages } = useApp();
  const [selectedProjectId, setSelectedProjectId] = useState(
    projects[0]?.id ?? ""
  );

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-forest">
          Messages
        </h1>
        <p className="mt-2 text-sm text-forest/60">
          Talk to your TopDoerr delivery pod.
        </p>
      </div>

      {projects.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="No conversations yet."
          description="Start a project and you'll be able to message your TopDoerr delivery pod here."
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="space-y-2">
            {projects.map((p) => {
              const projectMessages = messages.filter(
                (m) => m.projectId === p.id
              );
              const last = projectMessages[projectMessages.length - 1];
              const selected = p.id === selectedProjectId;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedProjectId(p.id)}
                  className={cn(
                    "w-full rounded-2xl border p-4 text-left transition-colors",
                    selected
                      ? "border-lime-dim bg-lime/25 text-forest"
                      : "border-forest/10 bg-white text-forest hover:border-forest/20"
                  )}
                >
                  <p className="text-sm font-semibold text-forest">{p.title}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-forest/55">
                    {last ? last.body : "No messages yet."}
                  </p>
                </button>
              );
            })}
          </div>

          <MessageThread
            projectId={selectedProjectId}
            messages={messages.filter((m) => m.projectId === selectedProjectId)}
          />
        </div>
      )}
    </div>
  );
}
