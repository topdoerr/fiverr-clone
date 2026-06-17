"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthShell } from "@/components/dashboard/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/lib/dashboard/store";

export default function LoginPage() {
  const { login } = useApp();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    login(email);
    router.push("/dashboard");
  };

  return (
    <AuthShell
      heading="Welcome back."
      subheading="Log in to track your AI projects, milestones, and deliverables."
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
          />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="#" className="text-xs text-cobalt hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button type="submit" variant="lime" size="lg" className="w-full">
          Log In
        </Button>

        <p className="text-center text-sm text-forest/60">
          New to TopDoerr?{" "}
          <Link href="/signup" className="font-medium text-cobalt hover:underline">
            Create account
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
