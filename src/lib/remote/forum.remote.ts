import { query, form, getRequestEvent } from "$app/server";
import * as v from "valibot";
import { pdb } from "../../prisma/db";
import { redirect } from "@sveltejs/kit";
import { extendSession, getSessionFromCookies, isExpired } from "../session";
import { stringSchema } from "../schema";

export const getForums = query(async () => {
  return await pdb.Forum.include("messages", (messages) => {
    return messages.count();
  }).all();
});

export const getUser = query(stringSchema, async (id) => {
  return await pdb.User.first({ id });
});

export const getForum = query(stringSchema, async (id: string) => {
  return await pdb.Forum.include("user", (user) => {
    return user.select("name");
  }).first({ id });
});

export const getMessages = query(stringSchema, async (forumid: string) => {
  return await pdb.Message.where({ forumid })
    .include("user", (user) => {
      return user.select("name");
    })
    .all();
});

export type Message = Awaited<ReturnType<typeof getMessages>>[number];

export const createMessage = form(
  v.object({
    text: stringSchema,
    forumid: stringSchema,
  }),
  async ({ text, forumid }) => {
    const { cookies } = getRequestEvent();
    const session = await getSessionFromCookies(cookies);
    if (!session) redirect(303, "/login");

    const { expires, userid, id } = session;
    if (isExpired(expires)) redirect(303, "/login");
    await extendSession(id);
    await pdb.Message.create({ forumid, text, userid });
  },
);

export const createForum = form(
  v.object({
    text: stringSchema,
  }),
  async ({ text }) => {
    const { cookies } = getRequestEvent();
    const session = await getSessionFromCookies(cookies);
    if (!session) redirect(303, "/login");

    const { expires, userid, id } = session;
    if (isExpired(expires)) redirect(303, "/login");
    await extendSession(id);
    await pdb.Forum.create({ text, userid });
  },
);
