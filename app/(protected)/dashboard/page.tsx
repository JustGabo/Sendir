"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import TaskCard from "@/components/TaskCard";
import {
  BookOpen,
  Loader,
  LogOut,
  Settings,
  User,
  User2Icon,
} from "lucide-react";
import { useTasks } from "@/app/hooks/useTasks";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TasksCounter from "@/components/TasksCounter";

const DashboardPage = () => {
  const { user, loading, logout } = useAuth();
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");

  const { data: tasks = [], isLoading: tasksLoading } = useTasks(user?.id);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Buenos días";
    if (hour >= 12 && hour < 19) return "Buenas tardes";
    return "Buenas noches";
  };

  const formatName = (fullName: string | undefined) => {
    if (!fullName) return "";

    return fullName
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    if (user) {
      const nombreCompleto = user.user_metadata?.nombre_completo;
      const primerNombre = nombreCompleto?.split(" ")[0];
      setName(formatName(primerNombre));
    }
    setGreeting(getGreeting());

    // Actualizar el saludo cada minuto
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000);

    return () => clearInterval(interval);
  }, [user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-gray-600">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4">
          </div>
          Cargando...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-14 ">
      {/* Header */}
      <header className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 ">
          <div className="flex justify-between items-center">
            <div className="flex items-center ">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg tracking- font-medium text-[#A1A9AF]">
                  {greeting}, <br />
                  <span className="text-2xl font-semibold text-[#020608]">
                    {name}
                  </span>
                </h2>
                <p className="text-xs text-gray-500">
                  {user?.user_metadata?.matricula}
                </p>
              </div>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <button className="outline-none bg-white w-[40px] h-[40px] rounded-full flex items-center justify-center">
                  <Settings
                    strokeWidth={1.7}
                    className="text-neutral-800 h-5 w-5 hover:text-neutral-600 transition-colors"
                  />
                  {/* <User2Icon className='text-neutral-800 h-5 w-5 hover:text-neutral-600 transition-colors'/> */}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar sesión
                </button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        {!tasksLoading && <TasksCounter tasks={tasks.map(task => ({
          id: task.tarea_id,
          fechaEntrega: task.fecha_entrega
        }))} />}
      </section>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-6">
        <div className="">
          <div className=" flex items-center justify-between ">
            <div className="flex items-center justify-start gap-2">
              {/* <BookOpen className="h-5 w-5 text-gray-400 " /> */}
              <h3 className="text-sm font-semibold text-gray-700">
                Tareas Asignadas
              </h3>
            </div>
          </div>

          <div className="py-2">
            {tasksLoading
              ? (
                <div className="flex min-h-[50dvh] items-center justify-center">
                  <div className="text-gray-600">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4">
                    </div>
                    Cargando...
                  </div>
                </div>
              )
              : (
                <div>
                  {tasks.length === 0
                    ? (
                      <div className="text-center py-12">
                        <div className="rounded-full  p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-gray-400" />
                        </div>
                        <h3 className="text-sm font-medium text-gray-900 mb-1">
                          No hay tareas pendientes
                        </h3>
                        <p className="text-sm text-gray-500">
                          Cuando tengas tareas asignadas, aparecerán aquí.
                        </p>
                      </div>
                    )
                    : (
                      <div className="flex flex-col gap-3 lg:gap-6 lg:grid lg:grid-cols-3">
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
              )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
