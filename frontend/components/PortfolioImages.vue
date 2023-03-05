<script>
export default {
    name: "PortfolioImages",
    methods: {
    },
    props: {
      images: Array
    }
}
</script>
<template>
  <div class="row align-items-center text-center gx-3 justify-content-center">
      <div class="row justify-content-center">
        <div v-for="image in images"  class="col-lg-5 col-md-12 bg-gray shadow-lg pt-3 rounded-lg m-3 py-3">
          <h5 class=" fs-1 fw-semibold text-white">{{image.Name}}</h5>
          <a v-bind:href='"https://royalguardians.net/images/" + image.Name + ".png"' target="_blank"><img v-bind:src='"https://royalguardians.net/images/" + image.Name + ".png"'  alt="Skin von XYZ" class="d-block img-fluid"></a>
        </div>
      </div>
      </div>
</template>
<style scoped>
.bg-black {
  background-color: rgb(21 23 25/1);
}

.bg-gray {
  background-color: rgb(37 40 44/1);
}
</style>