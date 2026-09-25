'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Calculator, ArrowRight, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { calcularCredito, formatCurrency } from '@/lib/calculations';
import { persistCreditSimulation } from '@/actions/simulation-actions';

interface CreditSimulatorProps {
  initialType?: string;
}

export default function CreditSimulator({ initialType }: CreditSimulatorProps) {
  const searchParams = useSearchParams();
  const queryType = searchParams.get('tipo') || initialType || '';

  // Form State
  const [valorCredito, setValorCredito] = useState<string>('20000000');
  const [plazoMeses, setPlazoMeses] = useState<string>('36');
  const [tasaInteres, setTasaInteres] = useState<string>('1.5');
  const [tipoCredito, setTipoCredito] = useState<string>('Crédito de libre inversión');

  // Simulation Result State
  const [resultado, setResultado] = useState({
    valorSolicitado: 20000000,
    plazo: 36,
    tasa: 1.5,
    tipo: 'Crédito de libre inversión',
    cuotaMensual: 724856,
    totalPagar: 26094816,
    hasSimulated: true,
  });

  const [savingStatus, setSavingStatus] = useState<string | null>(null);

  // Sync with query param if present
  useEffect(() => {
    if (queryType === 'credito-vivienda') {
      setTipoCredito('Crédito de vivienda');
      setTasaInteres('1.25');
      setPlazoMeses('120');
      setValorCredito('80000000');
    } else if (queryType === 'credito-vehiculo') {
      setTipoCredito('Crédito de vehículo');
      setTasaInteres('1.45');
      setPlazoMeses('60');
      setValorCredito('45000000');
    } else if (queryType === 'credito-libre-inversion') {
      setTipoCredito('Crédito de libre inversión');
      setTasaInteres('1.85');
      setPlazoMeses('36');
      setValorCredito('15000000');
    }
  }, [queryType]);

  // Handle select product type change to set reasonable default rates
  const handleTipoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setTipoCredito(val);
    if (val === 'Crédito de vivienda') {
      setTasaInteres('1.25');
      if (Number(plazoMeses) < 60) setPlazoMeses('120');
    } else if (val === 'Crédito de vehículo') {
      setTasaInteres('1.45');
      if (Number(plazoMeses) > 72) setPlazoMeses('60');
    } else if (val === 'Crédito de libre inversión') {
      setTasaInteres('1.85');
    }
  };

  const handleSimular = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const montoNum = parseFloat(valorCredito.replace(/[^0-9]/g, '')) || 0;
    const plazoNum = parseInt(plazoMeses, 10) || 0;
    const tasaNum = parseFloat(tasaInteres) || 0;

    const { cuotaMensual, totalPagar } = calcularCredito(montoNum, plazoNum, tasaNum);

    const nuevoResultado = {
      valorSolicitado: montoNum,
      plazo: plazoNum,
      tasa: tasaNum,
      tipo: tipoCredito,
      cuotaMensual,
      totalPagar,
      hasSimulated: true,
    };

    setResultado(nuevoResultado);

    // Save simulation locally in JSON file via Server Action
    if (montoNum > 0 && plazoNum > 0) {
      await persistCreditSimulation({
        valorCredito: montoNum,
        plazoMeses: plazoNum,
        tasaInteres: tasaNum,
        tipoCredito,
        cuotaMensual,
        totalPagar,
      });
      setSavingStatus('Simulación registrada en el sistema');
      setTimeout(() => setSavingStatus(null), 3000);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT COLUMN: Input Form matching Page 3 wireframe */}
      <div className="lg:col-span-6 bg-white rounded-2xl border-2 border-slate-800/80 p-6 sm:p-8 shadow-md">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
          <div className="w-10 h-10 rounded-lg bg-[#008779]/10 text-[#008779] flex items-center justify-center">
            <Calculator className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Simulador de Crédito</h2>
        </div>

        <form onSubmit={handleSimular} className="space-y-6">
          {/* Valor de crédito */}
          <div>
            <label htmlFor="valorCredito" className="block text-sm font-bold text-slate-800 mb-1.5">
              Valor de crédito
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 font-bold">
                $
              </span>
              <input
                id="valorCredito"
                type="number"
                min="100000"
                step="50000"
                value={valorCredito}
                onChange={(e) => setValorCredito(e.target.value)}
                placeholder="20000000"
                className="w-full pl-8 pr-4 py-3 rounded-lg border-2 border-slate-700 text-slate-900 font-medium focus:border-[#008779] focus:ring-2 focus:ring-[#008779]/20 transition-all outline-none"
                required
              />
            </div>
            <span className="text-xs text-slate-500 mt-1 block">
              Equivalente: {formatCurrency(Number(valorCredito) || 0)}
            </span>
          </div>

          {/* Plazo (meses) */}
          <div>
            <label htmlFor="plazoMeses" className="block text-sm font-bold text-slate-800 mb-1.5">
              Plazo (meses)
            </label>
            <div className="relative">
              <input
                id="plazoMeses"
                type="number"
                min="1"
                max="360"
                value={plazoMeses}
                onChange={(e) => setPlazoMeses(e.target.value)}
                placeholder="36"
                className="w-full px-4 py-3 rounded-lg border-2 border-slate-700 text-slate-900 font-medium focus:border-[#008779] focus:ring-2 focus:ring-[#008779]/20 transition-all outline-none"
                required
              />
              <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 font-medium pointer-events-none">
                meses
              </span>
            </div>
          </div>

          {/* Tasa de interés (%) */}
          <div>
            <label htmlFor="tasaInteres" className="block text-sm font-bold text-slate-800 mb-1.5">
              Tasa de interés (%)
            </label>
            <div className="relative">
              <input
                id="tasaInteres"
                type="number"
                step="0.01"
                min="0.1"
                max="100"
                value={tasaInteres}
                onChange={(e) => setTasaInteres(e.target.value)}
                placeholder="1.5"
                className="w-full px-4 py-3 rounded-lg border-2 border-slate-700 text-slate-900 font-medium focus:border-[#008779] focus:ring-2 focus:ring-[#008779]/20 transition-all outline-none"
                required
              />
              <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 font-bold pointer-events-none">
                %
              </span>
            </div>
            <span className="text-xs text-slate-500 mt-1 block">Tasa periódica mensual estimada</span>
          </div>

          {/* Tipo de crédito */}
          <div>
            <label htmlFor="tipoCredito" className="block text-sm font-bold text-slate-800 mb-1.5">
              Tipo de crédito
            </label>
            <select
              id="tipoCredito"
              value={tipoCredito}
              onChange={handleTipoChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-slate-700 text-slate-800 font-medium bg-white focus:border-[#008779] focus:ring-2 focus:ring-[#008779]/20 transition-all outline-none cursor-pointer"
            >
              <option value="">seleccione una opción</option>
              <option value="Crédito de vivienda">Crédito de vivienda</option>
              <option value="Crédito de libre inversión">Crédito de libre inversión</option>
              <option value="Crédito de vehículo">Crédito de vehículo</option>
            </select>
          </div>

          {/* Botón Simular */}
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#008779] text-white font-bold text-base hover:bg-[#006f63] active:scale-95 transition-all shadow-md shadow-[#008779]/25 flex items-center justify-center gap-2"
          >
            <Calculator className="w-5 h-5" />
            <span>Simular</span>
          </button>

          {savingStatus && (
            <p className="text-xs text-emerald-600 font-medium flex items-center gap-1.5 animate-fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>{savingStatus}</span>
            </p>
          )}
        </form>
      </div>

      {/* RIGHT COLUMN: Result Card matching Page 3 wireframe */}
      <div className="lg:col-span-6 bg-white rounded-2xl border-2 border-slate-800/80 p-6 sm:p-8 shadow-md">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
          Resultado de la simulación
        </h3>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center text-slate-700 text-base font-semibold">
            <span>valor solicitado:</span>
            <span className="text-slate-900 font-bold">{formatCurrency(resultado.valorSolicitado)}</span>
          </div>

          <div className="flex justify-between items-center text-slate-700 text-base font-semibold">
            <span>plazo:</span>
            <span className="text-slate-900 font-bold">{resultado.plazo} meses</span>
          </div>

          <div className="flex justify-between items-center text-slate-700 text-base font-semibold">
            <span>tasa de interés:</span>
            <span className="text-slate-900 font-bold">{resultado.tasa}%</span>
          </div>

          {resultado.tipo && (
            <div className="flex justify-between items-center text-slate-700 text-base font-semibold">
              <span>tipo de producto:</span>
              <span className="text-[#008779] font-bold">{resultado.tipo}</span>
            </div>
          )}
        </div>

        {/* Divider matching wireframe */}
        <hr className="border-t-2 border-slate-800 my-6" />

        {/* Highlighted Results */}
        <div className="space-y-6 text-center my-6">
          <div className="bg-[#008779]/5 p-5 rounded-xl border border-[#008779]/20">
            <span className="text-sm sm:text-base font-bold text-slate-700 uppercase tracking-wide block mb-1">
              cuota mensual aproximada:
            </span>
            <span className="text-3xl sm:text-4xl font-extrabold text-[#008779]">
              {formatCurrency(resultado.cuotaMensual)}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-sm sm:text-base font-bold text-slate-700 uppercase tracking-wide block mb-1">
              total aproximado a pagar:
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {formatCurrency(resultado.totalPagar)}
            </span>
          </div>
        </div>

        {/* Disclaimer Text matching wireframe */}
        <div className="mt-8 pt-4 border-t border-slate-200 text-center">
          <p className="text-xs sm:text-sm text-slate-500 italic">
            ¡ los resultados son aproximados y pueden variar según las condiciones del producto
          </p>
        </div>

        {/* Conversion Action */}
        <div className="mt-6 pt-4">
          <Link
            href={`/contacto?motivo=${encodeURIComponent(
              `Solicitud formal de ${resultado.tipo} por ${formatCurrency(resultado.valorSolicitado)}`
            )}`}
            className="w-full py-3.5 px-4 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <span>Solicitar asesoría para este crédito</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
