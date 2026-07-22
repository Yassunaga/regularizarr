import type { ComponentType, SVGProps } from "react";
import {
  ShieldCheck,
  TrendingUp,
  ArrowLeftRight,
  AlertTriangle,
} from "../components/Icons";

export interface Benefit {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

export const BENEFITS: Benefit[] = [
  {
    icon: ShieldCheck,
    title: "Segurança Jurídica",
    description:
      "Evite problemas com fiscalizações e garanta a legalidade do seu imóvel.",
  },
  {
    icon: TrendingUp,
    title: "Valorização Patrimonial",
    description: "Imóveis regularizados possuem maior valor de mercado.",
  },
  {
    icon: ArrowLeftRight,
    title: "Facilidade em Transações",
    description:
      "Venda, financiamento e transferência ficam muito mais simples.",
  },
  {
    icon: AlertTriangle,
    title: "Prevenção de Multas",
    description: "Evite penalidades e cobranças retroativas.",
  },
];
