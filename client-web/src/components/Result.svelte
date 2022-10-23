<script>
  import { Card, CardBody, CardHeader, CardTitle } from "sveltestrap";
  import PriceDetail from "./PriceDetail.svelte";
  export let product;
</script>

<Card class="my-2">
  <CardHeader>
    <CardTitle>
      {product.title}
    </CardTitle>
  </CardHeader>
  <CardBody>
    {#each product.prices as detail}
      <PriceDetail {detail} />
    {/each}
  </CardBody>
</Card>
