import { query, form, command, getRequestEvent } from '$app/server';
import * as v from 'valibot';
import { pdb } from '../../prisma/db';
import { stringSchema } from '#lib/validate.ts';
import { getSessionFromCookies } from '#lib/session.ts';
import { redirect } from '@sveltejs/kit';

export const getTodos = query(
	async () => {
		const { cookies } = getRequestEvent()
		const session = await getSessionFromCookies(cookies)
		if (!session) redirect(303, "/login");
		const { userid } = session

		return await pdb.Todo.where({ userid }).all()
	});

export const addTodo = form(
	v.object({
		text: stringSchema
	}),
	async ({ text }) => {
		const { cookies } = getRequestEvent()
		const session = await getSessionFromCookies(cookies)
		if (!session) redirect(303, "/login");

		const { userid } = session;
		await pdb.Todo.create({ text, userid });
	}
);

export const deleteTodo = command(stringSchema, 
	async (id: string) => {
		await pdb.Todo
			.where({ id })
			.delete();
		getTodos().refresh();
});

export const toggleComplete = command(
	v.object({
		id: v.string(), completed: v.boolean()
	}), 
	async ({id, completed}) => {
		await pdb.Todo
			.where({ id })
			.update({ completed: !completed });
		getTodos().refresh();
})