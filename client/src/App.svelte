<script>
    import router from 'page';
    import IndexPage from './routes/IndexPage.svelte';
    import CertPage from './routes/CertPage.svelte';

    let page;
    let params;

    router('/', () => (page = IndexPage));
    router(
        '/certificate/:query',
        (ctx, next) => {
            params = ctx.params;
            next();
        },
        () => (page = CertPage)
    );

    router.start();
</script>

<svelte:component this={page} {params} />

<style>
    :global(.snackbar) {
  border-radius: 5px;
  margin-left: 200px;
}

:global(.snackbar p) {
  font-family: 'Lato', sans-serif !important;
  font-weight: bold !important;
}

:global(.snackbar button) {
  font-family: 'Lato', sans-serif !important;
  font-weight: bold !important;
  background: rgba(255, 255, 255, 0.7) !important;
  border-radius: 4px !important;
  padding: 5px 10px 5px 10px !important;
  letter-spacing: 1.2px;
}

@media (max-width: 1300px) {
  :global(.snackbar) {
    margin-left: 50px;
  }
}

@media (max-width: 640px) {
  :global(.snackbar) {
      margin-left: 0px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
  }
}
</style>