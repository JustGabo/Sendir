import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";

interface Task {
  id: number;
  tarea_id: string;
  materia: string | null;
  profesor: string | null;
  seccion: string | null;
  descripcion: string | null;
  fecha_entrega: string | null;
  tipo: string | null;
  estado: string | null;
  puntuacion: string | null;
  info: string | null;
}

export function useTasks(userId: string | undefined) {
  return useQuery({
    queryKey: ["tasks", userId],
    queryFn: async (): Promise<Task[]> => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from("tareas")
        .select("*")
        .eq("user_id", userId);

      if (error) throw error;
      return data || [];
    },
    enabled: !!userId, // Solo ejecutar la query si tenemos userId
    staleTime: 5 * 60 * 1000, // Datos se consideran frescos por 5 minutos
    refetchOnWindowFocus: false, // No recargar al cambiar de pestaña
    refetchOnMount: true, // Recargar cuando el componente se monta
    refetchOnReconnect: true, // Recargar cuando se recupera la conexión
  });
} 