import fs from 'fs/promises';
import path from 'path';
import {
  ProductoFinanciero,
  InstitucionalInfo,
  MensajeContacto,
  SimulacionCredito,
  SimulacionCDT,
} from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');

async function readJsonFile<T>(filename: string, fallback: T): Promise<T> {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return fallback;
  }
}

async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const filePath = path.join(DATA_DIR, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    throw new Error(`No se pudo persistir el archivo ${filename}`);
  }
}

export async function getProductos(): Promise<ProductoFinanciero[]> {
  return readJsonFile<ProductoFinanciero[]>('productos.json', []);
}

export async function getInstitucional(): Promise<InstitucionalInfo> {
  return readJsonFile<InstitucionalInfo>('institucional.json', {
    nombre: 'FINANZA',
    eslogan: 'Tu aliado financiero',
    direccion: 'calle 46 #35-20, La Dorada Caldas',
    telefono: '3201234567',
    correo: 'servicioalcliente@finanza.com.co',
    horario: 'Lunes a Viernes, 8:00 a.m - 5:00 p.m',
  });
}

export async function getContactos(): Promise<MensajeContacto[]> {
  return readJsonFile<MensajeContacto[]>('contactos.json', []);
}

export async function saveContacto(
  data: Omit<MensajeContacto, 'id' | 'fecha' | 'estado'>
): Promise<MensajeContacto> {
  const contactos = await getContactos();
  const nuevoContacto: MensajeContacto = {
    id: `CNT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    fecha: new Date().toISOString(),
    estado: 'Pendiente',
    ...data,
  };

  contactos.unshift(nuevoContacto);
  await writeJsonFile('contactos.json', contactos);
  return nuevoContacto;
}

export async function saveSimulacionCredito(simulacion: SimulacionCredito): Promise<void> {
  const historial = await readJsonFile<SimulacionCredito[]>('simulaciones-credito.json', []);
  historial.unshift({
    id: `SIM-CRED-${Date.now()}`,
    fecha: new Date().toISOString(),
    ...simulacion,
  });
  await writeJsonFile('simulaciones-credito.json', historial);
}

export async function saveSimulacionCDT(simulacion: SimulacionCDT): Promise<void> {
  const historial = await readJsonFile<SimulacionCDT[]>('simulaciones-cdt.json', []);
  historial.unshift({
    id: `SIM-CDT-${Date.now()}`,
    fecha: new Date().toISOString(),
    ...simulacion,
  });
  await writeJsonFile('simulaciones-cdt.json', historial);
}
