<script lang="ts">
  import { getForum, createMessage, getMessages, getUser } from "../forum.remote";

  
  let { params } = $props()
  
  let forum = $derived(await getForum(params.id));

  const { text, forumid } = createMessage.fields;
  
  function formatTemporal(instant: Temporal.Instant): string {
    if (!instant) return "";
    const now = Temporal.Now.zonedDateTimeISO()
    const ztd = instant.toZonedDateTimeISO(Temporal.Now.timeZoneId())
    const time = `${String(ztd.hour).padStart(2,"0")}:${ztd.minute}`

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
<main class="prose h-screen flex flex-col p-4">
  <a href={"/forum"}>Back to Forums</a>
  {#if params.id}
    {#if forum}
      <h1>{forum.text}</h1>
      <h2>Created: <i>{formatTemporal(forum.created_at)}</i></h2>
      <h2>Messages</h2>
      <div class="overflow-y-scroll flex-1">
        {#each await getMessages(params.id) as message}
          <div class="flex items-center gap-2 px-2 py-1 hover:bg-black/5 rounded">
            <span class="text-xs text-black/40">
              {formatTemporal(message.created_at)}
            </span>
            <span class="font-medium">
              {message.user?.name ?? "Unknown user"}:
            </span>
            <span>{message.text}</span>
          </div>
        {/each}
      </div>
      <form {...createMessage}>
        <input
          {...text.as("text")}
          class="w-full rounded border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
          autocomplete="off"
        />
        <input {...forumid.as("hidden", params.id)} >
      </form>
    {:else}
      <h1>Forum error</h1>
    {/if}
  {/if}
</main>