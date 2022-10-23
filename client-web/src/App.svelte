<script>
  import {
    CardBody,
    Container,
    FormGroup,
    Input,
    Label,
    Styles,
    Card,
    CardHeader,
    Button,
    Spinner,
  } from "sveltestrap";
  import axios from "axios";
  import baseURL from "./baseURL";
  import FormSearch from "./components/FormSearch.svelte";
  import Result from "./components/Result.svelte";
  let title = "";
  let findResults = [];
  let details = null;
  let loading = false;
  function search() {
    let text = title;
    axios.get(`${baseURL}getSuggestions/${text}`).then((data) => {
      findResults = data.data;
    });
  }
  function getDetails(link) {
    loading = true;
    axios
      .post(`${baseURL}getDetails`, {
        link,
      })
      .then((res) => {
        details = res.data;
      })
      .finally((data) => {
        loading = false;
        title = "";
        findResults = [];
      });
  }
  $: title.length > 0 ? search(title) : [];
</script>

<Styles />
<Container class="my-2">
  <Card>
    <CardHeader>En Uygun Fiyat Arama Motoru</CardHeader>
    <CardBody>
      <div>
        <FormGroup floating label="Aranacak Kelimeyi Yazınız">
          <Input bind:value={title} placeholder="I phone 14 pro max" />
        </FormGroup>
        {#if findResults.length > 0}
          <FormSearch {findResults} {getDetails} />
        {/if}
      </div>
    </CardBody>
  </Card>
  {#if loading}
    <div
      class="text-center d-flex align-items-center justify-content-center"
      style="height: 200px"
    >
      <Spinner />
    </div>
  {:else if details != null}
    <Result product={details} />
  {/if}
</Container>
