import SectionHeading from "./SectionHeading";
import { SERVICES } from "../data/services";

export default function Services() {
  return (
    <section id="servico" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="O que fazemos">
          Nossos <span className="text-primary">Serviços</span>
        </SectionHeading>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group rounded-3xl border border-border-soft bg-card/60 p-6 transition-all hover:-translate-y-1 hover:border-primary/40"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-b from-primary-light to-primary-dark text-[#231805] shadow-lg shadow-primary/20">
                <Icon width={28} height={28} />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">{title}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-muted">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
