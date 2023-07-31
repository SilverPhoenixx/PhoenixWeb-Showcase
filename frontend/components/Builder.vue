<template>
    <tr :id='"builder" + this.name'>
        <td><img class="w-50" :src='"https://visage.surgeplay.com/face/" + this.uuid'></td>
        <td><span>{{this.name}}</span></td>
        <td><i @click='removeBuilder()' class="fa-solid fa-trash text-danger pbtn"></i></td>
    </tr>
</template>
<script>
export default {
    name: "Warp",
    methods: {
        removeBuilder() {
            this.$parent.removeBuilder(this.name);
        }
    },
    props: ["name", "uuid"]
}
</script>
<style>
.pbtn:hover {
  filter: brightness(75%) !important;
}
</style>