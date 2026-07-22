/**
 * Local, UI-only INSS estimate.
 *
 * The original site posts to an external API (calculadora-obra-api.onrender.com)
 * whose exact formula is not public. Here we compute a *plausible placeholder*
 * so the result card behaves like the real one. Values are estimates only.
 */

export interface SimulatorInput {
  responsavel: string;
  categoria: string;
  dataInicio: string;
  dataFim: string;
  destinacao: string;
  tipoObra: string;
  estado: string;
  areaConstruida: number;
  areaComplementar: number;
}

export interface SimulatorResult {
  responsavel: string;
  tipoObra: string;
  estado: string;
  areaTotal: number;
  vau: number;
  inssAPagar: number;
  mesReferencia: string;
  dataInicio: string;
  dataFim: string;
}

/** Approximate CUB / unit-area value per m² by construction type (BRL). */
const VAU_PER_M2: Record<string, number> = {
  Alvenaria: 2100,
  Madeira: 1400,
  Mista: 1750,
};

/** Rough destination multiplier applied to the base VAU. */
const DESTINATION_FACTOR: Record<string, number> = {
  "Residencial Unifamiliar": 1,
  "Residencial Multifamiliar": 1.1,
  "Comercial salas e lojas": 1.15,
  "Galpão Industrial": 0.85,
  "Casa Popular": 0.8,
  "Conjunto Habitacional Popular": 0.85,
  "Edifício de Garagem": 0.95,
};

/** Aggregate social-security rate applied to the VAU for the estimate. */
const INSS_RATE = 0.08;

const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export function estimate(input: SimulatorInput): SimulatorResult {
  const areaTotal =
    (Number(input.areaConstruida) || 0) + (Number(input.areaComplementar) || 0);

  const base = VAU_PER_M2[input.tipoObra] ?? 1800;
  const factor = DESTINATION_FACTOR[input.destinacao] ?? 1;

  const vau = Math.round(areaTotal * base * factor);
  const inssAPagar = Math.round(vau * INSS_RATE);

  const now = new Date();
  const mesReferencia = `${MONTHS[now.getMonth()]}/${now.getFullYear()}`;

  return {
    responsavel: input.responsavel,
    tipoObra: input.tipoObra,
    estado: input.estado,
    areaTotal: Math.round(areaTotal * 100) / 100,
    vau,
    inssAPagar,
    mesReferencia,
    dataInicio: input.dataInicio,
    dataFim: input.dataFim,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatDate(value: string): string {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}
