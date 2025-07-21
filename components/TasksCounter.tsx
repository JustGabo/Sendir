import React from "react";

interface Task {
    id: string;
    fechaEntrega: string | null;
    // ... otros campos que puedas necesitar
}

interface TasksCounterProps {
    tasks: Task[];
}

const TasksCounter: React.FC<TasksCounterProps> = ({ tasks }) => {
    const parseFecha = (fecha: string) => {
        // Convertir de "DD-MM-YYYY" a Date
        const [day, month, year] = fecha.split('-').map(Number);
        return new Date(year, month - 1, day); // month - 1 porque en JS los meses van de 0-11
    };

    const getTaskCounts = () => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const firstDayOfWeek = new Date(today);
        firstDayOfWeek.setDate(today.getDate() - today.getDay()); // Comenzar desde domingo
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        return tasks.reduce((counts, task) => {
            if (!task.fechaEntrega) return counts;

            try {
                const taskDate = parseFecha(task.fechaEntrega);

                // Para tareas futuras
                if (taskDate >= today) {
                    // Si es del mismo día
                    if (
                        taskDate.getDate() === today.getDate() &&
                        taskDate.getMonth() === today.getMonth() &&
                        taskDate.getFullYear() === today.getFullYear()
                    ) {
                        counts.today++;
                    }

                    // Si es de esta semana
                    const endOfWeek = new Date(today);
                    endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
                    if (taskDate <= endOfWeek) {
                        counts.thisWeek++;
                    }

                    // Si es de este mes
                    if (
                        taskDate.getMonth() === today.getMonth() &&
                        taskDate.getFullYear() === today.getFullYear()
                    ) {
                        counts.thisMonth++;
                    }
                }

            } catch (error) {
                console.error('Error parsing date:', task.fechaEntrega);
            }

            return counts;
        }, {
            today: 0,
            thisWeek: 0,
            thisMonth: 0
        });
    };

    const counts = getTaskCounts();

    return (
        <div className="grid grid-cols-3 items-center justify-center gap-2">
            <div className="rounded-2xl bg-[#2C9AB0] w-full py-2 px-3 h-[90px] lg:h-[150px] flex flex-col justify-between">
                <p className="text-white text-xs lg:text-xl pt-2 font-light lg:font-medium">
                    Este mes
                </p>
                <div className="flex items-end gap-[2px]">
                    <p className="text-white text-xl lg:text-3xl font-medium">{counts.thisMonth}</p>
                    <p className="text-white text-xs lg:text-sm mb-[2px] font-light">{counts.thisMonth === 1 ? "Tarea" : "Tareas"}</p>
                </div>
            </div>

            <div className="rounded-2xl bg-[#618199] w-full p-2 h-[90px] lg:h-[150px] flex flex-col justify-between">
                <p className="text-white text-xs lg:text-xl pt-2 font-light lg:font-medium">
                    Esta semana
                </p>
                <div className="flex items-end gap-[2px]">
                    <p className="text-white text-xl lg:text-3xl font-medium">{counts.thisWeek}</p>
                    <p className="text-white text-xs lg:text-sm mb-[2px] font-light">{counts.thisWeek === 1 ? "Tarea" : "Tareas"}</p>
                </div>
            </div>

            <div className="rounded-2xl bg-[#8578D8] w-full p-2 h-[90px] lg:h-[150px] flex flex-col justify-between">
                <p className="text-white text-xs lg:text-xl pt-2 font-light lg:font-medium">
                    Hoy
                </p>
                <div className="flex items-end gap-[2px]">
                    <p className="text-white text-xl lg:text-3xl font-medium">{counts.today}</p>
                    <p className="text-white text-xs lg:text-sm mb-[2px] font-light">{counts.today === 1 ? "Tarea" : "Tareas"}</p>
                </div>
            </div>
        </div>
    );
};

export default TasksCounter;
