<script>
  import Button from "#lib/components/Button.svelte";
  import Input from "#lib/components/Input.svelte";
  import { getForums, createForum } from "./forum.remote";
  let { text } = createForum.fields
</script>
<h1 class="mb-4 text-xl font-medium">Forums</h1>

<ul class="divide-y divide-gray-200 rounded-md border border-gray-300">
  {#each await getForums() as forum}
    <li>
      <a
        href={`/forum/${forum.id}`}
        class="block px-3 py-2 text-sm hover:bg-gray-50 active:bg-gray-100"
      >{forum.text} - {forum.messages} messages</a>
    </li>
  {/each}
</ul>

<form {...createForum} class="mt-6 flex gap-2">
  <Input {...text.as("text")} class="flex-1" />
  <Button text="Create forum" />
</form>