import React, { Suspense } from 'react';
import { getInstitucional } from '@/lib/storage';
import ContactSection from '@/components/contacto/ContactSection';

export const metadata = {
  title: 'Canales de Contacto y Atención — FINANZA',
  description:
    'Comunícate con FINANZA: Tu aliado financiero. Sede en La Dorada Caldas, líneas telefónicas y formulario de radicación en línea.',
};

export default async function ContactoPage() {
  const institucional = await getInstitucional();

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Introduction */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Atención al Cliente y Canales Oficiales
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Estamos a tu entera disposición para resolver tus inquietudes y orientarte en el producto financiero que necesitas.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="h-96 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-[#008779] border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <ContactSection institucional={institucional} />
      </Suspense>
    </div>
  );
}
