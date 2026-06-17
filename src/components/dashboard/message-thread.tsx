"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Avatar } from "@/components/dashboard/primitives";
import { useApp } from "@/lib/dashboard/store";
import { cn } from "@/lib/utils";
import type { ProjectMessage } from "@/lib/dashboard/types";

export function MessageThread({
  projectId,
  messages,
}: {
  projectId: string;
  messages: ProjectMessage[];
}) {
  const { sendMessage } = useApp();
  const [body, setBody] = useState("");

  const submit = () => {
    if (!body.trim()) return;
    sendMessage(projectId, body.trim());
    setBody("");
  };

  return (
    <div className="flex flex-col rounded-2xl border border-forest/10 bg-white">
      <div className="flex-1 space-y-4 p-5">
        {messages.length === 0 && (
          <p className="py-8 text-center text-sm text-forest/50">
            No messages yet. Start the conversation with your TopDoerr pod.
          </p>
        )}
        {messages.map((m) => {
          const mine = m.senderType === "buyer";
          return (
            <div
              key={m.id}
              className={cn("flex gap-3", mine && "flex-row-reverse")}
            >
              <Avatar
                initials={mine ? "You"[0] : "TD"}
                className={cn(
                  "size-8 shrink-0 text-[10px]",
                  m.senderType === "topdoerr" && "bg-forest"
                )}
              />
              <div className={cn("max-w-[80%]", mine && "text-right")}>
                <p className="text-xs text-forest/50">{m.senderName}</p>
                <div
                  className={cn(
                    "mt-1 inline-block rounded-2xl px-4 py-2.5 text-sm",
                    mine
                      ? "bg-forest text-cream"
                      : "bg-cream text-forest"
                  )}
                >
                  {m.body}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 border-t border-forest/10 p-3">
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="Message TopDoerr…"
          className="h-10 flex-1 rounded-full border border-forest/10 bg-cream/60 px-4 text-sm text-forest placeholder:text-forest/40 focus:border-cobalt/40 focus:outline-none"
        />
        <button
          onClick={submit}
          disabled={!body.trim()}
          className="flex size-10 items-center justify-center rounded-full bg-lime text-forest transition-colors hover:bg-lime-soft disabled:opacity-50"
          aria-label="Send"
        >
          <Send className="size-4" />
        </button>
      </div>
    </div>
  );
}
