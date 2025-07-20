"use client";
import React from "react";
import { BookOpen } from "lucide-react";
import TaskCard from "@/components/TaskCard";

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
  info: string | null;
  puntuacion: string | null;
}

interface TasksListProps {
  tasks: Task[];
}

const TasksList: React.FC<TasksListProps> = ({ tasks }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
          <BookOpen className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="text-sm font-medium text-gray-900 mb-1">
          No hay tareas pendientes
        </h3>
        <p className="text-sm text-gray-500">
          Cuando tengas tareas asignadas, aparecerán aquí.
        </p>
      </div>
    );
  }

  return (
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
  );
};

export default TasksList; 