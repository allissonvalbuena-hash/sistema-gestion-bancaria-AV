'use client';

import React, { useState, useTransition, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { submitContactMessage, ContactFormState } from '@/actions/contact-actions';
import { InstitucionalInfo } from '@/types';

interface ContactSectionProps {
  institucional: InstitucionalInfo;
}

export default function ContactSection({ institucional }: ContactSectionProps) {
  const searchParams = useSearchParams();
  const prefilledMotivo = searchParams.get('motivo') || '';

  const [isPending, startTransition] = useTransition();
  const [formState, setFormState] = useState<ContactFormState | null>(null);

  // Form fields
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [motivoConsulta, setMotivoConsulta] = useState(prefilledMotivo);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (prefilledMotivo) {
      setMotivoConsulta(prefilledMotivo);
      if (!mensaje) {
        setMensaje(`Hola, estoy interesado en recibir información y asesoría acerca de: ${prefilledMotivo}.`);
      }
    }
  }, [prefilledMotivo]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await submitContactMessage(formState, formData);
      setFormState(res);

      if (res.success) {
        setNombre('');
        setCorreo('');
        setTelefono('');
        setMotivoConsulta('');
        setMensaje('');
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      {/* LEFT COLUMN: Institutional contact info matching Page 5 */}
      <div className="lg:col-span-5 bg-white rounded-2xl border-2 border-slate-800/80 p-8 shadow-md">
        <h2 className="text-3xl font-extrabold text-[#008779] mb-8 tracking-tight">
          contáctanos
        </h2>

        <div className="space-y-7">
          {/* Dirección */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#008779] flex items-center justify-center shrink-0 border border-teal-100">
              <MapPin className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-slate-500 block mb-0.5">
                Dirección
              </span>
              <p className="text-base font-semibold text-slate-800">
                {institucional.direccion}
              </p>
            </div>
          </div>

          {/* Teléfono */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#008779] flex items-center justify-center shrink-0 border border-teal-100">
              <Phone className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-slate-500 block mb-0.5">
                Teléfono
              </span>
              <p className="text-base font-semibold text-slate-800">
                {institucional.telefono}
              </p>
            </div>
          </div>

          {/* Correo electrónico */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#008779] flex items-center justify-center shrink-0 border border-teal-100">
              <Mail className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-slate-500 block mb-0.5">
                correo electrónico
              </span>
              <p className="text-base font-semibold text-[#008779] break-all">
                {institucional.correo}
              </p>
            </div>
          </div>

          {/* Horario de atención */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#008779] flex items-center justify-center shrink-0 border border-teal-100">
              <Clock className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-slate-500 block mb-0.5">
                horario de atención
              </span>
              <p className="text-base font-semibold text-slate-800">
                {institucional.horario}
              </p>
            </div>
          </div>
        </div>

        {/* Office advisory notice */}
        <div className="mt-10 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <p className="text-xs text-slate-600 leading-relaxed">
            Nuestros asesores están disponibles para brindarte acompañamiento integral en todas tus solicitudes crediticias, de inversión y apertura de productos financieros.
          </p>
        </div>
      </div>

      {/* RIGHT COLUMN: Contact form matching Page 5 */}
      <div className="lg:col-span-7 bg-white rounded-2xl border-2 border-slate-800/80 p-8 shadow-md">
        {formState?.success ? (
          <div className="py-12 px-6 text-center animate-fade-in">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              ¡Mensaje enviado con éxito!
            </h3>
            <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
              {formState.message}
            </p>
            <button
              onClick={() => setFormState(null)}
              className="px-6 py-2.5 rounded-xl bg-[#008779] text-white font-semibold text-sm hover:bg-[#006f63] transition-colors"
            >
              Enviar otro mensaje
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {formState?.message && !formState.success && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-rose-700 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{formState.message}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Nombre */}
              <div>
                <label htmlFor="nombre" className="block text-sm font-bold text-slate-800 mb-1.5">
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Escribe tu nombre"
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-700 text-slate-900 font-medium placeholder-slate-400 focus:border-[#008779] focus:ring-2 focus:ring-[#008779]/20 transition-all outline-none"
                  required
                />
                {formState?.errors?.nombre && (
                  <p className="text-xs text-rose-600 mt-1">{formState.errors.nombre}</p>
                )}
              </div>

              {/* Correo electrónico */}
              <div>
                <label htmlFor="correo" className="block text-sm font-bold text-slate-800 mb-1.5">
                  correo electrónico
                </label>
                <input
                  id="correo"
                  name="correo"
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="Escribe tu correo"
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-700 text-slate-900 font-medium placeholder-slate-400 focus:border-[#008779] focus:ring-2 focus:ring-[#008779]/20 transition-all outline-none"
                  required
                />
                {formState?.errors?.correo && (
                  <p className="text-xs text-rose-600 mt-1">{formState.errors.correo}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Teléfono */}
              <div>
                <label htmlFor="telefono" className="block text-sm font-bold text-slate-800 mb-1.5">
                  Teléfono
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="Escribe tu teléfono"
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-700 text-slate-900 font-medium placeholder-slate-400 focus:border-[#008779] focus:ring-2 focus:ring-[#008779]/20 transition-all outline-none"
                  required
                />
                {formState?.errors?.telefono && (
                  <p className="text-xs text-rose-600 mt-1">{formState.errors.telefono}</p>
                )}
              </div>

              {/* Motivo de la consulta */}
              <div>
                <label htmlFor="motivoConsulta" className="block text-sm font-bold text-slate-800 mb-1.5">
                  Motivo de la consulta
                </label>
                <select
                  id="motivoConsulta"
                  name="motivoConsulta"
                  value={motivoConsulta}
                  onChange={(e) => setMotivoConsulta(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-700 text-slate-800 font-medium bg-white focus:border-[#008779] focus:ring-2 focus:ring-[#008779]/20 transition-all outline-none cursor-pointer"
                  required
                >
                  <option value="">seleccione una opción</option>
                  <option value="Asesoría Crédito de Vivienda">Asesoría Crédito de Vivienda</option>
                  <option value="Asesoría Crédito de Libre Inversión">Asesoría Crédito de Libre Inversión</option>
                  <option value="Asesoría Crédito de Vehículo">Asesoría Crédito de Vehículo</option>
                  <option value="Apertura o Simulación de CDT">Apertura o Simulación de CDT</option>
                  <option value="Cuenta de Ahorros">Cuenta de Ahorros</option>
                  <option value="Peticiones, Quejas o Reclamos (PQR)">Peticiones, Quejas o Reclamos (PQR)</option>
                  <option value="Otro motivo">Otro motivo</option>
                </select>
                {formState?.errors?.motivoConsulta && (
                  <p className="text-xs text-rose-600 mt-1">{formState.errors.motivoConsulta}</p>
                )}
              </div>
            </div>

            {/* Mensaje */}
            <div>
              <label htmlFor="mensaje" className="block text-sm font-bold text-slate-800 mb-1.5">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Escribe tu mensaje aquí..."
                className="w-full px-4 py-3 rounded-lg border-2 border-slate-700 text-slate-900 font-medium placeholder-slate-400 focus:border-[#008779] focus:ring-2 focus:ring-[#008779]/20 transition-all outline-none resize-none"
                required
              />
              {formState?.errors?.mensaje && (
                <p className="text-xs text-rose-600 mt-1">{formState.errors.mensaje}</p>
              )}
            </div>

            {/* Botón Enviar mensaje */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#008779] text-white font-bold text-base hover:bg-[#006f63] active:scale-95 disabled:opacity-70 disabled:pointer-events-none transition-all shadow-md shadow-[#008779]/25 flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Enviando mensaje...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Enviar mensaje</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
