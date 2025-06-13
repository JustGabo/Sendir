import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { supabase } from '@/lib/supabaseClient'

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login");

  return <>{children}</>;
}