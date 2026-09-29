<script lang="ts">
	import { getTodos, addTodo, deleteTodo, toggleComplete } from './todos.remote';
  import { slide, fade } from 'svelte/transition';
	let { text } = addTodo.fields;
</script>

<div class="w-1/2 p-2 prose">
	{#each await getTodos() as todo, i (todo.id)}
    {let shown = $state(false)}
    
		<div class="flex gap-2 p-2" transition:slide>
      <div class="flex-1">
        <div class="relative flex p-1">
					<p>{todo.completed ? "✅" : `${i+1}. `} {todo.text}</p>
					{#if todo.completed}
						<div class="absolute h-px w-9/10 top-1/2 bg-black/90" transition:slide={{axis: 'x'}}></div>
					{/if}
				</div>
        {#if shown}
          <p transition:fade={{duration: 150}} class="text-xs text-black/50">{todo.id}</p>
        {/if}
				
      </div>
			<button
			class="cursor-pointer rounded border p-2 hover:bg-black/10 active:bg-black/30 overflow-hidden"
			onclick={() => toggleComplete({id: todo.id, completed: todo.completed})}
			>✅</button>
			<button
				class="cursor-pointer rounded border p-2 hover:bg-black/10 active:bg-black/30 overflow-hidden"
				onclick={() => {
          shown = !shown
          console.log(`Text: ${todo.text}, ID: ${todo.id}`);
        }}>🆔</button
			>
			<button
				class="cursor-pointer rounded border p-2 hover:bg-black/10 active:bg-black/30 overflow-hidden"
				onclick={() => deleteTodo(todo.id)}>❌</button
			>
		</div>
	{/each}

	<form class="flex gap-2 p-2" {...addTodo}>
		<div class="flex flex-1 flex-col">
			<input class="w-1/1 rounded border p-2" {...text.as('text')} />
		</div>

		<button class="cursor-pointer rounded border p-2 hover:bg-black/10 active:bg-black/30"
			>Add</button
		>
	</form>
</div>
