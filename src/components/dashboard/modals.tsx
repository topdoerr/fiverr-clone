"use client";

import { useState } from "react";
import { UploadCloud, Paperclip } from "lucide-react";
import { Modal } from "@/components/dashboard/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useApp } from "@/lib/dashboard/store";
import { cn } from "@/lib/utils";

export function FileUploadModal({
  open,
  onClose,
  projectId,
}: {
  open: boolean;
  onClose: () => void;
  projectId: string;
}) {
  const { uploadFile } = useApp();
  const [name, setName] = useState("");

  const submit = () => {
    const fileName = name.trim() || "uploaded-file.pdf";
    const ext = fileName.split(".").pop()?.toUpperCase() ?? "FILE";
    uploadFile(projectId, { name: fileName, type: ext, size: "—" });
    setName("");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Upload a file"
      description="Share files with your TopDoerr delivery pod."
    >
      <div className="space-y-4">
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-forest/15 bg-cream/60 px-6 py-10 text-center">
          <UploadCloud className="size-7 text-forest/40" />
          <p className="mt-2 text-sm text-forest/60">
            Drag &amp; drop a file here, or enter a name below
          </p>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="fname">File name</Label>
          <Input
            id="fname"
            placeholder="e.g. brand-guidelines.pdf"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2 pt-1">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="lime" onClick={submit}>
            Upload file
          </Button>
        </div>
      </div>
    </Modal>
  );
}

const priorities = ["Low", "Medium", "High"];

export function RevisionRequestModal({
  open,
  onClose,
  projectId,
}: {
  open: boolean;
  onClose: () => void;
  projectId: string;
}) {
  const { requestRevision } = useApp();
  const [what, setWhat] = useState("");
  const [priority, setPriority] = useState("Medium");

  const submit = () => {
    if (!what.trim()) return;
    requestRevision(projectId, what.trim(), priority);
    setWhat("");
    setPriority("Medium");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Request a revision"
      description="Tell TopDoerr what needs to change. Your pod will pick it up."
    >
      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="what">What needs to change?</Label>
          <Textarea
            id="what"
            placeholder="Describe the changes you'd like…"
            value={what}
            onChange={(e) => setWhat(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Priority</Label>
          <div className="flex gap-2">
            {priorities.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm transition-colors",
                  priority === p
                    ? "border-lime-dim bg-lime/25 font-medium text-forest"
                    : "border-forest/15 text-forest/60 hover:border-forest/30"
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <button className="inline-flex items-center gap-2 text-sm text-cobalt hover:underline">
          <Paperclip className="size-4" />
          Attach a file (optional)
        </button>
        <div className="flex justify-end gap-2 pt-1">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="lime" onClick={submit} disabled={!what.trim()}>
            Submit revision request
          </Button>
        </div>
      </div>
    </Modal>
  );
}
