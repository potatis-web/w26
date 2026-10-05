import { form, getRequestEvent } from "$app/server";
import { redirect } from "@sveltejs/kit";
import * as v from "valibot";
import { db } from "../prisma/db";

const failedLogin = { success: false, text: "Wrong login credentials"}

const credentials = v.object({
  name: v.pipe(v.string(),v.nonEmpty()),
  password: v.pipe(v.string(),v.nonEmpty()),
})

export const login = form(credentials,
  async ({ name, password }) => {
    const user = await db.orm.public.User.where({ name }).select("salt", "hash", "id").first()
    if (!user) return failedLogin;
    
    const hash = await hashPassword(password, user.salt)
    if (hash !== user.hash) return failedLogin;
    const { cookies } = getRequestEvent();

    const { id } = await createSession(user.id)
    cookies.set("session", `${id}`, { path: "/", httpOnly: true, });
    redirect(303, "/");
  },
);

export const signup = form(credentials, 
  async ({ name, password }) => {
    const salt = crypto.randomUUID()
    const hash = await hashPassword(password, salt)
    await db.orm.public.User.create({name, salt, hash})
})

async function hashSHA256(text: string) {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hashBuffer)]
    .map(b => b.toString(16).padStart(2, "0"))
    .join("")
}

async function hashPassword(password: string, salt: string) {
  return await hashSHA256(`${password}${salt}`)
}

async function createSession(userid: string) {
  const expires = Temporal.Now.instant().add({ hours: 5 * 24 })
  return await db.orm.public.Session.create({ userid, expires })
}