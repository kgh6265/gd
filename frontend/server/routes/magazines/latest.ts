import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const { data, error } = await client
    .from("magazines")
    .select("*")
    .order("id", { ascending: false })
    .limit(1);
  if (error) await sendRedirect(event, "/#magazines");
  if (!data) await sendRedirect(event, "/#magazines");
  // @ts-expect-error
  await sendRedirect(event, data[0].url || "/#magazines");
});
