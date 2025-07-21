'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [matricula, setMatricula] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      if (!email || !matricula || !password) {
        setErrorMessage('Por favor complete todos los campos');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrorMessage('Introduce un email válido');
        return;
      }

      const matriculaRegex = /^\d{2}-[A-Z]{4}-\d{1}-\d{3}$/;
      if (!matriculaRegex.test(matricula)) {
        setErrorMessage('La matrícula debe tener el formato: YY-XXXX-X-XXX\nEjemplo: 23-EISN-9-123');
        return;
      }

      const passwordErrors = validatePassword(password);
      if (passwordErrors.length > 0) {
        setErrorMessage('La contraseña debe tener:\n' + passwordErrors.join('\n'));
        return;
      }

      setIsLoading(true);

      // 1. Registro en el backend
      const backendResponse = await fetch('https://api.sendir.app/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, matricula, password }),
      });

      const result = await backendResponse.json();

      if (!backendResponse.ok) {
        setErrorMessage(result.message || 'Error en el registro');
        return;
      }

      // 2. Registro exitoso, ahora hacer login automático en Supabase
      const { data: { user }, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError || !user) {
        setErrorMessage('Registro exitoso pero error al iniciar sesión. Por favor, inicia sesión manualmente.');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
        return;
      }

      // 3. Login exitoso, esperar un momento y redirigir al dashboard
      setTimeout(() => {
        router.push('/dashboard');
      }, 500);

    } catch (error: any) {
      setErrorMessage('Error de conexión. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const validatePassword = (pass: string) => {
    const isNumeric = /^\d{6}$/.test(pass);
    const errors = [];

    if (!isNumeric) {
      errors.push('La contraseña debe ser de 6 dígitos numéricos');
    }

    return errors;
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl text-black font-bold mb-2">Register</h1>
        <p className="text-gray-800 mb-8">Crea una cuenta para empezar a usar la aplicación.</p>

        <div className="space-y-4 text-sm text-red-400">
          {errorMessage && <p>{errorMessage}</p>}
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-lg bg-none border border-gray-300 placeholder:text-sm  p-3 text-sm outline-none focus:outline-none text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Matrícula"
              className="w-full rounded-lg bg-none border border-gray-300 placeholder:text-sm  p-3 text-sm outline-none focus:outline-none text-black"
              value={matricula}
              onChange={(e) => {
                const formatted = e.target.value.toUpperCase().replace(/\s/g, '');
                setMatricula(formatted);
              }}
              maxLength={15}
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full rounded-lg bg-none border border-gray-300 placeholder:text-sm  p-3 text-sm outline-none focus:outline-none text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              maxLength={6}
            />
            <button
              type="button"
              className="absolute right-3 top-3.5 text-neutral-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={20} color="black" /> : <EyeOff size={20} color="black" />}
            </button>
          </div>

          <button
            disabled={isLoading}
            onClick={handleSignUp}
            className={
              'w-full py-3 rounded-lg text-white font-semibold' +
              (isLoading ? ' bg-black/70 cursor-not-allowed' : ' bg-black hover:bg-black/80')
            }
          >
            {isLoading ? 'Cargando...' : 'Register'}
          </button>

          <div className="text-center text-neutral-500 text-sm mt-4">
            <span>¿Ya tienes una cuenta? </span>
            <button onClick={() => router.push('/login')} className="text-blue-500 text-sm font-medium">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
