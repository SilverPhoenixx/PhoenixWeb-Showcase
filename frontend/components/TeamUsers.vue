<script>
export default {
    name: "TeamUsers",
    props: {
        team: Map,
    },
    methods: {
    },
}
</script>
<template>
  <div class="container">
  <div class="row align-items-center text-center gx-3 justify-content-center" v-if="this.team != undefined">
      <div class="row rows-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-1 py-3 justify-content-center">
        <div v-for="user in team" :key="user.UUID" class="col bg-gray shadow-lg pt-3 rounded-lg m-3 py-3">
          <img v-bind:src='"https://crafatar.com/renders/head/" + user.UUID'  alt="Skin von XYZ" class="mx-auto d-block img-fluid">
          <h5 class=" fs-5 fw-semibold text-info">{{user.Name}}</h5>
          <div class="text-white-50">{{user.Role}}</div>
          <div class="container">
            <div class="row justify-content-center">
            <span v-for="ability in user.Abilities" class="col bg-black px-3 rounded-pill text-white d-inline m-1">{{ ability }}</span>
              </div>
          </div>
        </div>                
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