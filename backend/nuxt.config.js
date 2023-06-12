export default {
    telemetry: false,
    ssr: true,
    srcDir: '../frontend/',
    head: {
        title: 'Seraphim Buildings',
        htmlAttrs: {
          lang: 'en'
        },
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { hid: 'description', name: 'description', content: '' },
          { name: 'format-detection', content: 'telephone=no' },
            {property: "og:site_name", content: "Seraphim Buildings - Panel"},
            {property: "og:url", content: "https://panel.seraphimbuildings.net/"},
            {property: "og:type", content: "website"},
            {property: "og:title", content: "Seraphim Buildings"},
            {property: "og:description", content: "Seraphim Buildings ist ein kleines Bauteam, was sich aus Freude gebildet hat. Die Spezialisierung basiert grundlegend auf Erfahrungen sammeln und weitergeben."},
            {property: "og:image", content: "https://panel.royalguardians.net/assets/TeamPose.png"},
            {name: "twitter:title", content: "Seraphim Buildings - Panel"},
            {name: "twitter:description", content: "Seraphim Buildings ist ein kleines Bauteam, was sich aus Freude gebildet hat. Die Spezialisierung basiert grundlegend auf Erfahrungen sammeln und weitergeben."},
            {name: "twitter:image", content: "https://panel.royalguardians.net/assets/TeamPose.png"},
            {name: "twitter:image:alt", content: "Seraphim Buildings - Panel"}
        ],
        
        link: [
          { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
          { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css'}
        ],
        script: [
          {
            hid: "FontAwesome",
            src: "https://kit.fontawesome.com/52cd1b0e87.js",
          },
          {
            hid: "Bootstrap Script",
            src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
          }
          ]
      }
    }