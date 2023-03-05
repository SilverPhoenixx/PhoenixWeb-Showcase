<template>
<div>
  <Navigator logged-in="false"/>
<div class="container-fluid min-vh-100 p-0">
   <div class="siteHeader">
        <div class="d-flex justify-content-center align-items-center h-100">
            <h1 class="display-4" style="font-weight: bold; color: #fff; text-shadow: 12px 24px 18px rgb(0 0 0 / 90%); letter-spacing: 1px; ">
                    Willkommen auf
                <br>
                <span style="display: inline-block; transform: skew(-30deg); font-weight: bold; background-color: #fff;">
                    <p class="display-4 p-2" style="font-weight: bold; transform: skew(30deg); color: #000;text-shadow: none;">
                    AriesBuildings
                </p>
                </span>
            </h1>
        </div>
    </div>
        <div class="p-4 bg-dark"></div>
    <div class="container-fluid mt-5 h-100">
        <div class="container pb-5">
           
            <div class="row">
                <div class="col">
                    <h1 class="display-4" style="font-weight: bold;">
                        Über das Build Team
                    </h1>
                </div>
            </div>

            <div class="row">
                <div class="col-8 mt-5">
                    <b>
                        <h3 class="fs-3" style="font-weight: bold;">
                            AriesBuildings ist ein kleines Minecraft Bauteam, welches sich
                            aus Interesse und Lernfreude am Bauen entwickelt hat. Dabei liegt das Augenmerk auf
                            Themenbereiche, die uns in unserer Freizeit täglich begleiten.
                        </h3>
                    </b>
                </div>

            </div>
        </div>
   </div>
    <div class="container-fluid pb-5 skew bg-light">
        <div class="container deskew">
            <div class="row">
                <div class="col-12 mt-5">
                    <h1 class="display-4" style="font-weight: bold;">
                        Du findest bei uns ...
                    </h1>
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
                            In Zukunft möchten wir auch andere Personen, Netzwerke und Firmen dabei unterstützen ihre Vorstellungen von
                            Anfang bis zum Ende in Minecraft umzusetzen. Bei Interesse bei den Leitungspersonen: Tim_Stefan_Maria
                            oder Laugenbrezel melden.
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
                            Das Team sucht ständig neue begeisterte Personen die an der Ausübung der Kreativitäten neue Grenzen suchen.
                            Die Leitungspersonen: Tim_Stefan_Maria und Laugenbrezel sind immer offen nur neue Anfragen!
                        </p>
                    </div>
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
    title: 'AriesBuildings - Home',
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
background-image: url('/assets/BannerHaikali.png'); 
background-size: cover; 
background-position: center;
height: 250px;
}
</style>