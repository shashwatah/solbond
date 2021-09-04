<script>
  import router from "page";
  import Home from "./routes/Home.svelte";
  import Certificate from "./routes/Certificate.svelte";

  let page;
  let params;

  router('/', () => (page = Home));
  router('/cert', () => (page = Certificate));

  router.start();
</script>

<svelte:component this="{page}" params="{params}" />