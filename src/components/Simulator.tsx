import { useState, type FormEvent } from "react";
import { formatCurrency } from "../lib/format";
import {
  calculateInss,
  type CalculateRequest,
  type CalculateResponse,
} from "../lib/api";
import {
  RESPONSAVEIS,
  CATEGORIAS,
  DESTINACOES,
  TIPOS_OBRA,
  UFS,
  labelOf,
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

/** Everything shown on the result card: the API response plus the input extras. */
interface FullResult {
  api: CalculateResponse;
  categoriaLabel: string;
  destinacaoLabel: string;
  areaPrincipal: number;
  piscinaQuadra: number;
}

const fieldClass =
  "h-14 w-full rounded-2xl border border-[#3a465a] bg-[#0f1724] px-4 text-[15px] text-white outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15";

const labelClass = "mb-2 block text-[13px] font-bold text-[#eef3fb]";

function buildMessage(r: FullResult) {
  return (
    `Olá! Fiz uma simulação do custo do INSS da minha obra.\n\n` +
    `*Dados da simulação:*\n` +
    `- Responsável: ${r.api.responsavel}\n` +
    `- Categoria: ${r.categoriaLabel}\n` +
    `- Destinação: ${r.destinacaoLabel}\n` +
    `- Tipo de obra: ${r.api.tipo_de_obra}\n` +
    `- Área total: ${r.api.area_total} m²\n` +
    `- VAU: ${formatCurrency(r.api.vau)}\n` +
    `- Mês de referência: ${r.api.mes_de_referencia}\n` +
    `- Estado: ${r.api.estado}\n` +
    `- INSS estimado: ${formatCurrency(r.api.imposto_a_pagar)}\n\n` +
    `Quero entender se existe possibilidade de reduzir legalmente esse valor e quais seriam os próximos passos.`
  );
}

export default function Simulator() {
  const [result, setResult] = useState<FullResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const categoria = String(fd.get("categoria") ?? "");
    const destinacao = String(fd.get("destinacao") ?? "");
    const areaPrincipal = Number(fd.get("areaConstruida") ?? 0);
    const piscinaQuadra = Number(fd.get("areaComplementar") ?? 0);

    const payload: CalculateRequest = {
      responsavel: String(fd.get("responsavel") ?? ""),
      categoria,
      destinacao,
      tipo_de_obra: String(fd.get("tipoObra") ?? ""),
      estado: String(fd.get("estado") ?? ""),
      area_principal: areaPrincipal,
      piscina_quadra_esportiva: piscinaQuadra,
    };

    setLoading(true);
    setError(null);
    try {
      const api = await calculateInss(payload);
      setResult({
        api,
        categoriaLabel: labelOf(CATEGORIAS, categoria),
        destinacaoLabel: labelOf(DESTINACOES, destinacao),
        areaPrincipal,
        piscinaQuadra,
      });
      setTimeout(() => {
        document
          .getElementById("resultado")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    } catch (err) {
      setResult(null);
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível calcular agora. Tente novamente em instantes.",
      );
    } finally {
      setLoading(false);
    }
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
                  {RESPONSAVEIS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="categoria">Categoria</label>
                <select id="categoria" name="categoria" className={fieldClass} required defaultValue="">
                  <option value="" disabled>Selecione</option>
                  {CATEGORIAS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass} htmlFor="destinacao">Destinação</label>
                <select id="destinacao" name="destinacao" className={fieldClass} required defaultValue="">
                  <option value="" disabled>Selecione</option>
                  {DESTINACOES.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="tipoObra">Tipo de obra</label>
                <select id="tipoObra" name="tipoObra" className={fieldClass} required defaultValue="">
                  <option value="" disabled>Selecione</option>
                  {TIPOS_OBRA.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
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
                <label className={labelClass} htmlFor="areaComplementar">Piscina / Quadra esportiva (m²)</label>
                <input id="areaComplementar" name="areaComplementar" type="number" min="0" step="0.01" defaultValue="0" className={fieldClass} />
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="mt-4 rounded-2xl border border-[#5c2b2b] bg-[#2a1414] px-4 py-3 text-sm font-semibold text-[#ffb4b4]"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-5 min-h-[58px] w-full rounded-2xl bg-gradient-to-b from-primary-light to-primary-dark text-[17px] font-extrabold text-[#231805] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {loading ? "Calculando..." : "Simular agora"}
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

              <h4 className="mt-5 text-xs font-bold uppercase tracking-wide text-[#617084]">
                Dados do cálculo
              </h4>
              <div className="mt-2.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <ResultItem label="Responsável" value={result.api.responsavel} />
                <ResultItem label="Categoria" value={result.categoriaLabel} />
                <ResultItem label="Destinação" value={result.destinacaoLabel} />
                <ResultItem label="Tipo de obra" value={result.api.tipo_de_obra} />
                <ResultItem label="Estado" value={result.api.estado} />
                <ResultItem label="Área construída" value={`${result.areaPrincipal} m²`} />
                <ResultItem label="Piscina / Quadra esportiva" value={`${result.piscinaQuadra} m²`} />
                <ResultItem label="Área total" value={`${result.api.area_total} m²`} />
                <ResultItem label="VAU" value={formatCurrency(result.api.vau)} />
                <ResultItem label="Mês de referência" value={result.api.mes_de_referencia} />
              </div>

              <div className="mt-4 rounded-2xl bg-gradient-to-b from-primary-light to-primary-dark p-5 text-center text-2xl font-black text-[#2a1e05]">
                INSS estimado: {formatCurrency(result.api.imposto_a_pagar)}
              </div>

              <div className="mt-4 rounded-2xl border border-[#f3b4b4] bg-[#fdecec] p-5 text-center text-2xl font-extrabold text-[#c0392b]">
                Em muitos casos, é possível reduzir legalmente até 90% desse
                custo.
              </div>

              <a
                href={whatsappLink(WHATSAPP_NUMBER, buildMessage(result))}
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
