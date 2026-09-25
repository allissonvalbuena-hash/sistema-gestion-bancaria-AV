'use server';

import { saveSimulacionCredito, saveSimulacionCDT } from '@/lib/storage';
import { SimulacionCredito, SimulacionCDT } from '@/types';

export async function persistCreditSimulation(data: SimulacionCredito): Promise<{ success: boolean }> {
  try {
    await saveSimulacionCredito(data);
    return { success: true };
  } catch (err) {
    console.error('Error saving credit simulation:', err);
    return { success: false };
  }
}

export async function persistCdtSimulation(data: SimulacionCDT): Promise<{ success: boolean }> {
  try {
    await saveSimulacionCDT(data);
    return { success: true };
  } catch (err) {
    console.error('Error saving CDT simulation:', err);
    return { success: false };
  }
}
