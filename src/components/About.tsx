const ENGINEER_IMG =
  "https://regularizarr.com/wp-content/uploads/2026/04/Imagem-Melhorada-1-scaled.png";

export default function About() {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        {/* photo card */}
        <div className="relative mx-auto w-full max-w-md lg:mx-0">
          <div className="overflow-hidden rounded-3xl border border-border-soft shadow-2xl shadow-black/40">
            <img
              src={ENGINEER_IMG}
              alt="Eng. Civil Rodrigo Ribeiro"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -top-4 -left-2 rounded-2xl bg-gradient-to-b from-primary-light to-primary-dark px-5 py-3 text-[#231805] shadow-xl shadow-black/30">
            <span className="block font-display text-2xl font-extrabold leading-none">
              +110
            </span>
            <span className="text-xs font-bold">Obras regularizadas</span>
          </div>
          <div className="absolute -bottom-4 right-4 rounded-2xl border border-border-soft bg-card px-5 py-3 shadow-xl shadow-black/40">
            <span className="block text-sm font-bold text-white">
              Eng. Civil Rodrigo Ribeiro
            </span>
            <span className="text-xs font-semibold text-primary">
              CREA 35088-D/DF
            </span>
          </div>
        </div>

        {/* text */}
        <div>
          <span className="mb-3 inline-block text-sm font-bold uppercase tracking-[0.18em] text-primary">
            Sobre a Empresa
          </span>
          <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            Quem <span className="text-primary">Somos</span>
          </h2>
          <div className="mt-3 h-1 w-16 rounded-full bg-primary" />
          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted sm:text-base">
            <p>
              A <strong className="text-white">RR Regularização</strong> é uma
              empresa especializada em regularização de obras junto à Receita
              Federal, com atuação em todo o Brasil.
            </p>
            <p>
              Somos referência na regularização do INSS da obra, realizando todo
              o processo de apuração, redução de encargos e emissão da Certidão
              Negativa de Débitos (CND do INSS), garantindo que seu imóvel esteja
              totalmente regular perante os órgãos competentes.
            </p>
            <p>
              Nossa equipe possui expertise técnica para analisar cada obra de
              forma estratégica, identificando oportunidades legais de economia e
              conduzindo todo o procedimento com segurança, clareza e agilidade.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
