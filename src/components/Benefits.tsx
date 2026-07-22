import SectionHeading from "./SectionHeading";
import { BENEFITS } from "../data/benefits";

export default function Benefits() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Vantagens">
          Por que <span className="text-primary">regularizar</span> sua obra?
        </SectionHeading>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-3xl border border-border-soft bg-gradient-to-b from-primary/[0.06] to-transparent p-6 text-center transition-all hover:-translate-y-1 hover:border-primary/40"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-primary-light to-primary-dark text-[#231805] shadow-lg shadow-primary/20">
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
