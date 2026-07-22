import { WhatsAppGlyph } from "./Icons";
import {
  WHATSAPP_SPECIALIST,
  FLOATING_WHATSAPP_MESSAGE,
  whatsappLink,
} from "../lib/whatsapp";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink(WHATSAPP_SPECIALIST, FLOATING_WHATSAPP_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whats text-white shadow-[0_0_11px_rgba(0,0,0,0.5)] transition-transform hover:scale-105"
    >
      <WhatsAppGlyph width={30} height={30} />
    </a>
  );
}
