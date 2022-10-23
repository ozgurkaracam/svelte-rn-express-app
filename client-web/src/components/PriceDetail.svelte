<script>
  export let detail;
</script>

<div class="row">
  <div class="col-3">
    <img src={detail.img} class="img img-fluid" alt="" />
  </div>
  <div class="col-6">
    <a href={detail.link} target="_blank">{detail.title}</a> <br />
    <small
      class={detail.cargo == "Ücretsiz Kargo" ? "text-success" : "text-danger"}
      >{detail.cargo} - {detail.cargoTime}</small
    >
  </div>
  <div class="col-3">
    <h4>
      {detail.price} TL
    </h4>
  </div>
</div>
