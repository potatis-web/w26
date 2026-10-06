<script>
  import Button from "#lib/components/Button.svelte";
  import Input from "#lib/components/Input.svelte";
  import { getForums, createForum } from "./forum.remote";
  let { text } = createForum.fields
</script>
<article class="prose">
  <a href={'/'}>Back to home</a>
  <h1>Forums</h1>
  <ul>
    {#each await getForums() as forum}
      <li>
        <a href={`forum/${forum.id}`}>{forum.text}</a>
      </li>
    {/each}
  </ul>
  <form {...createForum} class="flex gap-2">
    <Input {...text.as("text")}/>
    <Button text={"Create forum"}/>
  </form>
</article>