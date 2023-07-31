<template>
  <div>
    <Navigator :username="this.username"/>
    <div class="container-fluid min-vh-100 p-0">
      <div class="siteHeader">
        <div class="d-flex justify-content-center align-items-center h-100">
          <h1 class="display-4 text-center" style="font-weight: bold; color: #fff; text-shadow: 12px 24px 18px rgb(0 0 0 / 90%); letter-spacing: 1px; ">
            <span style="display: inline-block; transform: skew(-30deg); font-weight: bold; background-color: #fff;">
              <p class="display-4" style="font-weight: bold; padding: 5px 40px;transform: skew(30deg); color: #000;text-shadow: none;">
                Bewerbung
              </p>
            </span>
          </h1>
        </div>
      </div>
      <div class="p-4 bg-dark"></div>
      <div class="container">
        <div class="row">
          <div class="col-md-9 offset-md-2 p-3 mt-5 shadow-lg">
            <div v-if="this.message != null">
              <span :class="[{'form-control mb-4 text-white': true}, type ? 'bg-' + type : '']">{{this.message}}</span>
            </div>
            <form method="post" action="/apply">
              <b class="fs-5">Persönliche Informationen</b>
              <div class="input-group input-group-sm mb-1">
                <span class="input-group-text">Name*</span>
                <input type="text" class="form-control" name="Name" id="Name" maxlength="32" required>
              </div>
              <div class="input-group input-group-sm mb-1">
                <span class="input-group-text">Minecraft-Name*</span>
                <input type="text" class="form-control" name="MinecraftName" id="MinecraftName" maxlength="16" placeholder="Steve" required>
              </div>
              <div class="input-group input-group-sm mb-1">
                <span class="input-group-text">Alter</span>
                <input type="number" class="form-control" name="Age" id="Alter" min=12 value=12>
              </div>
              <div class="input-group input-group-sm mb-1">
                <span class="input-group-text">Discord*</span>
                <input type="text" class="form-control" name="Discord" id="Discord" placeholder="Beispiel#1234" required>
              </div>
              <b class="fs-5">Informationen zu der Stellung</b>
              <div class="input-group input-group-sm mb-1">
                <span class="input-group-text">Position*</span>
                <select name="Position" class="form-select form-select-sm" aria-label="form-select-sm example" required>
                  <option value="">Wähle eine Position</option>
                  <option value="Content">Content</option>
                  <option value="Developer">Developer</option>
                  <option value="Supporter">Supporter</option>
                </select>
              </div>
              <div class="input-group input-group-sm mb-1">
                <span class="input-group-text">Portfolio</span>
                <input type="text" class="form-control" name="Portfolio" id="Portfolio">
              </div>
              <div class="mb-3">
                <span class="input-group-text my-2">Persönlche Vorstellung und Erfahrungen in der Position</span>
                <client-only>
                  <TipTapEditor v-model="content" class="mb-2" />
                  <input id="description" type="text" name="Description" hidden :value='this.content'>
                </client-only>
              </div>
              <div class="input-group input-group-sm text-center d-inline-block">
                <button type="submit" class="btn btn-primary px-5 p-3"><b>Bewerben</b></button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <Footer :username="this.username"/>
  </div>
</template>

<style scoped>
.siteHeader {
  background-image: url('/assets/BannerHaikali.png');
  background-size: cover;
  background-position: center;
  height: 250px;
}
</style>

<script>
import Navigator from "../components/Navigator"
import Footer from "../components/Footer"
import TipTapEditor from '../components/TipTapEditor.vue'
export default {
  components: {
    Navigator,
    Footer,
    TipTapEditor
  },
  asyncData(context) {
    return {
      message: context?.req?.data?.message,
      type: context?.req?.data?.type,
      username: context?.req?.session?.username
    }
  },
  data () {
    return {
      content: ""
    }
  },
  head: {
    title: 'Seraphim Buildings - Bewerben',
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
  name: 'ApplyPage'
}
</script>