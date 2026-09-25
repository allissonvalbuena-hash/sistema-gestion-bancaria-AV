/**
 * Utilidades para cálculos financieros y formateo de monedas
 */

export function calcularCredito(
  monto: number,
  meses: number,
  tasaPorcentual: number
): { cuotaMensual: number; totalPagar: number } {
  if (monto <= 0 || meses <= 0) {
    return { cuotaMensual: 0, totalPagar: 0 };
  }

  if (tasaPorcentual <= 0) {
    const cuota = Math.round(monto / meses);
    return { cuotaMensual: cuota, totalPagar: monto };
  }

  // Tasa mensual expresada en decimal
  const i = tasaPorcentual / 100;
  
  // Fórmula de cuota fija (Sistema Francés): C = P * [ i / (1 - (1+i)^(-n)) ]
  const cuota = monto * (i / (1 - Math.pow(1 + i, -meses)));
  const cuotaMensual = Math.round(cuota);
  const totalPagar = Math.round(cuotaMensual * meses);

  return { cuotaMensual, totalPagar };
}

export function calcularCDT(
  inversion: number,
  meses: number,
  tasaAnualPorcentual: number
): { rentabilidadAproximada: number; valorFinal: number } {
  if (inversion <= 0 || meses <= 0 || tasaAnualPorcentual <= 0) {
    return { rentabilidadAproximada: 0, valorFinal: inversion > 0 ? inversion : 0 };
  }

  // Rentabilidad sobre base anual proporcional al número de meses
  // R = P * (tasa / 100) * (meses / 12)
  const rentabilidad = inversion * (tasaAnualPorcentual / 100) * (meses / 12);
  const rentabilidadAproximada = Math.round(rentabilidad);
  const valorFinal = Math.round(inversion + rentabilidadAproximada);

  return { rentabilidadAproximada, valorFinal };
}

export function formatCurrency(amount: number): string {
  if (isNaN(amount)) return '$ 0';
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amount);
}
