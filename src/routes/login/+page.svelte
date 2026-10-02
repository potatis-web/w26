<script lang="ts">
  import { login } from "../account.remote";
  let { name, password } = login.fields;
</script>

<main class="prose">
  <h1>Login</h1>
  <form {...login}>
    <label>
      <h2>Username:</h2>
      <input {...name.as("text")}>
    </label>
    <label>
      <h2>Password</h2>
      <input {...password.as("password")}>
    </label>
    <button type="submit">Login</button>

    {#if login.result?.success === false}
      <p>{@html login.result.text}</p>
    {/if}
  </form>
  <p>No account? <a href={"/register"}>Register here!</a></p>

  {#if login.submitted}
    <div class="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div class="animate-spin size-4">loading</div>
    </div>
  {/if}


</main>