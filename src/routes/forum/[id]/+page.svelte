<script lang="ts">
  import Input from "#lib/components/Input.svelte";
  import Button from "#lib/components/Button.svelte";
  import Message from "#lib/components/Message.svelte";
  import { getForum, createMessage, getMessages } from "#lib/remote/forum.remote.js";
  import { formatTemporal } from "#lib/misc.js";
  
  let { params } = $props()
  
  let forum = $derived(await getForum(params.id));

  const { text, forumid } = createMessage.fields;
  
  

</script>
<main class="mx-auto flex h-90% max-w-2xl flex-col px-4 py-6">
  {#if params.id}
    {#if forum}
      <header class="mb-4">
        <h1 class="text-xl font-medium group">{forum.text} <Button text={"✍️"} /></h1>
        <p class="text-sm">Created by {forum.user?.name}</p>
        <p class="text-sm text-gray-500">Created {formatTemporal(forum.created_at)}</p>
      </header>

      <div class="flex-1 divide-y divide-gray-200 overflow-y-auto rounded-md border border-gray-300 bg-white">
        {#each await getMessages(params.id) as message}
          <Message {message}/>
        {/each}
      </div>

      <form {...createMessage} class="mt-4 flex gap-2">
        <Input {...text.as("text")} class={"flex-1"} placeholder={"Type something..."} disabled={createMessage.submitted}/>
        <Button text={"Send"}/>
        <input {...forumid.as("hidden", params.id)} />
        
      </form>
    {:else}
      <p class="text-sm text-gray-500">Forum error</p>
    {/if}
  {/if}
</main>