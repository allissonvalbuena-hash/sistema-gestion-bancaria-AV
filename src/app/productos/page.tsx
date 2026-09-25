import React from 'react';
import { getProductos } from '@/lib/storage';
import ProductCard from '@/components/productos/ProductCard';
import Link from 'next/link';
import { Calculator, ShieldCheck, Clock } from 'lucide-react';

export const metadata = {
  title: 'Nuestros Productos Financieros — FINANZA',
  description:
    'Explora el portafolio completo de FINANZA: Créditos de vivienda, vehículo, libre inversión, CDT y cuentas de ahorro.',
};

export default async function ProductosPage() {
  const productos = await getProductos();

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title matching Page 2 Wireframe */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Nuestros productos financieros
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Ponemos a tu disposición soluciones diseñadas para cada etapa de tu vida. Haz clic en{' '}
          <strong className="text-[#008779]">Más información</strong> para conocer requisitos y
          simular al instante.
        </p>
      </div>

      {/* Grid of the 5 Financial Products matching Page 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mb-16">
        {productos.map((prod) => (
          <ProductCard key={prod.id} producto={prod} />
        ))}
      </div>

      {/* Bottom Conversion Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#005f55] to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold">
            ¿Deseas planificar tus pagos o ahorros?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Utiliza nuestros simuladores en tiempo real
          </h2>
          <p className="text-slate-300 text-sm max-w-xl">
            Calcula la cuota exacta de tu crédito o la rentabilidad de tu inversión a término fijo en segundos.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/simulador-credito"
            className="px-6 py-3.5 rounded-xl bg-white text-[#008779] font-bold text-sm hover:bg-slate-100 shadow-md transition-all flex items-center gap-2"
          >
            <Calculator className="w-4 h-4" />
            <span>Simulador de Crédito</span>
          </Link>
          <Link
            href="/simulador-cdt"
            className="px-6 py-3.5 rounded-xl bg-[#008779] border border-emerald-400/40 text-white font-bold text-sm hover:bg-[#006f63] shadow-md transition-all flex items-center gap-2"
          >
            <Calculator className="w-4 h-4" />
            <span>Simulador de CDT</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
