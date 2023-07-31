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

      <div class="container-fluid py-8 pb-5 h-25 d-inline-block ">
        <div class="container">
          <div class="row">
            <div class="col mt-5 input-right shadow-lg d-inline-block">

              <div class="px-5 my-3 service-description">

                <article>
                  <p>
                    <b class="fs-2">Einführung</b><br>
                    Herzlich Willkommen auf der Bewerbungsseite von PhoenixRPG.<br>
                    Die Bewerbungsphase ist dauerhaft und man kann sich als folgendes bewerben:<br>
                    - Content<br>
                    - Developer<br>
                    - Supporter<br>
                    <br>
                    Jede Angabe muss der <b>Wahrheit</b> entsprechend.<br>
                    Mit * markiere Felder sind verpflichtend auszufüllen.
                  </p>
                  <hr>
                  <p>
                    <b class="fs-2">Content</b><br>
                    Als Content bist Du beteiligt an der kreativen Gestaltung des Netzwerkes.<br>
                    Sei es im Building-, Konzeptionierungs-, Storywriting-, Modelling- oder Skinmakerbereich.<br>
                    <br>
                    - Hohe Kreativität<br>
                    - Hohe Eigeninitiative<br>
                    - Guter Umgang mit den notwendigen Programmen<br><br>
                    Zum Content zählt jeder kreative Bereich,<br>
                    sollte ein Bereich der zu kreativen Gestaltung gehört nicht genannt worden sein,<br>
                    scheue dich nicht eine Bewerbung als Content zu bei uns einzureichen.
                  </p>
                  <nuxt-link class="btn btn-primary" to="/apply">Bewerben</nuxt-link>
                  <hr>
                  <p>
                    <b class="fs-2">Developer</b><br>
                    Unter dem Developmentbereich gilt: Die Webentwicklung sowie die Java Entwicklung für den Minecraft Server (Spigot und Bungeecord)<br>
                    <br>
                    <b>Webentwicklung</b><br>
                    - Weitreichende Erfahrungen mit HTML, CSS (mit Bootstrap), JavaScript<br>
                    - Gute Erfahrungen mit NodeJS (mit Express) und NuxtJS<br>
                    - Gute Handhabung von VCS (Git und GitHub)<br>
                    - Erfahrungen mit Erstellen und Nutzung von REST APIs<br>
                    <br>
                    <b>Java Entwickler</b><br>
                    - Weitreichende Erfahrungen mit Spigot API<br>
                    - Gute Erfahrungen mit Bungeecord API<br>
                    - Gute Handhabung von VCS (Git und GitHub)<br>
                    - Erfahrungen mit Erstellen und Nutzung von Datenbanken (MySQL, SQLite)<br>
                    - Wünschenswert wären Erfahrung im Multi-Threading
                  </p>
                  <nuxt-link class="btn btn-primary" to="/apply">Bewerben</nuxt-link>
                  <hr>
                  <p>
                    <b class="fs-2">Supporter</b><br>
                    Unter dem Support Bereich versteht man die Interaktion mit dem User.<br>
                    Als Supporter steht du in erster Linie mit Fragen und Kritik des Users in Kontakt.<br>
                    <br>
                    - Sehr Kommunikation<br>
                    - Gute Deutsch- und Englischkenntnisse<br>
                    - Starke Selbstbeherrschung<br><br>
                    <nuxt-link class="btn btn-primary" to="/apply">Bewerben</nuxt-link>
                  </p>
                </article>
              </div>
            </div>




          </div>
        </div>
      </div>
    </div>
    <Footer :username="this.username"/>
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
  asyncData(context) {
    return {
      username: context?.req?.session?.username
    }
  },
  head: {
    title: 'Seraphim Buildings - Bewerbungsinformationen',
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
  name: 'ApplyInfoPage'
}
</script>
<style scoped>
.siteHeader {
  background-image: url('/assets/BannerHaikali.png');
  background-size: cover;
  background-position: center;
  height: 250px;
}
</style>