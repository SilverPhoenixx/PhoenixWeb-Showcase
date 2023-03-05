
<script>
export default {
  name: "Navigator",
  props: ["loggedIn"]
}
</script>

<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
        <NuxtLink to="/" class="navbar-brand p-0">
            <img src="/assets/AriesBuildings.png" class="img-fluid" height="64" alt="PhoenixBrand">
        </NuxtLink>
        <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav px-8">
                <nuxt-link to="/" class="nav-item nav-link px-4 fs-4">
                    <i class="fas fa-home"> Home</i>
                </nuxt-link>
                <nuxt-link to="/team" class="nav-item nav-link px-4 fs-4">
                    <i class="fas fa-users"> Team</i>
                </nuxt-link>
              <a href="/portfolio" class="nav-item nav-link px-4 fs-4">
                <i class="fas fa-image"> Portfolio</i>
              </a>
                <a v-if="loggedIn == 'true'" href="/logout" class="nav-item nav-link px-4 fs-4"><i class="fa-solid fa-right-from-bracket text-danger"> Logout</i></a>
            </div>

        </div>
    </div>
</nav>
</template>
<style scoped>
.px-8 {
    padding-right: 4rem !important;
    padding-left: 4rem !important;
}
.rotate {
      transform: skew(-20deg);
}

.derotate {
        transform: skew(+20deg);
}

.nav-item:hover > *, .active {
    color: var(--bs-white);
    transition: 0.5s
}
</style>