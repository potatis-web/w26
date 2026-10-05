import { query, form, command } from '$app/server';
import * as v from 'valibot';
import { pdb } from '../../prisma/db';
import { stringSchema } from '#lib/validate.ts';


export const getTodos = query(async () => await pdb.Todo.all());

export const addTodo = form(
	v.object({
		text: stringSchema
	}),
	async ({ text }) => {
		await pdb.Todo.create({ text });
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