<script lang="ts">
  import { login } from "./login.remote";
  let { username, password } = login.fields;
</script>
<main class="prose">
  <h1>Login</h1>
  <form {...login}>
    <label>
      <h2>Username:</h2>
      <input {...username.as("text")}>
    </label>
    <label>
      <h2>Password</h2>
      <input {...password.as("password")}>
    </label>
    <button type="submit">Login</button>

    {#if login.result?.success === false}
      <p>{login.result.text}</p>
    {/if}
  </form>
</main>