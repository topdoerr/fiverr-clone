"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/dashboard/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useApp } from "@/lib/dashboard/store";

export default function SignupPage() {
  const { signup } = useApp();
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    website: "",
    password: "",
    confirm: "",
  });
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    if (!form.email.trim()) e.email = "Work email is required.";
    if (!form.company.trim()) e.company = "Company name is required.";
    if (form.password.length < 8) e.password = "Password must be at least 8 characters.";
    if (form.confirm !== form.password) e.confirm = "Passwords do not match.";
    if (!agree) e.agree = "Please accept the Terms and Privacy Policy.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setAuthError("");
    if (!validate()) return;
    setSubmitting(true);
    const { error } = await signup({
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      companyName: form.company,
      website: form.website,
      password: form.password,
    });
    setSubmitting(false);
    if (error) {
      setAuthError(error);
      return;
    }
    router.push("/onboarding");
  };

  const field = (
    id: string,
    label: string,
    type = "text",
    optional = false
  ) => (
    <div className="space-y-1.5">
      <Label htmlFor={id}>
        {label}
        {optional && <span className="ml-1 text-forest/40">(optional)</span>}
      </Label>
      <Input
        id={id}
        type={type}
        value={form[id as keyof typeof form]}
        onChange={(e) => set(id, e.target.value)}
        aria-invalid={!!errors[id]}
      />
      {errors[id] && <p className="text-xs text-red-600">{errors[id]}</p>}
    </div>
  );

  return (
    <AuthShell
      heading="Start your AI project with TopDoerr."
      subheading="Create your account, tell us what you need, and we'll help turn your idea into a scoped AI project delivered by TopDoerr."
    >
      <form onSubmit={onSubmit} className="space-y-4">
        {field("fullName", "Full name")}
        {field("email", "Work email", "email")}
        <div className="grid gap-4 sm:grid-cols-2">
          {field("company", "Company name")}
          {field("phone", "Phone number", "tel")}
        </div>
        {field("website", "Company website", "url", true)}
        <div className="grid gap-4 sm:grid-cols-2">
          {field("password", "Password", "password")}
          {field("confirm", "Confirm password", "password")}
        </div>

        <label className="flex items-start gap-3 pt-1 text-sm text-forest/70">
          <Checkbox
            checked={agree}
            onCheckedChange={(v) => setAgree(!!v)}
            className="mt-0.5"
          />
          <span>
            I agree to TopDoerr&apos;s{" "}
            <Link href="#" className="text-cobalt hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-cobalt hover:underline">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {errors.agree && <p className="text-xs text-red-600">{errors.agree}</p>}
        {authError && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {authError}
          </p>
        )}

        <Button
          type="submit"
          variant="lime"
          size="lg"
          className="w-full"
          disabled={submitting}
        >
          {submitting ? "Creating account…" : "Create Account"}
        </Button>

        <p className="text-center text-sm text-forest/60">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-cobalt hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
