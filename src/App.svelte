<script>
  import Router from "svelte-spa-router";
  import { routes } from "./routes";
  import { onMount } from "svelte";
  import toast, { Toaster } from "svelte-french-toast";
</script>

<Toaster />
<Router {routes} />
