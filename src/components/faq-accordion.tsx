import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getT } from "@/lib/i18n/server";

export async function FaqAccordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const t = await getT();
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, i) => (
        <AccordionItem key={item.q} value={`item-${i}`}>
          <AccordionTrigger>{t(item.q)}</AccordionTrigger>
          <AccordionContent>
            <p className="leading-relaxed">{t(item.a)}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
