<script>
  import { getForums, createForum } from "./forum.remote";
  let { text } = createForum.fields
</script>
<article class="prose">
  <a href={'/'}>Back to home</a>
  <h1>Forums</h1>
  <ul>
    {#each await getForums() as forum}
      <li>
        <a href={forum.path}>{forum.text}</a>
      </li>
    {/each}
  </ul>
  <form {...createForum}>
    <input {...text.as("text")} autocomplete="off">
  </form>
</article>