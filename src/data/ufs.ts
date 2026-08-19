export interface Option {
  /** Value sent to the API (matches the /calculate enum). */
  value: string;
  /** Human-readable label shown in the UI. */
  label: string;
}

/** UF codes double as both the API value and the display label. */
export const UFS = [
  "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA",
  "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN",
  "RO", "RR", "RS", "SC", "SE", "SP", "TO",
];

export const RESPONSAVEIS: Option[] = [
  { value: "pessoa_fisica", label: "Pessoa Física" },
  { value: "pessoa_juridica", label: "Pessoa Jurídica" },
];

export const CATEGORIAS: Option[] = [
  { value: "obra_nova", label: "Obra Nova" },
  { value: "acrescimo", label: "Acréscimo" },
  { value: "reforma", label: "Reforma" },
  { value: "demolicao", label: "Demolição" },
];

export const DESTINACOES: Option[] = [
  { value: "residencial_unifamiliar", label: "Residencial Unifamiliar" },
  { value: "residencial_multifamiliar", label: "Residencial Multifamiliar" },
  { value: "comercial_salas_e_lojas", label: "Comercial salas e lojas" },
  { value: "galpao_industrial", label: "Galpão Industrial" },
  { value: "casa_popular", label: "Casa Popular" },
  { value: "conjunto_habitacional_popular", label: "Conjunto Habitacional Popular" },
  { value: "edificio_de_garagens", label: "Edifício de Garagem" },
];

export const TIPOS_OBRA: Option[] = [
  { value: "alvenaria", label: "Alvenaria" },
  { value: "madeira", label: "Madeira" },
  { value: "mista", label: "Mista" },
];

/** Resolve the display label for a given API value within an option list. */
export function labelOf(options: Option[], value: string): string {
  return options.find((o) => o.value === value)?.label ?? value;
}
