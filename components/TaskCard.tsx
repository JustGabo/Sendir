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

  const formatScore = (score: string | null): { isNumeric: boolean; value: string } => {
    if (!score) return { isNumeric: false, value: '0' };
    
    // Reemplazar comas por puntos para manejar decimales
    const normalizedScore = score.replace(',', '.');
    
    // Verificar si es un número válido
    const numericValue = parseFloat(normalizedScore);
    
    if (!isNaN(numericValue)) {
      // Es un número, dar formato con máximo 2 decimales
      return {
        isNumeric: true,
        value: numericValue.toFixed(Math.min(2, (normalizedScore.split('.')[1] || '').length))
      };
    }
    
    // No es un número, devolver el string original
    return { isNumeric: false, value: score };
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

  const scoreInfo = formatScore(task.puntuacion);

  return (
    <div className="bg-[#f9f9f9] rounded-xl border border-gray-200 shadow-xs hover:shadow-md transition-shadow duration-200">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-[#020608] mb-1">
              {task.info || 'Sin descripción'}
            </h3>
            {/* <div className="flex items-center text-sm text-gray-500">
              <GraduationCap className="h-4 w-4 mr-1" />
              {task.materia || 'Materia desconocida'}
            </div> */}
          </div>
          {task.puntuacion && (
            <div className='flex px-2.5 rounded-full py-1 gap-[2px] max-w-[50px] items-center bg-[#DBF1FB] text-[#427B82]'>
              {scoreInfo.isNumeric && <Star className="h-2.5 w-2.5 mb-[0.5px]" strokeWidth={3} />}
              <span className="text-xs line-clamp-1  font-semibold">
               {task.puntuacion}
            </span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-5">
          <div className="flex items-start">
            <Info className="h-4 w-4 mr-2 mt-1 text-[#A1A9AF] flex-shrink-0" />
            <p className="text-sm text-[#A1A9AF] line-clamp-2 overflow-hidden">
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
          <div className="flex items-center text-xs text-gray-600 gap-1">
            <Calendar className="h-4 w-4" />
            <p className='text-gray-600 mt-[1px] tracking-wide'>{formatDate(task.fechaEntrega)}</p>
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
