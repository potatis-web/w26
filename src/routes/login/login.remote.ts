import { form, getRequestEvent } from "$app/server";
import { redirect } from "@sveltejs/kit";
import * as v from "valibot";
import { db } from "../../prisma/db";

export const login = form(
  v.object({
    name: v.string(),
    password: v.string(),
  }),
  async ({ name, password }) => {
    const { salt } = await db.orm.public.User.where({ name }).select("salt").first()
    const hashed = await hash(`${password}${salt?.salt}`);
    
    const { cookies } = getRequestEvent();
    cookies.set("logged_in", "yep", { path: "/", httpOnly: true });
    redirect(303, "/");
  },
);

async function hash(text: string)  {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hashBuffer)]
    .map(b => b.toString(16).padStart(2, "0"))
    .join("")
}
