import SectionHeading from "./SectionHeading";
import { SERVICES } from "../data/services";

export default function Services() {
  return (
    <section id="servico" className="bg-white px-4 py-20 text-[#111827] sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="O que fazemos" tone="light">
          Nossos <span className="text-primary">Serviços</span>
        </SectionHeading>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon width={28} height={28} />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-[#111827]">
                {title}
              </h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-[#5d6b7d]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
