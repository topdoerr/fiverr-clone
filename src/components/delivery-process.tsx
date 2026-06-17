import { deliverySteps } from "@/lib/data";
import { Reveal } from "@/components/reveal";

export function DeliveryProcess() {
  return (
    <div className="relative">
      <div className="absolute left-[27px] top-4 bottom-4 hidden w-px bg-border md:block" />
      <ol className="space-y-6 md:space-y-8">
        {deliverySteps.map((step, i) => {
          const Icon = step.icon;
          return (
            <Reveal key={step.title} delay={i * 0.06}>
              <li className="relative flex gap-5">
                <div className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-card">
                  <Icon className="size-6 text-foreground" />
                  <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-electric text-[10px] font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                <div className="pt-1.5">
                  <h3 className="font-display text-lg font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            </Reveal>
          );
        })}
      </ol>
    </div>
  );
}
