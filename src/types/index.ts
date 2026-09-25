export interface ProductoFinanciero {
  id: string;
  nombre: string;
  descripcion: string;
  detalles: string;
  categoria: 'Crédito' | 'Inversión' | 'Ahorro';
  icono: string;
  tasaSugerida?: number;
  plazoMaximo?: number;
  montoMinimo?: number;
}

export interface SimulacionCredito {
  id?: string;
  fecha?: string;
  valorCredito: number;
  plazoMeses: number;
  tasaInteres: number;
  tipoCredito: string;
  cuotaMensual: number;
  totalPagar: number;
}

export interface SimulacionCDT {
  id?: string;
  fecha?: string;
  valorInversion: number;
  tiempoMeses: number;
  tasaRentabilidad: number;
  rentabilidadAproximada: number;
  valorFinal: number;
}

export interface MensajeContacto {
  id: string;
  fecha: string;
  nombre: string;
  correo: string;
  telefono: string;
  motivoConsulta: string;
  mensaje: string;
  estado: 'Pendiente' | 'Atendido';
}

export interface InstitucionalInfo {
  nombre: string;
  eslogan: string;
  direccion: string;
  telefono: string;
  correo: string;
  horario: string;
}
