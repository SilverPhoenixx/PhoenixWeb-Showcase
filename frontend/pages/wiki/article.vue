<template>
  <div>
    <Navigator :username="this.loginUsername"/>
    <div class="container-fluid min-vh-100 p-0">
      <div class="siteHeader centerImage">
        <div class="d-flex justify-content-center align-items-center h-100">
          <h1 class="display-4 text-center" style="font-weight: bold; color: #fff; text-shadow: 12px 24px 18px rgb(0 0 0 / 90%); letter-spacing: 1px; ">
            <span style="display: inline-block; transform: skew(-30deg); font-weight: bold; background-color: #fff;">
              <p class="display-4" style="font-weight: bold; padding: 5px 40px;transform: skew(30deg); color: #000;text-shadow: none;">
                Artikel
              </p>
            </span>
          </h1>
        </div>
      </div>
      <div class="p-4 bg-dark"></div>
      <div class="container-fluid my-3">
        <div class="row p-3 justify-content-center">
          <div class="col-10 shadow-lg">
            <div class="row">
              <div class="col-12 centerImage" :style='"background-image: url(" + this.headerURL + ");"'></div>
              <div class="col-12 pt-2">
                <b class="fs-3 pt-2">{{this.title}}</b>
              </div>
              <div class="col-12 pt-2 pb-4 content" v-html="this.content">
              </div>
              <hr>
              <div class="col-12 pb-3">
                <span>Erstellt am: {{this.date}} von {{this.username}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer :username="this.loginUsername"/>
  </div>
</template>

<style>
.siteHeader {
  background-image: url('/assets/BannerHaikali.png');
}

.centerImage {
  background-size: cover;
  background-position: center;
  height: 250px;
}

.renderImg {
  max-width: 50%;
}

* {
  word-break: break-word;
}

</style>

<script>
import Navigator from "../../components/Navigator"
import Footer from "../../components/Footer"
export default {
  components: {
    Navigator,
    Footer
  },
  asyncData(context) {
    return {
      loginUsername: context?.req?.session?.username,
      title: context?.req?.data?.Title,
      content: context?.req?.data?.Content,
      headerURL: context?.req?.data?.HeaderURL,
      date: context?.req?.data?.Date,
      username: context?.req?.data?.Username
    }
  },
  head: {
    title: 'Seraphim Buildings - Artikel',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'stylesheet', href: "/custom.css"}
    ]
  },
  name: 'WikiArticle'
}
</script>