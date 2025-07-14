'use client'

import React from 'react'
import { ChevronLeft, Check, Loader2, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/app/context/AuthContext'
import { useSubscription } from '@/app/hooks/useSubscription'

const plan_features = [
  {
    title: 'Acceso a todas las tareas',
    description: 'Accede a todas las tareas de tu universidad',
    icon: <Check className='h-5 w-5 text-blue-500 mr-2 flex-shrink-0' />
  },
  {
    title: 'Sincronización en tiempo real',
    description: 'Sincroniza tus tareas con tu universidad',
    icon: <Check className='h-5 w-5 text-blue-500 mr-2 flex-shrink-0' />
  },
  {
    title: 'Notificaciones avanzadas',
    description: 'Recibe notificaciones avanzadas de tus tareas',
    icon: <Check className='h-5 w-5 text-blue-500 mr-2 flex-shrink-0' />
  },
  {
    title: 'Soporte prioritario',
    description: 'Recibe soporte prioritario de nuestros expertos',
    icon: <Check className='h-5 w-5 text-blue-500 mr-2 flex-shrink-0' />
  }
]

const important_information = [
  {
    title: 'Facturación mensual',
    description: 'Facturación mensual',
    icon: <Check className='h-5 w-5 text-blue-500 mr-2 flex-shrink-0' />
  },
  {
    title: 'Cancela en cualquier momento',
    description: 'Cancela en cualquier momento',
    icon: <Check className='h-5 w-5 text-blue-500 mr-2 flex-shrink-0' />
  }
]   

const SubscriptionPage = () => {
  const { user } = useAuth()
  const {
    subscription,
    isLoading,
    handleSubscriptionPortal,
    handleCancelSubscription
  } = useSubscription(user?.id)

  const isSubscribed = subscription?.subscription_status === 'active'

  return (
    <div className='min-h-screen py-14'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='space-y-8'>
          {/* Header */}
          <div>
            <Link
              href='/account'
              className='inline-flex items-center text-sm text-gray-500 hover:text-gray-700'
            >
              <ChevronLeft className='h-4 w-4 mr-1' />
              Volver a Mi cuenta
            </Link>
            <h1 className='mt-4 text-2xl font-bold text-gray-900'>
              Suscripción
            </h1>
            <p className='mt-1 text-sm text-gray-500'>
              Gestiona tu suscripción a Sendir
            </p>
          </div>

          {/* Current Plan Status */}
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
                {subscription?.subscription_status === 'cancelled' && (
                  <div className='flex items-start space-x-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg'>
                    <AlertCircle className='h-5 w-5 flex-shrink-0' />
                    <p>
                      Tu suscripción se cancelará al final del período actual
                      ({new Date(subscription.subscription_end || '').toLocaleDateString()})
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Plan Details */}
          <div className='bg-white p-6 rounded-xl border border-gray-100 shadow-sm'>
            <div className='flex justify-between items-start mb-6'>
              <div>
                <h3 className='text-lg font-medium text-gray-900'>
                  Plan Premium
                </h3>
                <div className='mt-2'>
                  <span className='text-3xl font-bold text-gray-900'>
                    $4.49
                  </span>
                  <span className='text-gray-500 ml-2'>/mes</span>
                </div>
              </div>
              {isSubscribed && (
                <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
                  Plan actual
                </span>
              )}
            </div>

            <ul className='space-y-3 mb-6'>
              {plan_features.map((feature, index) => (
                <li key={index} className='flex items-start'>
                     {feature.icon}
                  <span className='text-sm text-gray-600'>{feature.title}</span>
                </li>
              ))}
              {/* <li className='flex items-start'>
                <Check className='h-5 w-5 text-blue-500 mr-2 flex-shrink-0' />
                <span className='text-sm text-gray-600'>Sincronización en tiempo real</span>
              </li>
              <li className='flex items-start'>
                <Check className='h-5 w-5 text-blue-500 mr-2 flex-shrink-0' />
                <span className='text-sm text-gray-600'>Notificaciones avanzadas</span>
              </li>
              <li className='flex items-start'>
                <Check className='h-5 w-5 text-blue-500 mr-2 flex-shrink-0' />
                <span className='text-sm text-gray-600'>Estadísticas detalladas</span>
              </li>
              <li className='flex items-start'>
                <Check className='h-5 w-5 text-blue-500 mr-2 flex-shrink-0' />
                <span className='text-sm text-gray-600'>Soporte prioritario</span>
              </li> */}
            </ul>

            {isSubscribed ? (
              <div className='space-y-3'>
                <button
                  onClick={handleSubscriptionPortal}
                  className='w-full py-2 px-4 rounded-lg text-sm font-medium bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors'
                >
                  Gestionar suscripción
                </button>
                <button
                  onClick={handleCancelSubscription}
                  className='w-full py-2 px-4 rounded-lg text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors'
                >
                  Cancelar suscripción
                </button>
              </div>
            ) : (
              <button
                onClick={handleSubscriptionPortal}
                className='w-full py-2 px-4 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors'
              >
                Suscribirse
              </button>
            )}
          </div>

          {/* Additional Information */}
          <div className='bg-gray-50 p-6 rounded-xl border border-gray-100'>
            <h3 className='text-sm font-medium text-gray-900 mb-4'>
              Información importante
            </h3>
            <div className='text-sm text-gray-500 space-y-2'>
              {important_information.map((info, index) => (
                <p key={index} className='flex items-center'>• {info.title}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionPage 