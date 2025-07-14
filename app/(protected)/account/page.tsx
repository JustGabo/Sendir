"use client"
import React from 'react'
import { useAuth } from '@/app/context/AuthContext'
import { CreditCard, User, Bell, Shield, ChevronRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useSubscription } from '@/app/hooks/useSubscription'

const AccountPage = () => {
  const { user } = useAuth();
  const { subscription, handleCreateSubscription } = useSubscription(user?.id);
  const isSubscribed = subscription?.subscription_status === 'active';

  const menuItems = [
    {
      title: 'Información personal',
      description: 'Gestiona tu información personal y académica',
      icon: User,
      href: '/account/personal',
      comingSoon: false
    },
    {
      title: 'Suscripción',
      description: 'Gestiona tu plan y método de pago',
      icon: CreditCard,
      href: '/account/subscription',
      comingSoon: false
    },
    {
      title: 'Notificaciones',
      description: 'Configura tus preferencias de notificación',
      icon: Bell,
      href: '/account/notifications',
      comingSoon: true
    },
    {
      title: 'Privacidad y seguridad',
      description: 'Gestiona la seguridad de tu cuenta',
      icon: Shield,
      href: '/account/privacy',
      comingSoon: true
    }
  ]

  return (
    <div className='min-h-screen py-14'>
      <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
        <div className='space-y-6'>
          {/* Header */}
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>Mi cuenta</h1>
            <p className='mt-1 text-sm text-gray-500'>
              Gestiona tu cuenta y preferencias
            </p>
          </div>

          {/* User Info Summary */}
          <div className='bg-white p-6 rounded-xl border border-gray-100 shadow-sm'>
            <div className='flex items-center gap-3'>
              <div className='h-12 w-16 lg:h-16 lg:w-16 rounded-full bg-gray-100 flex items-center justify-center'>
                <User className='h-6 w-6 lg:h-8 lg:w-8 text-gray-600' />
              </div>
              <div>
                <h2 className='text-lg font-medium line-clamp-1 text-gray-900'>
                  {user?.user_metadata?.nombre_completo || 'Usuario'}
                </h2>
                <p className='text-sm text-gray-500'>{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Subscription CTA if not subscribed */}
          {!isSubscribed && (
            <div className='bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm'>
              <div className='flex items-start space-x-4'>
                <div className='h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0'>
                  <Sparkles className='h-5 w-5 text-blue-600' />
                </div>
                <div className='flex-1'>
                  <h3 className='text-sm font-medium text-blue-900'>
                    Mejora tu experiencia
                  </h3>
                  <p className='mt-1 text-sm text-blue-700'>
                    Suscríbete para acceder a todas las funciones premium y mantener tus tareas sincronizadas.
                  </p>
                  <button
                    onClick={handleCreateSubscription}
                    className='mt-3 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  >
                    Suscribirse ahora
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Menu Grid */}
          <div className='grid grid-cols-1 gap-4'>
            {menuItems.map((item) => (
              <Link
                key={item.title}
                href={item.comingSoon ? '#' : item.href}
                className={`relative group block p-6 bg-white rounded-xl border border-gray-100 shadow-sm transition-all duration-200 ${
                  !item.comingSoon && 'hover:shadow-md'
                }`}
              >
                <div className='flex justify-between items-start'>
                  <div className='flex items-center space-x-3'>
                    <div className='h-10 w-10 lg:h-12 lg:w-12 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors'>
                      <item.icon className='h-5 w-5 lg:h-6 lg:w-6 text-gray-600' />
                    </div>
                    <div>
                      <h3 className='text-base font-medium text-gray-900'>
                        {item.title}
                      </h3>
                      <p className='mt-1 text-sm text-gray-500'>
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className='h-5 w-5 text-gray-400' />
                </div>
                {item.comingSoon && (
                  <span className='absolute top-4 right-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                    Próximamente
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountPage