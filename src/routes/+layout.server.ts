import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { db } from "../prisma/db";

export const load = (async ({ cookies, url }) => {
  const id = cookies.get("session")
  const onAccountPage =
    url.pathname !== "/login" &&
    url.pathname !== "/register";

  const session = await db.orm.public.Session.first({ id });
  if (session === null && onAccountPage) {
    redirect(303, "/login")
  }
  if (!session) return;
  let { expires } = session;
  let now = Temporal.Now.instant()
  const isExpired = Temporal.Instant.compare(expires, now) < 0;

  if (isExpired) {
    redirect(303, "/login")
  }
  expires = now.add({ days: 5 })
  await db.orm.public.Session.where({ id }).update({ expires });
  // Code past here is being worked on so ignore it
  
}) satisfies LayoutServerLoad;



/**
 * ╔════════╤═════════════════╗
 * ║        │ !auth      auth ║
 * ╟────────┼─────────────────╢
 * ║ /login │ ---        ->/  ║
 * ║ /[]    │ ->/login   ---  ║
 * ╚════════╧═════════════════╝
 * 
 * -> = Go to path
 * 
 */