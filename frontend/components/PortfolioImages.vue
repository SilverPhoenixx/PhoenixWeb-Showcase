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
          <div :id="image.Name" class="carousel py-3">
            <div class="carousel-inner">
              <div v-for="picture in image.Pictures" v-if="image.Pictures[0] == picture" class="carousel-item active w-100">
                <a v-bind:href='"/assets/" + image.Name + "/" + picture' target="_blank"><img v-bind:src='"/assets/" + image.Name + "/" + picture '  :alt='"Bild " + picture' class="d-block img-fluid"></a>
              </div>
              <div v-else class="carousel-item w-100">
                <a v-bind:href='"/assets/" + image.Name + "/" + picture' target="_blank"><img v-bind:src='"/assets/" + image.Name + "/" + picture '  :alt='"Bild " + picture' class="d-block img-fluid"></a>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" :data-bs-target='"#" + image.Name' data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" :data-bs-target='"#" + image.Name' data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
          <h5 class="fs-5 text-white">{{image.Description}}</h5>
          <h5 class="fs-5 text-white">Built by {{image.Builder}}</h5>
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