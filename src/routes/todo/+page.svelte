<script lang="ts">
	import { getTodos, addTodo } from '#lib/remote/todos.remote.ts';

  import Button from '#lib/components/Button.svelte';
  import Card from '#lib/components/Card.svelte';
  import Input from '#lib/components/Input.svelte';
  import Todo from '#lib/components/Todo.svelte';
	
	let { text } = addTodo.fields;
</script>


<Card>
	{#each await getTodos() as todo, i (todo.id)}
		<Todo {todo} {i}/>
	{/each}
	
	<form class="flex gap-2 p-2" {...addTodo}>
		<div class="flex flex-1 flex-col">
			<Input {...text.as('text')}/>
		</div>
		
		<Button text={"Add"}/>
		
	</form>
</Card>