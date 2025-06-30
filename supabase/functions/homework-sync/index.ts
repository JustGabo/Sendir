/// <reference lib="deno.ns" />
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

serve(async (req) => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || authHeader !== `Bearer ${serviceRoleKey}`) {
    return new Response(
      JSON.stringify({ msg: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  console.log("Cron job ejecutado!");

  return new Response(
    JSON.stringify({ msg: "Cron job ejecutado correctamente" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
});
