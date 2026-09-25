import React, { Suspense } from 'react';
import CreditSimulator from '@/components/simuladores/CreditSimulator';

export const metadata = {
  title: 'Simulador de Crédito — FINANZA',
  description:
    'Calcula la cuota mensual aproximada y el valor total a pagar de tu crédito con FINANZA. Ajusta monto, plazo y tasa de interés.',
};

export default function SimuladorCreditoPage() {
  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Introduction */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Simulador de Crédito
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Ingresa los parámetros de tu solicitud crediticia para proyectar tu plan de pagos y cuota mensual estimada.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="h-96 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-[#008779] border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <CreditSimulator />
      </Suspense>
    </div>
  );
}
