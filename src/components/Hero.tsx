import {
  WHATSAPP_SPECIALIST,
  HERO_WHATSAPP_MESSAGE,
  whatsappLink,
} from "../lib/whatsapp";

const HERO_IMG =
  "https://regularizarr.lovable.app/assets/hero-construction-BD0Ux-Mi.png";

const STATS = [
  { value: "+110", label: "Obras regularizadas" },
  { value: "100%", label: "Clientes satisfeitos" },
  { value: "Todo", label: "Brasil" },
];

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-28 pb-16 sm:pt-32">
      {/* glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-primary">
            Especialistas em Regularização de Obras
          </span>

          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            Regularize sua obra com segurança e{" "}
            <span className="text-primary">reduza custos</span> com o INSS
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Especialistas em regularização do INSS da obra, emissão de CND e
            averbação de imóvel, com atuação em todo o Brasil.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={whatsappLink(WHATSAPP_SPECIALIST, HERO_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-b from-primary-light to-primary-dark px-7 py-4 text-base font-extrabold text-[#231805] shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5"
            >
              Fale com um especialista
            </a>
            <a
              href="#sobre"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              Simulação rápida e atendimento especializado.
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border-soft bg-white/[0.03] px-3 py-4 text-center"
              >
                <div className="font-display text-2xl font-extrabold text-primary sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs font-medium text-muted sm:text-sm">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl border border-border-soft shadow-2xl shadow-black/40">
            <img
              src={HERO_IMG}
              alt="Obra de construção civil"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 left-6 rounded-2xl bg-gradient-to-b from-primary-light to-primary-dark px-5 py-3 text-sm font-extrabold text-[#231805] shadow-xl shadow-black/30">
            ✓ Atuação em todo o Brasil
          </div>
        </div>
      </div>
    </section>
  );
}
