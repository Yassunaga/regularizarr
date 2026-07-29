import type { ReactNode } from "react";

interface Props {
  eyebrow: string;
  children: ReactNode;
  /** "dark" = white heading on dark bg; "light" = dark heading on white bg. */
  tone?: "dark" | "light";
}

/** The "Vantagens / Por que regularizar sua obra?" heading pattern. */
export default function SectionHeading({
  eyebrow,
  children,
  tone = "dark",
}: Props) {
  return (
    <div className="text-center">
      <span className="mb-3 inline-block text-sm font-bold uppercase tracking-[0.18em] text-primary">
        {eyebrow}
      </span>
      <h2
        className={`font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-[2.6rem] ${
          tone === "light" ? "text-[#111827]" : "text-white"
        }`}
      >
        {children}
      </h2>
    </div>
  );
}
