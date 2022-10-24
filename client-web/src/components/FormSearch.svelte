<script>
  export let findResults = [];

  export let getDetails;
</script>

<div class="searchContainer p-3">
  {#each findResults as result}
    <a
      class="my-3"
      style="cursor:pointer"
      on:click={() => getDetails(result.url)}>{result.title}</a
    >
    <br />
  {/each}
</div>

<style>
  .searchContainer {
    background-color: lightblue;
  }
</style>
