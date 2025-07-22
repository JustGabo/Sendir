"use client";
import React from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { useSubscription } from "@/app/hooks/useSubscription";

interface SubscriptionCTAProps {
  userId: string | undefined;
}

const SubscriptionCTA: React.FC<SubscriptionCTAProps> = ({ userId }) => {
  const { handleCreateSubscription, isCreatingSubscription } = useSubscription(userId);

  return (
    <div className="text-center py-12">
      <div className="rounded-full bg-blue-50 p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
        <Sparkles className="h-6 w-6 text-blue-500" />
      </div>
      <h3 className="text-sm lg:text-base font-medium text-gray-900 mb-1">
        Suscríbete para ver tus tareas
      </h3>
      <p className="text-sm lg:text-base text-gray-500 mb-4">
        Obtén acceso a todas tus tareas y funciones premium
      </p>
      <button
        onClick={handleCreateSubscription}
        disabled={isCreatingSubscription}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isCreatingSubscription ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Cargando...
          </>
        ) : (
          'Suscribirse ahora'
        )}
      </button>
    </div>
  );
};

export default SubscriptionCTA; 