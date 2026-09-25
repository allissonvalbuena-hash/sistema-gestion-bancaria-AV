import React from 'react';
import Link from 'next/link';
import {
  Calculator,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Banknote,
  Home,
  CheckCircle2,
  Users,
} from 'lucide-react';
import { getProductos } from '@/lib/storage';
import ProductCard from '@/components/productos/ProductCard';

export default async function HomePage() {
  const productos = await getProductos();

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* HERO SECTION — Matching Page 1 Wireframe */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100/60 pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#008779]/10 text-[#008779] text-xs sm:text-sm font-bold tracking-wide">
                <ShieldCheck className="w-4 h-4" />
                <span>FINANZA — Tu aliado financiero</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#008779] tracking-tight leading-[1.15]">
                Bienvenido a <br className="hidden sm:block" />
                <span>Finanza</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 max-w-xl leading-relaxed">
                Conoce nuestros productos financieros y encuentra soluciones que se adaptan a tus necesidades
              </p>

              {/* Call to Actions matching Page 1 */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                {/* Button 1: conocer nuestros productos > */}
                <Link
                  href="/productos"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#008779] text-white text-base font-bold shadow-lg shadow-[#008779]/25 hover:bg-[#006f63] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  <span>conocer nuestros productos</span>
                  <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </Link>

                {/* Button 2: Simular mi crédito */}
                <Link
                  href="/simulador-credito"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white border-2 border-[#008779] text-[#008779] text-base font-bold shadow-sm hover:bg-[#008779]/5 hover:border-[#006f63] hover:text-[#006f63] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  <Calculator className="w-5 h-5 stroke-[2]" />
                  <span>Simular mi crédito</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/80 text-left">
                <div>
                  <span className="block text-xl sm:text-2xl font-black text-slate-800">100%</span>
                  <span className="text-xs text-slate-500 font-medium">Transparente</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-black text-slate-800">0$</span>
                  <span className="text-xs text-slate-500 font-medium">Costos ocultos</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-black text-slate-800">24/7</span>
                  <span className="text-xs text-slate-500 font-medium">Simulador en línea</span>
                </div>
              </div>
            </div>

            {/* Right Graphic Card — Corporate Office Scene & Badge */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-br from-slate-900 via-slate-800 to-[#005f55] p-8 text-white">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-44 h-44 bg-[#008779]/30 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-44 h-44 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#008779] flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white transform rotate-45" />
                      </div>
                      <div>
                        <span className="font-extrabold text-lg text-white">FINANZA</span>
                        <p className="text-xs text-teal-300">Tu aliado financiero</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Asesoría Digital
                    </span>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 space-y-3">
                    <p className="text-xs uppercase tracking-wider text-teal-200 font-bold">
                      Simulación Rápida
                    </p>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-slate-300">Tasa desde:</span>
                      <span className="text-2xl font-black text-white">1.25% M.V.</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-slate-300">Rentabilidad CDT:</span>
                      <span className="text-2xl font-black text-emerald-400">11.5% E.A.</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-slate-200">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span>Financiación de Vivienda, Vehículo y Libre Inversión</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-200">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span>Plazos cómodos y cuotas fijas mensuales</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-200">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span>Atención personalizada en La Dorada, Caldas</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/simulador-cdt"
                      className="block w-full py-3 text-center rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-sm transition-all border border-white/20"
                    >
                      Calcular rendimiento de CDT →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#008779] bg-[#008779]/10 px-3 py-1 rounded-full">
            Portafolio Destacado
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 mb-4">
            Nuestros productos financieros
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Descubre las mejores alternativas para financiar tus proyectos o hacer crecer tu dinero con seguridad.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {productos.slice(0, 3).map((prod) => (
            <ProductCard key={prod.id} producto={prod} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/productos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors shadow-md"
          >
            <span>Ver los 5 productos disponibles</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
