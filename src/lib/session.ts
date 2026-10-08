import type { Cookies } from "@sveltejs/kit";
import { pdb } from "../prisma/db";

const HOURS_IN_DAY = 24;
const SESSION_COOKIE = "session";
const SESSION_DAYS = 5;
const SESSION_HOURS = SESSION_DAYS * HOURS_IN_DAY;



type UserRows = "id" | "name" | "salt" | "hash"  | "created_at";
type AllUserRows = UserRows | "forums" | "messages" | "sessions";
type UserRowSelection = readonly [UserRows, ...UserRows[]];
export async function getSessionFromCookies(cookies: Cookies) {
  const id = cookies.get(SESSION_COOKIE)
  if (!id) return null;
  return await pdb.Session.first({ id });
}

export async function getUserRowsFromSession<T extends {id: string}>(session: T, selection: UserRowSelection) {
  const { id } = session;
  return await pdb.User.where({ id }).select(...selection).first();
}

export function isExpired(instant: Temporal.InstantLike): boolean {
  const now = Temporal.Now.instant();
  return Temporal.Instant.compare(instant, now) < 0;
}

export async function extendSession(id: string) {
  const now = Temporal.Now.instant();
  const expires = now.add({ hours: SESSION_HOURS});
  await pdb.Session.where({ id }).update({ expires });
}
