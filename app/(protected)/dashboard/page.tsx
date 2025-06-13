"use client"
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import TaskCard from '@/components/TaskCard';
import { supabase } from '@/lib/supabaseClient';
import { LogOut, BookOpen, User } from 'lucide-react';

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

const DashboardPage = () => {
  const { user, logout, loading } = useAuth();
  const [name, setName] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksLoading, setTasksLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const nombre = user.user_metadata?.nombre_completo?.split(' ')[0];
      setName(nombre);
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      setTasksLoading(true);

      const matricula = user?.user_metadata?.matricula;
      if (!matricula) throw new Error('Matrícula no disponible');

      const { data, error } = await supabase
        .from('tareas')
        .select('*')
        .eq('user_id', user?.id);

      if (error) throw error;

      setTasks(data || []);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setTasks([]);
    } finally {
      setTasksLoading(false);
    }
  };

  if (loading || tasksLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-gray-600">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          Cargando...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-14 bg-white">
      {/* Header */}
      <header className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 ">
          <div className="flex justify-between items-center">
            <div className="flex items-center ">
              {/* <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                <User className="h-6 w-6 text-gray-600" />
              </div> */}
              <div className='flex flex-col gap-1'>
                <h2 className="text-xl font-semibold text-gray-700">
                  Bienvenido, <br />
                  <span className='text-xl font-bold'>
                    {name}
                  </span>
                </h2>
                <p className="text-sm text-gray-500">{user?.user_metadata?.matricula}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white">
          <div className=" py-4 border-b border-gray-200">
            <div className="flex items-center justify-start gap-2">
              <BookOpen className="h-5 w-5 text-gray-400 " />
              <h3 className="text-lg font-medium text-gray-700">Mis tareas</h3>
            </div>
          </div>

          <div className=" py-5">
            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="rounded-full bg-gray-100 p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  No hay tareas pendientes
                </h3>
                <p className="text-sm text-gray-500">
                  Cuando tengas tareas asignadas, aparecerán aquí.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={{
                      id: task.tarea_id,
                      materia: task.materia,
                      profesor: task.profesor,
                      seccion: task.seccion,
                      descripcion: task.descripcion,
                      fechaEntrega: task.fecha_entrega,
                      tipo: task.tipo,
                      estado: task.estado,
                      info: task.info,
                      puntuacion: task.puntuacion,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
