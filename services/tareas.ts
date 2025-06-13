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
    matricula: string;
    password: string;
    user_id: string;
  }
  
  interface SyncTareasResponse {
    success: boolean;
    tareas: Tarea[];
  }
  
  export const syncTareas = async ({ matricula, password, user_id }: SyncTareasParams): Promise<Tarea[]> => {
    try {
      const response = await fetch('https://homework-backend-production.up.railway.app/tareas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ matricula, password, user_id }),
      });
  
      const data: SyncTareasResponse = await response.json();
  
      if (!response.ok || !data.success) {
        throw new Error(data?.tareas ? 'Error desconocido' : data as any);
      }
  
      console.log('Tareas sincronizadas correctamente:', data.tareas);
      return data.tareas;
  
    } catch (error: any) {
      console.error('Error al sincronizar tareas:', error.message);
      throw new Error(error.message || 'Error al sincronizar tareas');
    }
  };
  