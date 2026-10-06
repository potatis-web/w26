<script lang="ts">
  import Button from '#lib/components/Button.svelte';
  import Input from '#lib/components/Input.svelte';
	import { getTodos, addTodo, deleteTodo, toggleComplete } from './todos.remote';
  import { slide, fade } from 'svelte/transition';
	let { text } = addTodo.fields;
</script>

<div class="w-1/2 p-2">
	<a href={"/"}>Back to home</a>
	{#each await getTodos() as todo, i (todo.id)}
    {let shown = $state(false)}

<div
  class="flex items-center gap-3 border-b border-black/10 px-2 py-2"
  transition:slide
>
  <div class="min-w-0 flex-1">
    <div class="relative">
      <p class:opacity-40={todo.completed} class="truncate">
        {todo.completed ? "✓" : `${i + 1}.`} {todo.text}
      </p>

      {#if todo.completed}
        <div
          class="absolute left-0 top-1/2 h-px w-full bg-black/40"
          transition:slide={{ axis: "x" }}
        ></div>
      {/if}
    </div>

    {#if shown}
      <p
        transition:fade={{ duration: 150 }}
        class="mt-0.5 text-[11px] text-black/40"
      >
        {todo.id}
      </p>
    {/if}
  </div>

  <div class="flex shrink-0 gap-1">
    <button
      class="rounded p-1.5 text-sm opacity-60 hover:bg-black/5 hover:opacity-100 active:bg-black/10"
      onclick={() =>
        toggleComplete({ id: todo.id, completed: todo.completed })}
      aria-label="Toggle completed"
    >
      ✓
    </button>

    <button
      class="rounded p-1.5 text-sm opacity-60 hover:bg-black/5 hover:opacity-100 active:bg-black/10"
      onclick={() => {
        shown = !shown
        console.log(`Text: ${todo.text}, ID: ${todo.id}`)
      }}
      aria-label="Show ID"
    >
      #
    </button>

    <button
      class="rounded p-1.5 text-sm text-red-500/60 hover:bg-red-500/5 hover:text-red-500 active:bg-red-500/10"
      onclick={() => deleteTodo(todo.id)}
      aria-label="Delete"
    >
      ×
    </button>
  </div>
</div>
	{/each}

	<form class="flex gap-2 p-2" {...addTodo}>
		<div class="flex flex-1 flex-col">
			<Input {...text.as('text')} />
		</div>

		<Button text={"Add"}/>

	</form>
</div>
