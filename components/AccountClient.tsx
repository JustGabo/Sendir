"use client";
import React from 'react'
import { Sparkles, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import AccountHeader from '@/components/AccountHeader'
import AccountMenu from '@/components/AccountMenu'
import AccountSubscriptionCTA from '@/components/AccountSubscriptionCTA'
import { useAccount } from '@/app/hooks/useAccount'

const AccountClient: React.FC = () => {
  const { menuItems, isSubscribed, nombreCompleto, email } = useAccount();

  return (
    <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
      <div className='space-y-6'>
        {/* Header */}
        <div>
          <Link
            href='/dashboard'
            className='inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4'
          >
            <ChevronLeft className='h-4 w-4 mr-1' />
            Volver al Dashboard
          </Link>
          <h1 className='text-2xl font-bold text-gray-900'>Mi cuenta</h1>
          <p className='mt-1 text-sm text-gray-500'>
            Gestiona tu cuenta y preferencias
          </p>
        </div>

        {/* User Info Summary */}
        <AccountHeader nombreCompleto={nombreCompleto} email={email} />

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
                <AccountSubscriptionCTA />
              </div>
            </div>
          </div>
        )}

        {/* Menu Grid */}
        <AccountMenu menuItems={menuItems} />
      </div>
    </div>
  )
}

export default AccountClient; 