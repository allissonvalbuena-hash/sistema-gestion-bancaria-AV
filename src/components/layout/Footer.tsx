import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#008779] to-[#005f55] text-white shadow-md">
                <div className="w-4 h-4 border-2 border-white transform rotate-45 rounded-sm" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white">FINANZA</span>
                <p className="text-xs text-emerald-400 font-medium">Tu aliado financiero</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Soluciones financieras integrales, asesoría personalizada y herramientas de simulación diseñadas para impulsar tus metas y cuidar tu futuro.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium pt-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Entidad vigilada y respaldada</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase border-l-2 border-[#008779] pl-2.5">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/productos" className="hover:text-emerald-400 transition-colors">
                  Nuestros Productos
                </Link>
              </li>
              <li>
                <Link href="/simulador-credito" className="hover:text-emerald-400 transition-colors">
                  Simulador de Crédito
                </Link>
              </li>
              <li>
                <Link href="/simulador-cdt" className="hover:text-emerald-400 transition-colors">
                  Simulador de CDT
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-emerald-400 transition-colors">
                  Canales de Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Products List */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase border-l-2 border-[#008779] pl-2.5">
              Productos Financieros
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/productos" className="hover:text-emerald-400 transition-colors">
                  Crédito de Vivienda
                </Link>
              </li>
              <li>
                <Link href="/productos" className="hover:text-emerald-400 transition-colors">
                  Crédito de Libre Inversión
                </Link>
              </li>
              <li>
                <Link href="/productos" className="hover:text-emerald-400 transition-colors">
                  Crédito de Vehículo
                </Link>
              </li>
              <li>
                <Link href="/productos" className="hover:text-emerald-400 transition-colors">
                  Certificado de Depósito a Término (CDT)
                </Link>
              </li>
              <li>
                <Link href="/productos" className="hover:text-emerald-400 transition-colors">
                  Cuenta de Ahorros
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details from EV9 */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase border-l-2 border-[#008779] pl-2.5">
              Atención al Cliente
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#008779] mt-0.5 shrink-0" />
                <span>calle 46 #35-20, La Dorada Caldas</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#008779] shrink-0" />
                <span>3201234567</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#008779] shrink-0" />
                <span>servicioalcliente@finanza.com.co</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#008779] mt-0.5 shrink-0" />
                <span>Lunes a Viernes, 8:00 a.m - 5:00 p.m</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} FINANZA — Tu aliado financiero. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1 text-slate-400">
            <span>Sistema de Información de Gestión Bancaria</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
