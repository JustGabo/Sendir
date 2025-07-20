"use client";
import React from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { useSubscription } from "@/app/hooks/useSubscription";
import { useAuth } from "@/app/context/AuthContext";

const AccountSubscriptionCTA: React.FC = () => {
  const { user } = useAuth();
  const { handleCreateSubscription, isCreatingSubscription } = useSubscription(user?.id);

  return (
    <button
      onClick={handleCreateSubscription}
      disabled={isCreatingSubscription}
      className='mt-3 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
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
  );
};

export default AccountSubscriptionCTA; 