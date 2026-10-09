import * as v from "valibot";

export const stringSchema = v.pipe(v.string(), v.nonEmpty(), v.trim());

export const authSchema = v.object({
  username: stringSchema,
  password: stringSchema,
});
