"use client";
import React from "react";
import { Check, Loader2 } from "lucide-react";
import { useSubscription } from "@/app/hooks/useSubscription";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

interface SubscriptionPlanProps {
  isSubscribed: boolean;
  isCreatingSubscription: boolean;
  isAccessingPortal: boolean;
  isCancellingSubscription: boolean;
  handleSubscriptionPortal: () => Promise<void>;
  handleCancelSubscription: () => Promise<void>;
  handleCreateSubscription: () => Promise<void>;
}

const plan_features = [
  {
    title: "Acceso a todas las tareas",
    description: "Accede a todas las tareas de tu universidad",
    icon: <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />,
  },
  {
    title: "Sincronización en tiempo real",
    description: "Sincroniza tus tareas con tu universidad",
    icon: <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />,
  },
  {
    title: "Notificaciones avanzadas",
    description: "Recibe notificaciones avanzadas de tus tareas",
    icon: <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />,
  },
  {
    title: "Soporte prioritario",
    description: "Recibe soporte prioritario de nuestros expertos",
    icon: <Check className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />,
  },
];

const SubscriptionPlan: React.FC<SubscriptionPlanProps> = ({
  isSubscribed,
  isCreatingSubscription,
  isAccessingPortal,
  isCancellingSubscription,
  handleSubscriptionPortal,
  handleCancelSubscription,
  handleCreateSubscription,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            Plan Premium
          </h3>
          <div className="mt-2">
            <span className="text-3xl font-bold text-gray-900">
              $4.49
            </span>
            <span className="text-gray-500 ml-2">/mes</span>
          </div>
        </div>
        {isSubscribed && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Plan actual
          </span>
        )}
      </div>

      <ul className="space-y-3 mb-6">
        {plan_features.map((feature, index) => (
          <li key={index} className="flex items-start">
            {feature.icon}
            <span className="text-sm text-gray-600">{feature.title}</span>
          </li>
        ))}
      </ul>

      {isSubscribed
        ? (
          <div className="space-y-3">
            <button
              onClick={handleSubscriptionPortal}
              disabled={isAccessingPortal}
              className="w-full py-2 px-4 rounded-lg text-sm font-medium bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isAccessingPortal
                ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Cargando...
                  </>
                )
                : (
                  "Gestionar suscripción"
                )}
            </button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  disabled={isCancellingSubscription}
                  className="w-full py-2 px-4 rounded-lg text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isCancellingSubscription
                    ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Cancelando...
                      </>
                    )
                    : (
                      "Cancelar suscripción"
                    )}
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer. Tu suscripción se cancelará 
                    inmediatamente y perderás acceso 
                    a todas las funciones premium.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Volver</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleCancelSubscription}
                    className="bg-red-600 text-white hover:bg-red-700"
                  >
                    Sí, cancelar suscripción
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )
        : (
          <button
            onClick={handleCreateSubscription}
            disabled={isCreatingSubscription}
            className="w-full py-2 px-4 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isCreatingSubscription
              ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Cargando...
                </>
              )
              : (
                "Suscribirse"
              )}
          </button>
        )}
    </div>
  );
};

export default SubscriptionPlan;
