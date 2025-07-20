"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useTasks } from "@/app/hooks/useTasks";
import { useSubscription } from "@/app/hooks/useSubscription";

export const useDashboard = () => {
  const { user, loading } = useAuth();
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const { data: tasks = [], isLoading: tasksLoading } = useTasks(user?.id);
  const { subscription } = useSubscription(user?.id);

  const isSubscribed = subscription?.subscription_status === 'active';

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

  return {
    user,
    loading,
    name,
    greeting,
    matricula: user?.user_metadata?.matricula,
    tasks,
    tasksLoading,
    isSubscribed,
  };
}; 