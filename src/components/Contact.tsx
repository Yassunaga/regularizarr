import SectionHeading from "./SectionHeading";
import { Mail, Phone, MapPin } from "./Icons";

export default function Contact() {
  return (
    <section id="contato" className="bg-white px-4 pb-24 pt-8 text-[#111827] sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Fale Conosco" tone="light">
          Entre em <span className="text-primary">Contato</span>
        </SectionHeading>

        <div className="mx-auto mt-12 flex max-w-md flex-col gap-7">
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
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="font-bold text-[#111827]">{label}</p>
        {href ? (
          <a
            href={href}
            className="mt-0.5 block break-words text-[#5d6b7d] transition-colors hover:text-primary"
          >
            {value}
          </a>
        ) : (
          <p className="mt-0.5 text-[#5d6b7d]">{value}</p>
        )}
      </div>
    </div>
  );
}
