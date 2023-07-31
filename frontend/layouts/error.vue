<template>
  <div>
    <Navigator/>
    <div class="container-fluid min-vh-100 p-0">
      <div class="siteHeader">
        <div class="d-flex justify-content-center align-items-center h-100">
          <h1 class="display-4"
              style="font-weight: bold; color: #fff; text-shadow: 12px 24px 18px rgb(0 0 0 / 90%); letter-spacing: 1px; ">
            Willkommen auf
            <br>
            <span style="display: inline-block; transform: skew(-30deg); font-weight: bold; background-color: #fff;">
                    <p class="display-4 p-2"
                       style="font-weight: bold; transform: skew(30deg); color: #000;text-shadow: none;">
                    Seraphim Buildings
                </p>
                </span>
          </h1>
        </div>
      </div>
      <div class="p-4 mb-5 bg-dark"></div>
      <div class="container-fluid">
        <div class="container">
          <div class="row">
            <div class="col-12 mt-5">
              <h1 class="display-4 fw-bold">
                Die Seite wurde nicht gefunden!
              </h1>
              <a class="btn btn-primary" href="./">Zurück zur Startseite</a>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid pb-5"></div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navigator from "../components/Navigator"
import Footer from "../components/Footer"

export default {
  components: {
    Navigator,
    Footer
  },
  head: {
    title: 'Seraphim Buildings - Home',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'stylesheet', href: "/custom.css"}
    ]
  },
  name: 'ErrorPage'
}
</script>

<style scoped>

.siteHeader {
  background-image: url('/assets/TeamPose.png');
  background-size: cover;
  background-position: 50% 20%;
  height: 250px;
}
</style>