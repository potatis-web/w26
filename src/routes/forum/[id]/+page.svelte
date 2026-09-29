<script lang="ts">
  import { getForumText, createMessage, getMessages } from "../forum.remote";

  
  let { params } = $props()

  // const forum = $derived(await getForumById(params.id));
  const { text, forumid } = createMessage.fields;
  function formatTemporal(instant: Temporal.Instant | undefined): string {
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
      {let forum = $derived(await getForumText(params.id))}
      <h1>{forum?.text ?? "a"}</h1>
      <h2>created: <i>{formatTemporal(forum?.created_at)}</i></h2>
      <h2>Messages</h2>
      <div class="overflow-y-scroll flex-1">
        {#each await getMessages(params.id) as message}
        <div class="flex item-center p-2 hover:bg-black/10 rounded ">
        
          <p class="text-black/50">{formatTemporal(message.created_at)}</p>
          <h3 class="">{message.text}</h3>
        </div>
        {/each}
      </div>
      
      <form {...createMessage}>
        <input {...text.as("text")} class="w-1/1" autocomplete="off">
        <input {...forumid.as("hidden", params.id)} >
      </form>
    {/if}
</main>