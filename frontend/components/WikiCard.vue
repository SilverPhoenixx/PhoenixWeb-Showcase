<template>
  <div class="card">
  <a :href='"/wiki/article?title=" + Title' class="text-decoration-none text-black">
    <div class="card-body">
      <h5 class="card-title">{{Title}}</h5>
      <p>Erstellt an: {{WikiDate}} von {{Author}}</p>
    </div>
  </a>
    <a v-if="this.$parent.editPermission" :href='"/wiki/edit?title=" + Title' class="text-decoration-none btn">
      Bearbeiten
    </a>
  </div>
</template>

<script>
  export default {
    name: "WikiCard",
    props: {
      Title: String,
      Author: String,
      WikiDate: String,
    },
  }
</script>

<style scoped>
p {
  margin: 0;
}
</style>