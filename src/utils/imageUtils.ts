/**
 * Utilitários de otimização de imagens para alta pontuação no Google PageSpeed Insights.
 * - Lazy loading nativo e deferido para elementos fora da viewport inicial
 * - Priorização de carregamento (fetchpriority) e decodificação assíncrona (decoding="async")
 * - Definição responsiva de tamanhos (sizes) para eliminar CLS (Cumulative Layout Shift)
 */

export interface ImageOptimizationConfig {
  loading: "lazy" | "eager";
  decoding: "async" | "sync";
  fetchPriority?: "high" | "low" | "auto";
}

/**
 * Retorna as propriedades de performance corretas para qualquer imagem do site.
 * Imagens acima da dobra (Hero LCP) recebem prioridade máxima ('eager', 'high', 'sync').
 * Imagens abaixo da dobra (Galeria, Carrossel de Depoimentos, etc.) recebem lazy loading estrito ('lazy', 'low', 'async').
 */
export function getImageLoadingProps(isAboveTheFold: boolean): ImageOptimizationConfig {
  if (isAboveTheFold) {
    return {
      loading: "eager",
      decoding: "sync",
      fetchPriority: "high",
    };
  }

  return {
    loading: "lazy",
    decoding: "async",
    fetchPriority: "low",
  };
}

/**
 * Retorna o atributo 'sizes' otimizado para navegadores alocarem memória e selecionarem o melhor srcset.
 */
export function getResponsiveSizes(type: "gallery-main" | "gallery-grid" | "avatar" | "thumbnail"): string {
  switch (type) {
    case "gallery-main":
      return "(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 420px";
    case "gallery-grid":
      return "(max-width: 480px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 220px";
    case "avatar":
      return "48px";
    case "thumbnail":
      return "64px";
    default:
      return "100vw";
  }
}

/**
 * Extrai as iniciais do autor para fallback de avatar acessível e seguro.
 */
export function getAuthorInitials(name: string): string {
  if (!name || typeof name !== "string") return "CL";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return (parts[0]?.substring(0, 2) || "CL").toUpperCase();
}
