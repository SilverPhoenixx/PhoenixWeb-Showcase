<template>
    <tr :id='"warp" + this.name'>
        <td>{{this.name}}</td>
        <td>{{this.x}}</td>
        <td>{{this.y}}</td>
        <td>{{this.z}}</td>
        <td>{{this.yaw}}</td>
        <td>{{this.pitch}}</td>
        <td><i @click='removeWarp()' class="fa-solid fa-trash text-danger pbtn"></i></td>
    </tr>
</template>
<script>
export default {
    name: "Warp",
    methods: {
        removeWarp() {
            this.$parent.removeWarp(this.name);
        }
    },
    props: ["name", "x", "y", "z", "yaw", "pitch"]
}
</script>
<style>
.pbtn:hover {
  filter: brightness(75%) !important;
}
</style>