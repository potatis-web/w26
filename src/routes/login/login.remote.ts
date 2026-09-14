import { form, getRequestEvent } from "$app/server";
import { redirect } from "@sveltejs/kit";
import * as v from "valibot";

export const login = form(
  v.object({
    username: v.string(),
    password: v.string(),
  }),
  async ({ username, password }) => {
    if (username !== "arne")
      return { success: false, text: "Username doesn't exist" };
    if (password !== "1965") return { success: false, text: "Wrong password" };

    const { cookies } = getRequestEvent();
    cookies.set("logged_in", "yep", { path: "/", httpOnly: true });
    redirect(303, "/");
  },
);
