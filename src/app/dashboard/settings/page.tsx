"use client";

import { useState } from "react";
import { Building2, User as UserIcon, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useApp } from "@/lib/dashboard/store";

const notificationRows = [
  { key: "projectUpdates", label: "Project updates" },
  { key: "newMessages", label: "New messages" },
  { key: "billingReminders", label: "Billing reminders" },
  { key: "productNews", label: "Product news" },
] as const;

type NotificationKey = (typeof notificationRows)[number]["key"];

export default function SettingsPage() {
  const { user, company, completeOnboarding, toast } = useApp();

  const [name, setName] = useState(company?.name ?? "");
  const [website, setWebsite] = useState(company?.website ?? "");
  const [industry, setIndustry] = useState(company?.industry ?? "");
  const [size, setSize] = useState(company?.size ?? "");
  const [location, setLocation] = useState(company?.location ?? "");

  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");

  const [notifications, setNotifications] = useState<Record<NotificationKey, boolean>>({
    projectUpdates: true,
    newMessages: true,
    billingReminders: true,
    productNews: false,
  });

  const saveCompany = () => {
    completeOnboarding({ name, website, industry, size, location });
    toast("Settings saved.");
  };

  const saveProfile = () => {
    toast("Profile updated.");
  };

  const saveNotifications = () => {
    toast("Notification preferences saved.");
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-forest">
          Settings
        </h1>
        <p className="mt-2 text-sm text-forest/60">
          Company profile, your profile, and notifications.
        </p>
      </div>

      {/* Company profile */}
      <section className="rounded-2xl border border-forest/10 bg-white p-6">
        <div className="flex items-center gap-2">
          <Building2 className="size-4 text-cobalt" />
          <h2 className="font-display text-base font-semibold text-forest">
            Company profile
          </h2>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="co-name">Company name</Label>
            <Input id="co-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="co-website">Website</Label>
            <Input
              id="co-website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="co-industry">Industry</Label>
            <Input
              id="co-industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="co-size">Company size</Label>
            <Input id="co-size" value={size} onChange={(e) => setSize(e.target.value)} />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="co-location">Location</Label>
            <Input
              id="co-location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <Button variant="lime" onClick={saveCompany}>
            Save changes
          </Button>
        </div>
      </section>

      {/* Your profile */}
      <section className="rounded-2xl border border-forest/10 bg-white p-6">
        <div className="flex items-center gap-2">
          <UserIcon className="size-4 text-cobalt" />
          <h2 className="font-display text-base font-semibold text-forest">
            Your profile
          </h2>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="u-name">Full name</Label>
            <Input
              id="u-name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="u-email">Email</Label>
            <Input
              id="u-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="u-phone">Phone</Label>
            <Input
              id="u-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <Button variant="lime" onClick={saveProfile}>
            Save changes
          </Button>
        </div>
      </section>

      {/* Notifications */}
      <section className="rounded-2xl border border-forest/10 bg-white p-6">
        <div className="flex items-center gap-2">
          <Bell className="size-4 text-cobalt" />
          <h2 className="font-display text-base font-semibold text-forest">
            Notifications
          </h2>
        </div>
        <div className="mt-5 space-y-4">
          {notificationRows.map((row) => (
            <div key={row.key} className="flex items-center gap-3">
              <Checkbox
                id={`notif-${row.key}`}
                checked={notifications[row.key]}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({
                    ...prev,
                    [row.key]: checked === true,
                  }))
                }
              />
              <Label htmlFor={`notif-${row.key}`} className="text-forest">
                {row.label}
              </Label>
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-end">
          <Button variant="lime" onClick={saveNotifications}>
            Save changes
          </Button>
        </div>
      </section>
    </div>
  );
}
