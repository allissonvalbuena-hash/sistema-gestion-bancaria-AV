import React from 'react';
import CdtSimulator from '@/components/simuladores/CdtSimulator';

export const metadata = {
  title: 'Simulador de CDT — FINANZA',
  description:
    'Calcula la rentabilidad aproximada y el valor final de tu inversión a término fijo con FINANZA.',
};

export default function SimuladorCdtPage() {
  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Introduction */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Simulador de CDT
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Conoce cuánto dinero puedes ganar invirtiendo a término fijo con tasas competitivas y total respaldo financiero.
        </p>
      </div>

      <CdtSimulator />
    </div>
  );
}
