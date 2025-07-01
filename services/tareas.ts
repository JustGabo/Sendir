interface Documento {
  nombre: string;
  enlace: string;
}

interface Tarea {
  id: string;
  titulo: string | null;
  info: string | null;
  fechaEntrega: string | null;
  puntuacion: string | null;
  descripcion: string | null;
  documentos: Documento[];
}

interface SyncTareasParams {
  user_id: string;
}

interface SyncTareasResponse {
  success: boolean;
  tareas: Tarea[];
}

export const syncTareas = async ({ user_id }: SyncTareasParams): Promise<Tarea[]> => {
  try {
    const response = await fetch(`https://homework-backend-production.up.railway.app/sync/${user_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: SyncTareasResponse = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data?.tareas ? 'Error desconocido' : data as any);
    }

    return data.tareas;

  } catch (error: any) {
    throw new Error(error.message || 'Error al sincronizar tareas');
  }
};
