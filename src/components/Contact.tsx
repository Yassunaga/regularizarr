import SectionHeading from "./SectionHeading";
import { Mail, Phone, MapPin } from "./Icons";

export default function Contact() {
  return (
    <section id="contato" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Fale Conosco">
          Entre em <span className="text-primary">Contato</span>
        </SectionHeading>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          <ContactCard
            icon={<Mail width={20} height={20} />}
            label="Email"
            href="mailto:regularizacaorr@gmail.com"
            value="regularizacaorr@gmail.com"
          />
          <ContactCard
            icon={<Phone width={20} height={20} />}
            label="Telefone"
            href="tel:+5561998839992"
            value="(61) 99883-9992"
          />
          <ContactCard
            icon={<MapPin width={20} height={20} />}
            label="Endereço"
            value="Quadra 18, Etapa A, 02 — Valparaíso de Goiás - GO — CEP 72876-332"
          />
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-3xl border border-border-soft bg-card/60 p-6">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-b from-primary-light to-primary-dark text-[#231805]">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-muted">{label}</p>
        {href ? (
          <a
            href={href}
            className="mt-0.5 block break-words font-semibold text-white transition-colors hover:text-primary"
          >
            {value}
          </a>
        ) : (
          <p className="mt-0.5 font-medium text-white">{value}</p>
        )}
      </div>
    </div>
  );
}
