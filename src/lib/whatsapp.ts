export const WHATSAPP_NUMBER = "5561998839992";

/** Number used for the header/hero "Fale com um especialista" CTA (from source). */
export const WHATSAPP_SPECIALIST = "556198592538";

export const HERO_WHATSAPP_MESSAGE =
  "Olá, Rodrigo! Vim pelo site da RR Regularização e gostaria de saber se consigo " +
  "reduzir o valor do INSS da minha obra de forma legal. Pode me ajudar com uma análise?";

export const FLOATING_WHATSAPP_MESSAGE =
  "Olá, Rodrigo! Vim pelo site da RR Regularização e gostaria de ajuda para regularizar minha obra.\n\n" +
  "Tenho interesse em entender melhor sobre INSS de obra, CND, averbação ou regularização do imóvel.\n\n" +
  "Pode me orientar?";

export function whatsappLink(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
