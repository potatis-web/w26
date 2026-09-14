<script lang="ts">
  import type { ForumType } from "#lib/types.ts";

  import { getForumByPath, createMessage } from "../forum.remote";
  import { formatTimeHM } from "@grilymannen/grily-utils";

  
  let { params } = $props()

  const response = $derived(await getForumByPath(params.id));
  const { text, path } = createMessage.fields;

</script>
<main class="prose h-screen flex flex-col p-4">
  <a href={"/forum"}>Back to Forums</a>
  {#if response}
    {const forum: ForumType = $derived(response)}
    <h1>{forum.text}</h1>
    <h2>Messages</h2>
    <div class="overflow-y-scroll flex-1">
      {#each forum.messages as message}
        <div class="flex item-center p-2 hover:bg-black/10 rounded ">
          <p class="text-black/50">{formatTimeHM(message.date)}</p>
          <h3 class="">{message.text}</h3>
        </div>
      {/each}
    </div>
  {/if}
  <form {...createMessage}>
    <input {...text.as("text")} class="w-1/1" autocomplete="off">
    <input {...path.as("hidden", params.id)} >
  </form>
</main>