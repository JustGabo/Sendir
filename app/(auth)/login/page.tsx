'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setErrorMessage('Por favor complete todos los campos')
        return
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        setErrorMessage('Introduce un email válido')
        return
      }

      const passwordErrors = validatePassword(password)
      if (passwordErrors.length > 0) {
        setErrorMessage('La contraseña debe tener:\n' + passwordErrors.join('\n'))
        return
      }

      setIsLoading(true)
      setErrorMessage('')

      // Login en Supabase
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error || !user) {
        throw new Error('Credenciales inválidas o usuario no registrado')
      }

      // Login exitoso, esperar un momento y redirigir al dashboard
      setTimeout(() => {
        router.push('/dashboard')
      }, 500)

    } catch (error: any) {
      setErrorMessage(error.message || 'No se pudo iniciar sesión')
    } finally {
      setIsLoading(false)
    }
  }

  const validatePassword = (pass: string) => {
    const isNumeric = /^\d{6}$/.test(pass)
    const errors = []

    if (!isNumeric) {
      errors.push('La contraseña debe ser de 6 dígitos numéricos')
    }

    return errors
  }

  return (
    <div className="flex min-h-screen justify-center items-center bg-white px-4 py-8">
      <div className="max-w-md w-full">
        <h1 className="text-3xl text-black font-bold mb-2">Login</h1>
        <p className="text-gray-800 mb-8">Inicia sesión con tu email y contraseña.</p>

        <div className="space-y-4">
          {errorMessage && (
            <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
              {errorMessage}
            </div>
          )}
          
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              className="w-full rounded-lg bg-none border border-gray-300 placeholder:text-sm  p-3 text-sm outline-none focus:outline-none text-black"
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              maxLength={6}
              className="w-full rounded-lg bg-none border border-gray-300 placeholder:text-sm  p-3 text-sm outline-none focus:outline-none text-black"
            />
            <button
              type="button"
              className="absolute top-3.5 right-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={20} color="black" /> : <EyeOff size={20} color="black" />}
            </button>
          </div>

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className={`w-full py-3 rounded-lg font-semibold text-white ${
              isLoading ? 'bg-black/70 cursor-not-allowed' : 'bg-black hover:bg-black/80'
            }`}
          >
            {isLoading ? 'Cargando...' : 'Login'}
          </button>

          <div className="text-center text-neutral-500 text-sm mt-4">
            <span>¿No tienes una cuenta? </span>
            <button onClick={() => router.push('/register')} className="text-blue-500 font-medium">
              Regístrate
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
