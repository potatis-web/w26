import { query, command, form } from "$app/server";
import { kebabCase } from "@emilien/kebab-case";
import * as v from 'valibot'
import type { ForumType, MessageType } from "#lib/types.ts";

const forums: ForumType[] = [
  forumObj("First forum")
];

function forumObj(text: string): ForumType {
  return {
    text: text,
    path: `/forum/${kebabCase(text)}`,
    messages: []
  }
}

function messageObj(text: string): MessageType {
  return {
    text: text,
    date: new Date()
  }
}

export const getForums = query(async () => forums);

const forumFind = (path: string) => {
  return forums.find((forum) => kebabCase(forum.text) === path)
}

export const getForumByPath = query(v.string(), forumFind)

export const createMessage = form(v.object({
  text: v.string(), 
  path: v.string()
}), async ({ text, path }) => {
  const target = forumFind(path);
  target?.messages.push(messageObj(text));
});

export const createForum = form(v.object({
  text: v.string()
}), async ({text}) => {
  forums.push(forumObj(text))
});