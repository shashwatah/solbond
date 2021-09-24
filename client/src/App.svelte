<script>
  import router from "page";
  import IndexPage from "./routes/IndexPage.svelte";
  import CertPage from "./routes/CertPage.svelte";

  let page;
  let params;

  router('/', () => (page = IndexPage));
  router('/cert', () => (page = CertPage));

  router.start();
</script>

<svelte:component this="{page}" />