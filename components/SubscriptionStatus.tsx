"use client";
import React from "react";
import { Loader2, AlertCircle } from "lucide-react";

interface SubscriptionStatusProps {
  isLoading: boolean;
  isSubscribed: boolean;
  subscriptionStatus?: string | null;
  subscriptionEnd?: string | null;
}

const SubscriptionStatus: React.FC<SubscriptionStatusProps> = ({
  isLoading,
  isSubscribed,
  subscriptionStatus,
  subscriptionEnd
}) => {
  return (
    <div className='bg-white p-6 rounded-xl border border-gray-100 shadow-sm'>
      <h2 className='text-lg font-medium text-gray-900'>Estado actual</h2>
      {isLoading ? (
        <div className='flex items-center mt-2 text-sm text-gray-500'>
          <Loader2 className='h-4 w-4 mr-2 animate-spin' />
          Cargando...
        </div>
      ) : (
        <div className='mt-2 space-y-2'>
          <p className='text-sm text-gray-500'>
            Tu suscripción está{' '}
            <span className={`font-medium text-gray-900 ${isSubscribed ? 'text-green-600' : 'text-red-500'}`}>
              {isSubscribed ? 'Activa' : 'Inactiva'}
            </span>
          </p>
          {subscriptionStatus === 'cancelled' && (
            <div className='flex items-start space-x-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg'>
              <AlertCircle className='h-5 w-5 flex-shrink-0' />
              <p>
                Tu suscripción se cancelará al final del período actual
                ({new Date(subscriptionEnd || '').toLocaleDateString()})
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SubscriptionStatus; 