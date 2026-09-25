'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProductoFinanciero } from '@/types';
import {
  Home,
  Banknote,
  Car,
  TrendingUp,
  PiggyBank,
  ArrowRight,
  Info,
  X,
  Calculator,
  Percent,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { formatCurrency } from '@/lib/calculations';

interface ProductCardProps {
  producto: ProductoFinanciero;
}

export default function ProductCard({ producto }: ProductCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  // Render proper icon based on product
  const renderIcon = () => {
    switch (producto.icono) {
      case 'Home':
        return (
          <div className="w-20 h-20 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 shadow-sm">
            <Home className="w-10 h-10 stroke-[1.75]" />
          </div>
        );
      case 'Banknote':
        return (
          <div className="w-20 h-20 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-sm">
            <Banknote className="w-10 h-10 stroke-[1.75]" />
          </div>
        );
      case 'Car':
        return (
          <div className="w-20 h-20 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-sm">
            <Car className="w-10 h-10 stroke-[1.75]" />
          </div>
        );
      case 'TrendingUp':
        return (
          <div className="w-20 h-20 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100 shadow-sm">
            <TrendingUp className="w-10 h-10 stroke-[1.75]" />
          </div>
        );
      case 'PiggyBank':
        return (
          <div className="w-20 h-20 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center border border-rose-100 shadow-sm">
            <PiggyBank className="w-10 h-10 stroke-[1.75]" />
          </div>
        );
      default:
        return (
          <div className="w-20 h-20 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center">
            <Info className="w-10 h-10" />
          </div>
        );
    }
  };

  // Determine redirection target for simulation
  const getSimulationLink = () => {
    if (producto.id === 'cdt') {
      return '/simulador-cdt';
    }
    if (producto.categoria === 'Crédito') {
      return `/simulador-credito?tipo=${producto.id}`;
    }
    return `/contacto?motivo=${encodeURIComponent(producto.nombre)}`;
  };

  return (
    <>
      <div className="flex flex-col items-center text-center bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:border-[#008779]/40 transition-all duration-300 group">
        {/* Product Illustration / Icon */}
        <div className="mb-6 transform group-hover:scale-105 transition-transform duration-300">
          {renderIcon()}
        </div>

        {/* Category Badge */}
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-slate-100 text-slate-600 mb-3">
          {producto.categoria}
        </span>

        {/* Product Name */}
        <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-[#008779] transition-colors">
          {producto.nombre}
        </h3>

        {/* Description matching EV9 */}
        <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-grow">
          {producto.descripcion}
        </p>

        {/* Action Button: 'Más información' */}
        <button
          onClick={() => setModalOpen(true)}
          type="button"
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#008779] text-white text-sm font-semibold hover:bg-[#006f63] active:scale-95 transition-all shadow-md shadow-[#008779]/20"
        >
          Más información
        </button>
      </div>

      {/* Interactive 'Más Información' Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 shrink-0 flex items-center justify-center">
                {renderIcon()}
              </div>
              <div>
                <span className="text-xs font-semibold text-[#008779] uppercase tracking-wider">
                  {producto.categoria}
                </span>
                <h3 className="text-2xl font-bold text-slate-900">{producto.nombre}</h3>
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {producto.detalles}
            </p>

            {/* Financial Product Highlights */}
            <div className="grid grid-cols-2 gap-3 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
              {producto.tasaSugerida && (
                <div>
                  <span className="text-xs text-slate-500 block">Tasa de referencia</span>
                  <span className="text-base font-bold text-[#008779]">
                    {producto.tasaSugerida}% {producto.categoria === 'Inversión' ? 'E.A.' : 'M.V.'}
                  </span>
                </div>
              )}
              {producto.plazoMaximo ? (
                <div>
                  <span className="text-xs text-slate-500 block">Plazo máximo</span>
                  <span className="text-base font-bold text-slate-800">
                    Hasta {producto.plazoMaximo} meses
                  </span>
                </div>
              ) : null}
              {producto.montoMinimo ? (
                <div className="col-span-2">
                  <span className="text-xs text-slate-500 block">Monto mínimo sugerido</span>
                  <span className="text-sm font-semibold text-slate-700">
                    {formatCurrency(producto.montoMinimo)}
                  </span>
                </div>
              ) : null}
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href={getSimulationLink()}
                onClick={() => setModalOpen(false)}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#008779] text-white font-semibold text-sm hover:bg-[#006f63] shadow-md shadow-[#008779]/20 transition-all text-center"
              >
                <Calculator className="w-4 h-4" />
                <span>
                  {producto.categoria === 'Crédito'
                    ? 'Simular este crédito'
                    : producto.categoria === 'Inversión'
                    ? 'Simular este CDT'
                    : 'Solicitar información'}
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="py-3 px-5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
