'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Landmark, Calculator, Percent, Phone, LayoutGrid } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Inicio', href: '/' },
  { label: 'Productos', href: '/productos' },
  { label: 'Simulador de Crédito', href: '/simulador-credito' },
  { label: 'Simulador de CDT', href: '/simulador-cdt' },
  { label: 'Contacto', href: '/contacto' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo FINANZA */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#008779] to-[#005f55] text-white shadow-md shadow-[#008779]/20 group-hover:scale-105 transition-transform duration-200">
              <div className="w-5 h-5 border-2 border-white transform rotate-45 rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-emerald-300 rounded-xs" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-tight text-[#008779] leading-none">
                FINANZA
              </span>
              <span className="text-xs font-medium text-slate-500 tracking-wide mt-1">
                Tu aliado financiero
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-3">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg group ${
                    isActive
                      ? 'text-[#008779] bg-[#008779]/5'
                      : 'text-slate-600 hover:text-[#008779] hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                  {/* Active Indicator Bar matching design */}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#008779] rounded-full animate-fade-in" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2.5 rounded-lg text-slate-600 hover:text-[#008779] hover:bg-slate-100 focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white shadow-xl animate-fade-in">
          <div className="px-4 pt-3 pb-5 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'text-[#008779] bg-[#008779]/10 font-bold'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-[#008779]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
