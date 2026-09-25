'use server';

import { saveContacto } from '@/lib/storage';

export interface ContactFormState {
  success: boolean;
  message?: string;
  errors?: {
    nombre?: string;
    correo?: string;
    telefono?: string;
    motivoConsulta?: string;
    mensaje?: string;
  };
}

export async function submitContactMessage(
  prevState: ContactFormState | null,
  formData: FormData
): Promise<ContactFormState> {
  const nombre = formData.get('nombre')?.toString().trim() || '';
  const correo = formData.get('correo')?.toString().trim() || '';
  const telefono = formData.get('telefono')?.toString().trim() || '';
  const motivoConsulta = formData.get('motivoConsulta')?.toString().trim() || '';
  const mensaje = formData.get('mensaje')?.toString().trim() || '';

  const errors: ContactFormState['errors'] = {};

  if (!nombre || nombre.length < 3) {
    errors.nombre = 'Por favor ingresa tu nombre completo (mínimo 3 caracteres).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correo || !emailRegex.test(correo)) {
    errors.correo = 'Por favor ingresa un correo electrónico válido.';
  }

  if (!telefono || telefono.length < 7) {
    errors.telefono = 'Por favor ingresa un número de teléfono válido (mínimo 7 dígitos).';
  }

  if (!motivoConsulta) {
    errors.motivoConsulta = 'Por favor selecciona un motivo de consulta.';
  }

  if (!mensaje || mensaje.length < 10) {
    errors.mensaje = 'Por favor escribe un mensaje detallado (mínimo 10 caracteres).';
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Por favor corrige los campos señalados.',
      errors,
    };
  }

  try {
    await saveContacto({
      nombre,
      correo,
      telefono,
      motivoConsulta,
      mensaje,
    });

    return {
      success: true,
      message: '¡Tu mensaje ha sido enviado exitosamente! Un asesor de Finanza se comunicará contigo pronto.',
    };
  } catch (error) {
    console.error('Error al guardar mensaje de contacto:', error);
    return {
      success: false,
      message: 'Ocurrió un error al procesar tu solicitud. Por favor intenta nuevamente.',
    };
  }
}
