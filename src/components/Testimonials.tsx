import SectionHeading from "./SectionHeading";
import { Quote } from "./Icons";
import { TESTIMONIALS } from "../data/testimonials";

export default function Testimonials() {
  return (
    <section
      id="depoimentos"
      className="bg-white px-4 py-20 text-[#111827] sm:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Depoimentos" tone="light">
          O que nossos <span className="text-primary">clientes</span> dizem
        </SectionHeading>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="flex flex-col text-center">
              <Quote className="mx-auto text-primary" width={30} height={30} />
              <p className="mt-4 flex-1 text-[15px] italic leading-relaxed text-[#5d6b7d]">
                {t.quote}
              </p>
              <div className="mt-5">
                <p className="font-bold text-[#111827]">{t.name}</p>
                <p className="text-sm text-[#5d6b7d]">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
