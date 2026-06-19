import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  variant = "forest",
  className,
}: {
  variant?: "forest" | "cream";
  className?: string;
}) {
  const src =
    variant === "cream"
      ? "/brand/td_primary_cream.svg"
      : "/brand/td_primary_forest.svg";
  return (
    <Link href="/" className={cn("inline-flex items-center", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="TopDoerr" className="h-7 w-auto md:h-8" />
    </Link>
  );
}
