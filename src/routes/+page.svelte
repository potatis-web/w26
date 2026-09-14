<script>
  let links = [
    {path: "/todo", text: "Todo page"},
    {path: "/forum", text: "Forum page"},
    {path: "/login", text: "Login page (already logged in)"},
  ];
</script>

<main class="prose">
  <h1>Pages</h1>
  <ul>
    {#each links as link}
      <li>
        <a href={link.path}>{link.text} </a>
      </li>
    {/each}
  </ul>
</main>