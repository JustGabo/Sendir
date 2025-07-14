'use client'

import React, { useState } from 'react'
import { useAuth } from '@/app/context/AuthContext'
import { ChevronLeft, Loader2, CheckCircle2, XCircle } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

const PersonalInfoPage = () => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)
  const [formData, setFormData] = useState({
    nombreCompleto: user?.user_metadata?.nombre_completo || '',
    email: user?.email || '',
    matricula: user?.user_metadata?.matricula || ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setNotification(null)

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          nombre_completo: formData.nombreCompleto
        }
      })

      if (error) throw error

      setNotification({
        type: 'success',
        message: 'Información actualizada correctamente'
      })

      // Ocultar la notificación después de 3 segundos
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch (error: any) {
      setNotification({
        type: 'error',
        message: error.message || 'Error al actualizar la información'
      })
    } finally {
      setIsLoading(false)
    }
  }

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
              Información personal
            </h1>
            <p className='mt-1 text-sm text-gray-500'>
              Actualiza tu información personal
            </p>
          </div>

          {/* Notification */}
          {notification && (
            <div
              className={`flex items-center gap-2 p-4 rounded-lg text-sm ${
                notification.type === 'success'
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-700'
              }`}
            >
              {notification.type === 'success' ? (
                <CheckCircle2 className='h-5 w-5 text-green-500 flex-shrink-0' />
              ) : (
                <XCircle className='h-5 w-5 text-red-500 flex-shrink-0' />
              )}
              {notification.message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4'>
              <div>
                <label
                  htmlFor='nombreCompleto'
                  className='block text-sm font-medium text-gray-700'
                >
                  Nombre completo
                </label>
                <input
                  type='text'
                  id='nombreCompleto'
                  value={formData.nombreCompleto}
                  onChange={(e) =>
                    setFormData({ ...formData, nombreCompleto: e.target.value })
                  }
                  className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
                />
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'
                >
                  Correo electrónico
                </label>
                <input
                  type='email'
                  id='email'
                  value={formData.email}
                  disabled
                  className='mt-1 block w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500 shadow-sm'
                />
                <p className='mt-1 text-xs text-gray-500'>
                  El correo electrónico no se puede cambiar
                </p>
              </div>

              <div>
                <label
                  htmlFor='matricula'
                  className='block text-sm font-medium text-gray-700'
                >
                  Matrícula
                </label>
                <input
                  type='text'
                  id='matricula'
                  value={formData.matricula}
                  disabled
                  className='mt-1 block w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500 shadow-sm'
                />
                <p className='mt-1 text-xs text-gray-500'>
                  La matrícula no se puede cambiar
                </p>
              </div>
            </div>

            <div className='flex justify-end'>
              <button
                type='submit'
                disabled={isLoading}
                className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isLoading ? (
                  <>
                    <Loader2 className='animate-spin h-4 w-4 mr-2' />
                    Guardando...
                  </>
                ) : (
                  'Guardar cambios'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfoPage 