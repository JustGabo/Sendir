"use client";
import React from "react";
import DashboardHeader from "@/components/DashboardHeader";
import TasksCounter from "@/components/TasksCounter";
import TasksList from "@/components/TasksList";
import SubscriptionCTA from "@/components/SubscriptionCTA";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useDashboard } from "@/app/hooks/useDashboard";

const DashboardClient: React.FC = () => {
  const { loading, name, greeting, matricula, tasks, tasksLoading, isSubscribed, user } = useDashboard();

  if (loading) {
    return <LoadingSpinner message="Cargando..." className="min-h-screen" />;
  }

  return (
    <>
      <DashboardHeader 
        name={name} 
        greeting={greeting} 
        matricula={matricula || ""} 
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        {!tasksLoading && (
          <TasksCounter
            tasks={tasks.map((task) => ({
              id: task.tarea_id,
              fechaEntrega: task.fecha_entrega,
            }))}
          />
        )}
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-6">
        <div className="">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start gap-2">
              <h3 className="text-sm lg:text-base font-semibold text-gray-700">
                Tareas Asignadas
              </h3>
            </div>
          </div>

          <div className="py-2">
            {tasksLoading ? (
              <LoadingSpinner />
            ) : !isSubscribed ? (
              <SubscriptionCTA userId={user?.id} />
            ) : (
              <TasksList tasks={tasks} />
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default DashboardClient; 