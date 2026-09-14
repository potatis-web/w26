import { query, form, command } from '$app/server';
import type { TodoType } from '#lib/types.ts';
import * as v from 'valibot';

let todos: TodoType[] = [
	{
		text: 'Add your first todo',
		id: crypto.randomUUID(),
		completed: false
	}
];

export const getTodos = query(async () => todos);

export const addTodo = form(
	v.object({
		myField: v.pipe(v.string(), v.nonEmpty())
	}),
	({ myField }) => {
		todos.push({
			text: myField,
			id: crypto.randomUUID(),
			completed: false
		});
	}
);

export const deleteTodo = command(v.string(), (id: string) => {
  let index = todos.findIndex((todo) => {
    return todo.id === id;
	});
  if (index > -1) {
    todos.splice(index, 1);
  }
  getTodos().refresh()
});

export const toggleComplete = command(v.string(), async (id: string) => {
	let index = todos.findIndex((todo) => {
		return todo.id === id;
	})
	todos[index].completed = !todos[index].completed 
	getTodos().refresh()
})
