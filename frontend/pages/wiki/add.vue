<template>
  <div>
    <Navigator :username="this.username"/>
    <div class="container-fluid min-vh-100 p-0">
      <div class="siteHeader">
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
      <div class="container">
        <div class="row">
          <div class="col-md-11 p-3 mt-5 shadow-lg">
            <div ref="errorMessageHolder" id="errorMessageHolder" hidden>
              <span ref="errorMessage" id="errorMessage"></span>
            </div>
              <b class="fs-5">Artikel hinzufügen</b>
              <div class="input-group input-group-sm mb-1">
                <span class="input-group-text">Titel*</span>
                <input ref="title" type="text" class="form-control" name="Titel" id="title" required>
              </div>
              <div class="input-group input-group-sm mb-1">
                <span class="input-group-text">Header URL*</span>
                <input ref="headerURL" type="text" class="form-control" name="HeaderURL" id="HeaderURL" placeholder="https://img.com/abc" required>
              </div>

              <div class="mb-3">
                <span class="input-group-text my-2">Wiki Inhalt</span>
                <client-only>
                  <TipTapEditor ref="contentHolder" v-model="content" class="mb-2" />
                  <input ref="content" id="content" type="text" name="Content" hidden :value='this.content'>
                </client-only>
              </div>
              <div class="input-group input-group-sm text-center d-inline-block">
                <button type="submit" class="btn btn-primary px-5 p-3" @click="addWiki"><b>Hinzufügen</b></button>
              </div>
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
import Navigator from "../../components/Navigator"
import Footer from "../../components/Footer"
import TipTapEditor from '../../components/TipTapEditor.vue'
export default {
  components: {
    Navigator,
    Footer,
    TipTapEditor
  },
  asyncData(context) {
    return {
      username: context?.req?.session?.username
    }
  },
  data () {
    return {
      content: ""
    }
  },
  methods: {
    async addWiki() {
      const content = this.$refs.content.value;
      const title = this.$refs.title.value;
      const headerURL = this.$refs.headerURL.value;

      if (content === "" || title === "" || headerURL === "") {
        this.showError("Der Artikel ist nicht vollständig", "fail");
        return;
      }

      const res = await fetch("./add",
          {
            headers: {'Content-Type': 'application/json'},
            method: "POST",
            body: JSON.stringify({
              "Title": title,
              "HeaderURL": headerURL,
              "Content": content
            })
          });

      const data = await res.json();
      this.showError(data.Message, data.State)

    },
    showError(message, type) {
      this.$refs.errorMessageHolder.hidden = false;
      this.$refs.errorMessage.innerHTML = message;

      switch (type) {
        case "success": {
          this.$refs.errorMessage.className = "form-control mb-4 text-white bg-success";

          this.$refs.title.value = "";
          this.$refs.headerURL.value = "";
          this.$refs.content.value = "";

          for(let element of document.getElementsByClassName("ProseMirror")) element.innerHTML = "";

          break;
        }
        case "fail": {
          this.$refs.errorMessage.className = "form-control mb-4 text-white bg-danger";
        }
      }
    }
  },
  head: {
    title: 'Seraphim Buildings - Artikel hinzufügen',
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
  name: 'WikiAddPage'
}
</script>