/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  typescript: {
    // !! WARN !!
    // Ignoramos errores de tipado en build porque las funciones de Supabase usan Deno
    ignoreBuildErrors: true,
  },
  transpilePackages: ['supabase'],
};

export default nextConfig;
