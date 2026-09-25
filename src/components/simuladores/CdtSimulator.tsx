'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react';
import { calcularCDT, formatCurrency } from '@/lib/calculations';
import { persistCdtSimulation } from '@/actions/simulation-actions';

export default function CdtSimulator() {
  // Input State matching Page 4
  const [valorInversion, setValorInversion] = useState<string>('10000000');
  const [tiempoInversion, setTiempoInversion] = useState<string>('12');
  const [tasaRentabilidad, setTasaRentabilidad] = useState<string>('11.5');

  // Result State
  const [resultado, setResultado] = useState({
    valorInvertido: 10000000,
    tiempoInversion: 12,
    tasaRentabilidad: 11.5,
    rentabilidadAproximada: 1150000,
    valorFinal: 11150000,
    hasCalculated: true,
  });

  const [savingStatus, setSavingStatus] = useState<string | null>(null);

  const handleCalcular = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const inversionNum = parseFloat(valorInversion.replace(/[^0-9]/g, '')) || 0;
    const mesesNum = parseInt(tiempoInversion, 10) || 0;
    const tasaNum = parseFloat(tasaRentabilidad) || 0;

    const { rentabilidadAproximada, valorFinal } = calcularCDT(inversionNum, mesesNum, tasaNum);

    const nuevoResultado = {
      valorInvertido: inversionNum,
      tiempoInversion: mesesNum,
      tasaRentabilidad: tasaNum,
      rentabilidadAproximada,
      valorFinal,
      hasCalculated: true,
    };

    setResultado(nuevoResultado);

    // Save simulation locally in JSON file via Server Action
    if (inversionNum > 0 && mesesNum > 0) {
      await persistCdtSimulation({
        valorInversion: inversionNum,
        tiempoMeses: mesesNum,
        tasaRentabilidad: tasaNum,
        rentabilidadAproximada,
        valorFinal,
      });
      setSavingStatus('Simulación de CDT guardada localmente');
      setTimeout(() => setSavingStatus(null), 3000);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT COLUMN: Input Form matching Page 4 wireframe */}
      <div className="lg:col-span-6 bg-white rounded-2xl border-2 border-slate-800/80 p-6 sm:p-8 shadow-md">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
          <div className="w-10 h-10 rounded-lg bg-[#008779]/10 text-[#008779] flex items-center justify-center">
            <Calculator className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Simulador de CDT</h2>
        </div>

        <form onSubmit={handleCalcular} className="space-y-6">
          {/* Valor de la inversión */}
          <div>
            <label htmlFor="valorInversion" className="block text-sm font-bold text-slate-800 mb-1.5">
              Valor de la inversión
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 font-bold">
                $
              </span>
              <input
                id="valorInversion"
                type="number"
                min="500000"
                step="50000"
                value={valorInversion}
                onChange={(e) => setValorInversion(e.target.value)}
                placeholder="10000000"
                className="w-full pl-8 pr-4 py-3 rounded-lg border-2 border-slate-700 text-slate-900 font-medium focus:border-[#008779] focus:ring-2 focus:ring-[#008779]/20 transition-all outline-none"
                required
              />
            </div>
            <span className="text-xs text-slate-500 mt-1 block">
              Equivalente: {formatCurrency(Number(valorInversion) || 0)}
            </span>
          </div>

          {/* Tiempo de inversión */}
          <div>
            <label htmlFor="tiempoInversion" className="block text-sm font-bold text-slate-800 mb-1.5">
              tiempo de inversión
            </label>
            <div className="relative">
              <input
                id="tiempoInversion"
                type="number"
                min="1"
                max="60"
                value={tiempoInversion}
                onChange={(e) => setTiempoInversion(e.target.value)}
                placeholder="12"
                className="w-full px-4 py-3 rounded-lg border-2 border-slate-700 text-slate-900 font-medium focus:border-[#008779] focus:ring-2 focus:ring-[#008779]/20 transition-all outline-none"
                required
              />
              <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 font-medium pointer-events-none">
                meses
              </span>
            </div>
            <span className="text-xs text-slate-500 mt-1 block">Plazo en meses pactado para la inversión</span>
          </div>

          {/* Tasa de rentabilidad (%) */}
          <div>
            <label htmlFor="tasaRentabilidad" className="block text-sm font-bold text-slate-800 mb-1.5">
              tasa de rentabilidad (%)
            </label>
            <div className="relative">
              <input
                id="tasaRentabilidad"
                type="number"
                step="0.05"
                min="0.1"
                max="50"
                value={tasaRentabilidad}
                onChange={(e) => setTasaRentabilidad(e.target.value)}
                placeholder="11.5"
                className="w-full px-4 py-3 rounded-lg border-2 border-slate-700 text-slate-900 font-medium focus:border-[#008779] focus:ring-2 focus:ring-[#008779]/20 transition-all outline-none"
                required
              />
              <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 font-bold pointer-events-none">
                %
              </span>
            </div>
            <span className="text-xs text-slate-500 mt-1 block">Tasa efectiva anual proyectada</span>
          </div>

          {/* Botón Calcular */}
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#008779] text-white font-bold text-base hover:bg-[#006f63] active:scale-95 transition-all shadow-md shadow-[#008779]/25 flex items-center justify-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            <span>Calcular</span>
          </button>

          {savingStatus && (
            <p className="text-xs text-emerald-600 font-medium flex items-center gap-1.5 animate-fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>{savingStatus}</span>
            </p>
          )}
        </form>
      </div>

      {/* RIGHT COLUMN: Result Card matching Page 4 wireframe */}
      <div className="lg:col-span-6 bg-white rounded-2xl border-2 border-slate-800/80 p-6 sm:p-8 shadow-md">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
          resultado de la simulación
        </h3>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center text-slate-700 text-base font-semibold">
            <span>valor invertido:</span>
            <span className="text-slate-900 font-bold">{formatCurrency(resultado.valorInvertido)}</span>
          </div>

          <div className="flex justify-between items-center text-slate-700 text-base font-semibold">
            <span>tiempo de inversión:</span>
            <span className="text-slate-900 font-bold">{resultado.tiempoInversion} meses</span>
          </div>

          <div className="flex justify-between items-center text-slate-700 text-base font-semibold">
            <span>tasa de rentabilidad:</span>
            <span className="text-slate-900 font-bold">{resultado.tasaRentabilidad}%</span>
          </div>
        </div>

        {/* Divider matching wireframe */}
        <hr className="border-t-2 border-slate-800 my-6" />

        {/* Highlighted Results */}
        <div className="space-y-6 text-center my-6">
          <div className="bg-[#008779]/5 p-5 rounded-xl border border-[#008779]/20">
            <span className="text-sm sm:text-base font-bold text-slate-700 uppercase tracking-wide block mb-1">
              rentabilidad aproximada:
            </span>
            <span className="text-3xl sm:text-4xl font-extrabold text-[#008779]">
              {formatCurrency(resultado.rentabilidadAproximada)}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-sm sm:text-base font-bold text-slate-700 uppercase tracking-wide block mb-1">
              valor final aproximado:
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {formatCurrency(resultado.valorFinal)}
            </span>
          </div>
        </div>

        {/* Disclaimer Text matching wireframe */}
        <div className="mt-8 pt-4 border-t border-slate-200 text-center">
          <p className="text-xs sm:text-sm text-slate-500 italic">
            ¡ esta simulación es únicamente informativa y puede variar según las condiciones del producto
          </p>
        </div>

        {/* Conversion Action */}
        <div className="mt-6 pt-4">
          <Link
            href={`/contacto?motivo=${encodeURIComponent(
              `Apertura de CDT por ${formatCurrency(resultado.valorInvertido)} a ${resultado.tiempoInversion} meses`
            )}`}
            className="w-full py-3.5 px-4 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Solicitar apertura de este CDT</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
