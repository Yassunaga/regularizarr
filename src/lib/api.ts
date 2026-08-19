/**
 * Client for the INSS obra calculator API.
 * Docs: https://inss-calculator.onrender.com/docs
 */

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ?? "https://inss-calculator.onrender.com";

/** Payload accepted by POST /calculate/ (values must match the API enums). */
export interface CalculateRequest {
  nome: string;
  telefone: string;
  responsavel: string;
  categoria: string;
  destinacao: string;
  tipo_de_obra: string;
  estado: string;
  area_principal: number;
  /** Pool / sports-court area in m². Optional (defaults to 0 on the API). */
  piscina_quadra_esportiva?: number | null;
}

/** Response returned by POST /calculate/ (values already come formatted). */
export interface CalculateResponse {
  responsavel: string;
  tipo_de_obra: string;
  area_total: number;
  vau: number;
  mes_de_referencia: string;
  estado: string;
  imposto_a_pagar: number;
}

/**
 * Calls the calculator API. Throws an Error with a user-friendly message
 * when the request fails or the API returns a validation error.
 */
export async function calculateInss(
  payload: CalculateRequest,
): Promise<CalculateResponse> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/calculate/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      "Não foi possível conectar ao serviço de cálculo. Verifique sua conexão e tente novamente.",
    );
  }

  if (!res.ok) {
    let message =
      "Não foi possível calcular agora. Tente novamente em instantes.";
    try {
      const data = await res.json();
      if (typeof data?.error === "string") message = data.error;
    } catch {
      /* keep the default message */
    }
    throw new Error(message);
  }

  return (await res.json()) as CalculateResponse;
}
