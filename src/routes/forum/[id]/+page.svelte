<script lang="ts">
  import { getForum, createMessage, getMessages, getUser } from "../forum.remote";
  import Input from "#lib/components/Input.svelte";
  import Button from "#lib/components/Button.svelte";
  
  let { params } = $props()
  
  let forum = $derived(await getForum(params.id));

  const { text, forumid } = createMessage.fields;
  
  function formatTemporal(instant: Temporal.Instant): string {
    if (!instant) return "";
    const now = Temporal.Now.zonedDateTimeISO()
    const ztd = instant.toZonedDateTimeISO(Temporal.Now.timeZoneId())
    const time = `${String(ztd.hour).padStart(2,"0")}:${String(ztd.minute).padStart(2,"0")}`

    const isToday = now.year === ztd.year && now.dayOfYear === ztd.dayOfYear;
    const isYesterday = now.year === ztd.year && now.dayOfYear - 1 === ztd.dayOfYear; 
    if (isToday) {
      return `Today at ${time}`
    }
    if (isYesterday) {
      return `Yesterday at ${time}`
    }

    return `${ztd.year}/${ztd.month}/${ztd.day}`
  }

</script>
<main class="mx-auto flex h-90% max-w-2xl flex-col px-4 py-6">
  {#if params.id}
    {#if forum}
      <header class="mb-4">
        <h1 class="text-xl font-medium group">{forum.text} <Button text={"✍️"} /></h1>
        <p class="text-sm">Created by {forum.user?.name}</p>
        <p class="text-sm text-gray-500">Created {formatTemporal(forum.created_at)}</p>
      </header>

      <div class="flex-1 divide-y divide-gray-200 overflow-y-auto rounded-md border border-gray-300">
        {#each await getMessages(params.id) as message}
          <div class="px-3 py-2 hover:bg-gray-50">
            <p class="text-sm">
              <span class="font-medium">{message.user?.name ?? "Unknown user"}</span>
              <span class="ml-1 text-xs text-gray-400">{formatTemporal(message.created_at)}</span>
            </p>
            <p class="text-sm wrap-break-words">{message.text}</p>
          </div>
        {/each}
      </div>

      <form {...createMessage} class="mt-4 flex gap-2">
        <Input {...text.as("text")} class={"flex-1"} placeholder={"Type something..."}/>
        <Button text={"Send"}/>
        <input {...forumid.as("hidden", params.id)} />
        
      </form>
    {:else}
      <p class="text-sm text-gray-500">Forum error</p>
    {/if}
  {/if}
</main>