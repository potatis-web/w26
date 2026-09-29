import { query, form, command } from '$app/server';
import type { TodoType } from '#lib/types.ts';
import * as v from 'valibot';
import { db } from '../../prisma/db';


export const getTodos = query(async () => await db.orm.public.Todo.all());

export const addTodo = form(
	v.object({
		text: v.pipe(v.string(), v.nonEmpty())
	}),
	async ({ text }) => {
		await db.orm.public.Todo.create({ text });
	}
);

export const deleteTodo = command(v.string(), async (id: string) => {
  await db.orm.public.Todo
		.where({ id })
		.delete();
	getTodos().refresh();
});

export const toggleComplete = command(v.object({id: v.string(), completed: v.boolean()}), async ({id, completed}) => {
	await db.orm.public.Todo
		.where({ id })
		.update({ completed: !completed });
	getTodos().refresh()
})
