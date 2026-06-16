import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqAccordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, i) => (
        <AccordionItem key={item.q} value={`item-${i}`}>
          <AccordionTrigger>{item.q}</AccordionTrigger>
          <AccordionContent>
            <p className="leading-relaxed">{item.a}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
