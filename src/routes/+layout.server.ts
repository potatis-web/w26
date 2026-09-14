import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ cookies, url }) => {
  let logged_in = cookies.get("logged_in");
  if (logged_in !== "yep" && url.pathname !== "/login") {
    cookies.set("logged_in", "nope", {path: "/", httpOnly: true});
    redirect(303, "/login");
  }
  if (logged_in === "yep" && url.pathname === "/login") {
    redirect(303, "/")
  }
}) satisfies LayoutServerLoad;


/**
 * ╔════════╤═════════════════╗
 * ║        │ !auth      auth ║
 * ╟────────┼─────────────────╢
 * ║ /login │ ---        ->/  ║
 * ║ /[]    │ ->/login   ---  ║
 * ╚════════╧═════════════════╝
 * 
 * 
 * 
 * 
 * 
 * 
 */