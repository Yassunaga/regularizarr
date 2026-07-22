import SectionHeading from "./SectionHeading";
import { Quote } from "./Icons";
import { TESTIMONIALS } from "../data/testimonials";

export default function Testimonials() {
  return (
    <section id="depoimentos" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Depoimentos">
          O que nossos <span className="text-primary">clientes</span> dizem
        </SectionHeading>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-3xl border border-border-soft bg-card/60 p-6"
            >
              <Quote className="text-primary/70" width={28} height={28} />
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-[#dce4f1]">
                {t.quote}
              </p>
              <div className="mt-5 border-t border-border-soft pt-4">
                <p className="font-semibold text-white">{t.name}</p>
                <p className="text-sm text-muted">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
