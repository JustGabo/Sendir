'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Eye, EyeOff } from 'lucide-react';
import { syncTareas } from '@/services/tareas';

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

      // Validación en backend opcional
      const backendResponse = await fetch('https://homework-backend-production.up.railway.app/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, matricula, password }),
      });

      const userData = await backendResponse.json();

      if (!backendResponse.ok) {
        setErrorMessage(userData.message || 'Credenciales inválidas');
        return;
      }

      const { nombreCompleto, primerNombre } = userData;

      // Crear usuario en Supabase (Auth)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            email_verified: true,
            nombre_completo: nombreCompleto,
            primer_nombre: primerNombre,
            matricula, // 🔥 aquí agregamos la matrícula al user_metadata
          },
        },
      });

      if (error) {
        setErrorMessage(error.message || 'No se pudo completar el registro');
        return;
      }

      const supabaseUserId = data?.user?.id;

      // Insertar credenciales académicas en la tabla nueva
      const { error: credError } = await supabase
        .from('user_academic_credentials')
        .insert({
          user_id: supabaseUserId,
          matricula,
          password,
        });

      if (credError) {
        setErrorMessage(credError.message || 'No se pudo completar el registro');
        return;
      }

      // Sincronizar tareas
      await syncTareas({ user_id: supabaseUserId! });

      router.replace('/login');
    } catch (error: any) {
      setErrorMessage(error.message || 'No se pudo completar el registro');
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
        <p className="text-gray-800 mb-8">Create an account to get started on loate.</p>

        <div className="space-y-4 text-sm text-red-400">
          {errorMessage && <p>{errorMessage}</p>}
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-gray-100 rounded-lg outline-none p-3 text-xs text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Matrícula"
              className="w-full bg-gray-100 rounded-lg outline-none p-3 text-xs text-black"
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
              className="w-full bg-gray-100 rounded-lg outline-none p-3 text-xs pr-12 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              maxLength={6}
            />
            <button
              type="button"
              className="absolute right-4 top-2 text-neutral-500"
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

          <div className="text-center">
            <span className="text-sm text-neutral-500">Already have an account? </span>
            <button onClick={() => router.replace('/login')} className="text-blue-500 text-sm font-medium">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
