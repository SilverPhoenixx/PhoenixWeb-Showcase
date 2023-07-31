<template>
<div>
  <Navigator :username="this.username"/>
<div class="container-fluid min-vh-100 p-0">
   <div class="siteHeader">
        <div class="d-flex justify-content-center align-items-center h-100">
            <h1 class="display-4" style="font-weight: bold; color: #fff; text-shadow: 12px 24px 18px rgb(0 0 0 / 90%); letter-spacing: 1px; ">
                    Willkommen auf
                <br>
                <span style="display: inline-block; transform: skew(-30deg); font-weight: bold; background-color: #fff;">
                    <p class="display-4 p-2" style="font-weight: bold; transform: skew(30deg); color: #000;text-shadow: none;">
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
                    <h1 class="display-4" style="font-weight: bold;">
                       Informationen
                    </h1>
                </div>

              <div class="col-12 mt-5 input-right shadow-lg">
                <div class="service-icon px-3">
                  <i class="fa-solid fa-people-group fa-3x"></i>
                </div>

                <div class="px-5 my-3 service-description">
                  <h2 class="display-6" style="font-weight: bold;">
                   Über das Team
                  </h2>
                  <p class="fs-5">
                    Seraphim Building ist ein kleines Minecraft Bauteam, welches sich
                    aus Interesse und Lernfreude am Bauen entwickelt hat.
                    Dabei liegt das Augenmerk auf
                    Themenbereiche, die uns in unserer Freizeit täglich begleiten.
                    Von Programmierung von Webseiten und Plugins für das Netzwerk,
                    Rendering von Skins und Maps
                    sowie das Erstellen von Minecraft Maps mittels Kommunikation und Planung mit Kollegen und der Community.
                  </p>
                </div>
              </div>


                <div class="col-12 mt-5 input-right shadow-lg">
                    <div class="service-icon px-3">
                        <i class="fas fa-server fa-3x"></i>
                    </div>
                        
                    <div class="px-5 my-3 service-description">
                        <h2 class="display-6" style="font-weight: bold;">
                            Aufstellung des Teams
                        </h2>
                        <p class="fs-5">
                            Unser Team besteht derzeit aus Personen die in ihrer Freizeit
                            gerne neue, spannende und einzigartige kreative Ideen ausprobieren.
                            Kein Turm ist zu hoch und keine Schlucht ist zu tief!
                        </p>
                    </div>
                </div>

                <div class="col-12 mt-5 input-right shadow-lg">
                    <div class="service-icon px-3">
                        <i class="fas fa-lightbulb fa-3x"></i>
                    </div>
                    
                    <div class="px-5 my-3 service-description">
                        <h2 class="display-6" style="font-weight: bold;">
                            Planung der Zukunft
                        </h2>
                        <p class="fs-5">
                            In Zukunft möchten wir auch andere Personen und Netzwerke unterstützen ihre Vorstellungen von
                            Anfang bis zum Ende in Minecraft umzusetzen. Dabei möchten neues Wissen erlernen und weitergeben.
                        </p>
                    </div>
                </div>
                   
                <div class="col-12 mt-5 input-right shadow-lg">
                    <div class="service-icon px-3">
                        <i class="fas fa-exclamation-circle fa-3x"></i>
                    </div>
    
                    <div class="px-5 my-3 service-description">
                        <h2 class="display-6" style="font-weight: bold;">
                        Hilfe bei dem Projekt
                        </h2>
                        <p class="fs-5">
                            Das Team sucht ständig neue begeisterte Personen die an der Ausübung, der Kreativität, neue Grenzen suchen.
                            Bei Interesse kann sich über <a href="http://discord.seraphimbuildings.de">Discord</a> bei uns melden!
                        </p>
                    </div>
                </div>
            </div>

        </div>
    </div>
        <div class="container-fluid pb-5"></div>
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
    title: 'Seraphim Buildings - Home',
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
  name: 'IndexPage'
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