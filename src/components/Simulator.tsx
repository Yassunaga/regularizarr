import { useState, type FormEvent } from "react";
import {
  estimate,
  formatCurrency,
  formatDate,
  type SimulatorInput,
  type SimulatorResult,
} from "../lib/simulator";
import {
  RESPONSAVEIS,
  CATEGORIAS,
  DESTINACOES,
  TIPOS_OBRA,
  UFS,
} from "../data/ufs";
import { WHATSAPP_NUMBER, whatsappLink } from "../lib/whatsapp";

const POINTS = [
  "Resposta em poucos segundos",
  "Atendimento personalizado",
  "Lead qualificado no WhatsApp",
];

const INFO = [
  {
    title: "Preencha os dados",
    text: "Informe as características da obra para gerar uma estimativa inicial.",
  },
  {
    title: "Veja o valor estimado",
    text: "Receba a simulação do INSS com base nas informações enviadas.",
  },
  {
    title: "Fale com um especialista",
    text: "Entenda se existe possibilidade real de reduzir legalmente esse custo.",
  },
];

const fieldClass =
  "h-14 w-full rounded-2xl border border-[#3a465a] bg-[#0f1724] px-4 text-[15px] text-white outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15";

const labelClass = "mb-2 block text-[13px] font-bold text-[#eef3fb]";

function buildMessage(r: SimulatorResult, categoria: string, destinacao: string) {
  return (
    `Olá, me chamo Cliente e fiz uma simulação do custo do INSS da minha obra.\n\n` +
    `*Dados da simulação:*\n` +
    `- Responsável: ${r.responsavel}\n` +
    `- Categoria: ${categoria}\n` +
    `- Data de início da obra: ${formatDate(r.dataInicio)}\n` +
    `- Data de término da obra: ${formatDate(r.dataFim)}\n` +
    `- Destinação: ${destinacao}\n` +
    `- Tipo de obra: ${r.tipoObra}\n` +
    `- Área total: ${r.areaTotal} m²\n` +
    `- VAU: ${formatCurrency(r.vau)}\n` +
    `- Mês de referência: ${r.mesReferencia}\n` +
    `- Estado: ${r.estado}\n` +
    `- INSS estimado: ${formatCurrency(r.inssAPagar)}\n\n` +
    `Quero entender se existe possibilidade de reduzir legalmente esse valor e quais seriam os próximos passos.`
  );
}

export default function Simulator() {
  const [result, setResult] = useState<SimulatorResult | null>(null);
  const [meta, setMeta] = useState({ categoria: "", destinacao: "" });

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const input: SimulatorInput = {
      responsavel: String(fd.get("responsavel") ?? ""),
      categoria: String(fd.get("categoria") ?? ""),
      dataInicio: String(fd.get("dataInicio") ?? ""),
      dataFim: String(fd.get("dataFim") ?? ""),
      destinacao: String(fd.get("destinacao") ?? ""),
      tipoObra: String(fd.get("tipoObra") ?? ""),
      estado: String(fd.get("estado") ?? ""),
      areaConstruida: Number(fd.get("areaConstruida") ?? 0),
      areaComplementar: Number(fd.get("areaComplementar") ?? 0),
    };
    setMeta({ categoria: input.categoria, destinacao: input.destinacao });
    const r = estimate(input);
    setResult(r);
    setTimeout(() => {
      document
        .getElementById("resultado")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  return (
    <section id="sobre" className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* hero */}
        <div className="mb-8 text-center">
          <span className="mb-3 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-[13px] font-bold text-primary">
            Simulação rápida e atendimento especializado
          </span>
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-[3rem]">
            Descubra o valor estimado do INSS da sua obra e veja se é possível
            reduzir esse custo
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">
            Preencha os dados abaixo para simular o valor do INSS da obra. Em
            seguida, fale com um especialista para entender como regularizar sua
            situação e buscar a redução legal desse valor.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2.5">
            {POINTS.map((p) => (
              <span
                key={p}
                className="rounded-full border border-border-soft bg-white/[0.03] px-3.5 py-2 text-[13px] font-semibold text-[#dce4f1]"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* form card */}
        <div className="rounded-3xl border border-border-soft bg-gradient-to-b from-white/[0.02] to-white/[0.01] p-6 shadow-2xl shadow-black/25 sm:p-7">
          <div className="mb-5">
            <h3 className="font-display text-2xl font-bold sm:text-3xl">
              Faça sua simulação
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              Informe os dados da obra para gerar uma estimativa e receber
              orientação personalizada no WhatsApp.
            </p>
          </div>

          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="responsavel">
                  Responsável pela obra
                </label>
                <select id="responsavel" name="responsavel" className={fieldClass} required defaultValue="">
                  <option value="" disabled>Selecione</option>
                  {RESPONSAVEIS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="categoria">Categoria</label>
                <select id="categoria" name="categoria" className={fieldClass} required defaultValue="">
                  <option value="" disabled>Selecione</option>
                  {CATEGORIAS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="dataInicio">Data de início da obra</label>
                <input id="dataInicio" name="dataInicio" type="date" className={fieldClass} required />
              </div>

              <div>
                <label className={labelClass} htmlFor="dataFim">Data de término da obra</label>
                <input id="dataFim" name="dataFim" type="date" className={fieldClass} required />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="destinacao">Destinação</label>
                <select id="destinacao" name="destinacao" className={fieldClass} required defaultValue="">
                  <option value="" disabled>Selecione</option>
                  {DESTINACOES.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="tipoObra">Tipo de obra</label>
                <select id="tipoObra" name="tipoObra" className={fieldClass} required defaultValue="">
                  <option value="" disabled>Selecione</option>
                  {TIPOS_OBRA.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="estado">Estado</label>
                <select id="estado" name="estado" className={fieldClass} required defaultValue="">
                  <option value="" disabled>Selecione</option>
                  {UFS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="areaConstruida">Área construída (m²)</label>
                <input id="areaConstruida" name="areaConstruida" type="number" min="1" step="0.01" className={fieldClass} required />
              </div>

              <div>
                <label className={labelClass} htmlFor="areaComplementar">Área complementar (m²)</label>
                <input id="areaComplementar" name="areaComplementar" type="number" min="0" step="0.01" defaultValue="0" className={fieldClass} />
              </div>
            </div>

            <button
              type="submit"
              className="mt-5 min-h-[58px] w-full rounded-2xl bg-gradient-to-b from-primary-light to-primary-dark text-[17px] font-extrabold text-[#231805] transition-transform hover:-translate-y-0.5"
            >
              Simular agora
            </button>
          </form>
        </div>

        {/* result */}
        {result && (
          <div id="resultado" className="mt-6">
            <div className="rounded-3xl bg-[#f4f7fb] p-6 text-[#111827] shadow-2xl shadow-black/20 sm:p-7">
              <h3 className="font-display text-2xl font-bold sm:text-3xl">
                Sua simulação foi concluída
              </h3>
              <p className="mt-1 text-[#5d6b7d]">
                Veja abaixo o valor estimado e avance para o atendimento
                especializado.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <ResultItem label="Responsável" value={result.responsavel} />
                <ResultItem label="Tipo de obra" value={result.tipoObra} />
                <ResultItem label="Área total" value={`${result.areaTotal} m²`} />
                <ResultItem label="VAU" value={formatCurrency(result.vau)} />
                <ResultItem label="Mês de referência" value={result.mesReferencia} />
                <ResultItem label="Estado" value={result.estado} />
                <ResultItem label="Data de início" value={formatDate(result.dataInicio)} />
                <ResultItem label="Data de término" value={formatDate(result.dataFim)} />
              </div>

              <div className="mt-4 rounded-2xl bg-gradient-to-b from-primary-light to-primary-dark p-5 text-center text-2xl font-black text-[#2a1e05]">
                INSS estimado: {formatCurrency(result.inssAPagar)}
              </div>

              <div className="mt-4 rounded-2xl border border-[#f2e0a7] bg-[#fff7df] p-5 text-2xl font-extrabold text-[#845707]">
                Em muitos casos, é possível reduzir legalmente até 90% desse
                custo.
              </div>

              <a
                href={whatsappLink(
                  WHATSAPP_NUMBER,
                  buildMessage(result, meta.categoria, meta.destinacao),
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block rounded-2xl bg-gradient-to-b from-whats to-whats-dark p-4 text-center text-lg font-extrabold text-white"
              >
                Falar com um especialista no WhatsApp
              </a>

              <p className="mt-2.5 text-center text-xs text-[#667488]">
                Valores são estimativos. Sua mensagem será enviada com os dados
                da simulação para agilizar o atendimento.
              </p>
            </div>
          </div>
        )}

        {/* info card */}
        <div className="mt-6 rounded-3xl border border-border-soft bg-gradient-to-b from-white/[0.02] to-white/[0.01] p-6 shadow-2xl shadow-black/25 sm:p-7">
          <h3 className="font-display text-2xl font-bold">
            Por que fazer essa simulação?
          </h3>
          <p className="mt-2.5 max-w-3xl text-[15px] leading-relaxed text-muted">
            Muitas pessoas só descobrem o impacto do INSS da obra quando o
            problema já está avançado. Com uma estimativa inicial, você entende
            melhor o cenário, evita decisões no escuro e pode agir com mais
            segurança.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
            {INFO.map((i) => (
              <div
                key={i.title}
                className="rounded-2xl border border-border-soft bg-card2 p-4"
              >
                <strong className="mb-1.5 block text-sm">{i.title}</strong>
                <span className="text-[13px] leading-relaxed text-muted">
                  {i.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#e3e9f2] bg-white p-3.5">
      <small className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#617084]">
        {label}
      </small>
      <strong className="text-base">{value}</strong>
    </div>
  );
}
