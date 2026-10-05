import { query, form, getRequestEvent } from "$app/server";
import * as v from 'valibot'
import { pdb } from "../../prisma/db";
import { redirect } from "@sveltejs/kit";

export const getForums = query(async () => await pdb.Forum.all());


export const getForumText = query(v.string(), async (id: string) => {
  return await pdb.Forum.where({ id }).first();
});

export const getMessages = query(v.string(), async (forumid: string) => {
  return await pdb.Message.where({ forumid }).all();
});

export const createMessage = form(v.object({
  text: v.string(), 
  forumid: v.string()
}), async ({ text, forumid }) => {
  await pdb.Message.create({ forumid, text })
});

export const createForum = form(v.object({
  text: v.string()
}), async ({ text }) => {
  const { cookies } = getRequestEvent()
  const id = cookies.get("session")
  const session = await pdb.Session.first({ id });
  if (!session) return;
  let { expires, userid } = session;
  let now = Temporal.Now.instant()
  const isExpired = Temporal.Instant.compare(expires, now) < 0;
  if (isExpired) {
    redirect(303, "/login")
  }
  await pdb.Forum.create({ text, userid })
});