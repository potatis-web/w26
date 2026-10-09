import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import {
  extendSession,
  getSessionFromCookies,
  isExpired,
} from "#lib/session.ts";

export const load = (async ({ cookies, url }) => {
  const isProtectedRoute =
    url.pathname !== "/login" && url.pathname !== "/register";

  const session = await getSessionFromCookies(cookies);

  if (isProtectedRoute && !session) redirect(303, "/login");
  if (!session) return;

  let { expires, id } = session;

  if (isExpired(expires)) redirect(303, "/login");
  await extendSession(id);
}) satisfies LayoutServerLoad;

/**
 * DEPRECATED
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
