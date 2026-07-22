import type { ComponentType, SVGProps } from "react";
import { FileCheck, Calculator, Award, Building } from "../components/Icons";

export interface Service {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

export const SERVICES: Service[] = [
  {
    icon: FileCheck,
    title: "Regularização do INSS da Obra",
    description:
      "Conduzimos todo o processo de regularização junto à Receita Federal com segurança e agilidade.",
  },
  {
    icon: Calculator,
    title: "Apuração e Redução de Encargos",
    description:
      "Identificamos oportunidades legais para reduzir significativamente os custos do INSS da sua obra.",
  },
  {
    icon: Award,
    title: "Emissão da CND do INSS",
    description:
      "Obtemos a Certidão Negativa de Débitos, garantindo a regularidade total do seu imóvel.",
  },
  {
    icon: Building,
    title: "Averbação do Imóvel no Cartório",
    description:
      "Realizamos a averbação completa, essencial para venda, financiamento ou transferência.",
  },
];
