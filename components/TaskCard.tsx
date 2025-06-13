import React, { useEffect } from 'react';
import { Calendar, Clock, GraduationCap, User, Star, Info } from 'lucide-react';

interface Task {
  id: string;
  materia: string | null;
  profesor: string | null;
  seccion: string | null;
  descripcion: string | null;
  fechaEntrega: string | null;
  tipo: string | null;
  estado: string | null;
  puntuacion: string | null;
  info: string | null;
}

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const formatDate = (dateStr: string | null): string => {
    if (!dateStr) return 'Sin fecha';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const getStatusColor = (status: string | null): string => {
    if (!status) return 'bg-gray-100 text-gray-800';
    switch (status.toLowerCase()) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'completada':
        return 'bg-green-100 text-green-800';
      case 'vencida':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string | null): string => {
    if (!type) return 'bg-gray-100 text-gray-800';
    switch (type.toLowerCase()) {
      case 'tarea':
        return 'bg-blue-100 text-blue-800';
      case 'examen':
        return 'bg-purple-100 text-purple-800';
      case 'proyecto':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-1">
              {task.info || 'Sin descripción'}
            </h3>
            {/* <div className="flex items-center text-sm text-gray-500">
              <GraduationCap className="h-4 w-4 mr-1" />
              {task.materia || 'Materia desconocida'}
            </div> */}
          </div>
          {task.puntuacion && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <Star className="h-3 w-3 mr-1" /> {task.puntuacion}
            </span>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-5">
          <div className="flex items-start">
            <Info className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
            <p className="text-sm text-gray-500 line-clamp-2 overflow-hidden">
              {task.descripcion || 'No asignado'}
            </p>
          </div>
          {/* <div className="flex items-center text-sm text-gray-500">
            <User className="h-4 w-4 mr-2" />
            Prof. {task.profesor || 'No asignado'}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            Sección {task.seccion || 'N/A'}
          </div> */}
          <div className="flex items-center text-sm text-gray-600 gap-1">
            <Calendar className="h-4 w-4" />
            <p className='text-sm text-gray-600 mt-[1px] tracking-wide'>{formatDate(task.fechaEntrega)}</p>
          </div>
        </div>

        {/* Footer */}
        {/* <div className="mt-4 flex items-center space-x-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(task.tipo)}`}>
            {task.tipo || 'Sin tipo'}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.estado)}`}>
            {task.estado || 'Sin estado'}
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default TaskCard;
