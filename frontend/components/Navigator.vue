
<script>
export default {
  name: "Navigator",
  props: ["username"]
}
</script>

<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
        <NuxtLink to="/" class="navbar-brand p-0">
            <img src="/assets/Logo.png" class="img-fluid" height="64" alt="PhoenixBrand">
        </NuxtLink>
        <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav px-8">
              <li>
                <a href="/" class="nav-item nav-link px-4 fs-4">
                    <i class="fas fa-home"> Home</i>
                </a>
              </li>
              <li>
                <a href="/team" class="nav-item nav-link px-4 fs-4">
                    <i class="fas fa-users"> Team</i>
                </a>
            </li>
              <li>
              <a href="/portfolio" class="nav-item nav-link px-4 fs-4">
                <i class="fas fa-image"> Portfolio</i>
              </a>
            </li>
              <li>
              <a href="/wiki" class="nav-item nav-link px-4 fs-4">
                <i class="fas fa-book"> Wiki</i>
              </a>
            </li>
              <li>
            </li>
              <li v-if="username != undefined" class="nav-item dropdown">
                <a class="nav-link dropdown-toggle px-4 fs-4" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="fa-solid fa-user"> Profil</i>
                </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="/profil">Profil</a></li>
                <li><a class="dropdown-item" href="/worlds?page=1">Welten</a></li>
                <li><hr class="dropdown-divider"></li>
                <a href="/logout" class="dropdown-item text-danger">
                  <i class="fa-solid fa-right-from-bracket text-danger"> Logout</i>
                </a>
              </ul>
              </li>
            </ul>
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