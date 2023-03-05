export default {
    telemetry: false,
    ssr: true,
    srcDir: '../frontend/',
    head: {
        title: 'PhoenixWeb',
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
          { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
          { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'}
        ],
        script: [
          {
            hid: "FontAwesome",
            src: "https://kit.fontawesome.com/52cd1b0e87.js",
          },
          {
            hid: "Bootstrap Script",
            src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
          }
          ]
      }
    }