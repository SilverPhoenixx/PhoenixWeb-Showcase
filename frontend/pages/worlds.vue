<template>
<div>
<Navigator logged-in="true"/>
    <div class="container-fluid min-vh-100 p-0">
        <div class="siteHeader">
            <div class="d-flex justify-content-center align-items-center h-100">
                <h1 class="display-4 text-center" style="font-weight: bold; color: #fff; text-shadow: 12px 24px 18px rgb(0 0 0 / 90%); letter-spacing: 1px; ">
                    Die Welten
                <br>
                <span style="display: inline-block; transform: skew(-30deg); font-weight: bold; background-color: #fff;">
                    <p class="display-4 p-2" style="font-weight: bold; transform: skew(30deg); color: #000;text-shadow: none;">
                    Liste
                    </p>
                </span>
            </h1>
        </div>
        <div class="p-4 bg-dark"></div>
    </div>
    <div class="container-fluid py-8 pb-5 h-25 d-inline-block ">
        <div class="row">
            <div class="col-9 mx-auto">
            <div class="table-responsive shadow-lg">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Server</th>
                            <th scope="col">Welt</th>
                            <th scope="col">Typ</th>
                            <th scope="col">Status</th>
                            <th scope="col">Rechte</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="world in worlds" class="col-9 bg-light mx-auto shadow-lg">
                            <th>{{world.Server}}</th>
                            <td>{{world.World}}</td>
                            <td>{{world.Type}}</td>
                            <td>{{getState(world.State)}}</td>
                            <td>{{world.Permission}}</td>
                            <td><a :href='"./world-settings?server=" + world.Server + "&world=" + world.World'><i class="fa-solid fa-gear text-black pbtn"></i></a></td>
                            <td><i @click='downloadWorld(world.Server, world.World)' class="fa-solid fa-download pbtn"></i></td>
                        </tr>
                    </tbody>
                  <tfoot>
                  <tr class="justify-content-end">
                    <td colspan="7">
                        <div class="input-group">
                          <input type="file" class="form-control" id="uploadWorld" name="world"  ref="fileChooser" aria-label="Upload" accept=".zip,.rar,.7zip">
                          <button class="btn btn-outline-primary" type="button" @click='onUpload' value="Hochladen">Hochladen</button>
                        </div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2"><label class="form-label">Importierende Welt: </label></td>
                    <td colspan="5"><label class="form-label" ref="importName" id="text"></label></td>
                  </tr>
                  <tr>
                    <td colspan="7">
                    <div class="progress">
                      <div class="progress-bar" role="progressbar" aria-label="Example with label" ref="progress" style="width: 0%;" aria-valuemin="0">0%</div>
                    </div>
                    </td>
                  </tr>
                  </tfoot>
                </table>
    
                <a  class="btn btn-primary mb-2 mx-3" :href="'./worlds?page=' + ((page-1) == 0 ? 1 : page-1)">Vorherige Seite</a>
                          <a  class="btn btn-primary  mb-2 mx-3 float-end" :href="'./worlds?page=' + (page+1)">Nächste Seite</a>
                        </div>
            </div>
        </div>
    </div>
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
    asyncData(context) {
        return {
            page: context?.req?.page,
            worlds: context?.req?.data,
        }
    },
    methods: {
        getState(state) {
            switch(state) {
                case 0: return "Private";
                case 1: return "Nicht angefangen";
                case 2: return "In Arbeit";
                case 3: return "Fast fertig";
                case 4: return "In Begutachtung";
                case 5: return "Abgeschlossen";
                default: "?";
            }
        },
        downloadWorld(server, world) {
            try {
            window.open("./world/download?server=" + server + "&world=" + world , '_blank');
            } catch(err) {
                console.log(err)
            }
        },
        onUpload() {
          const formData = new FormData();
          const fileField = document.getElementById('uploadWorld');

          try {
            if(fileField.value === "") return;
            if(fileField.files[0] == null) return;

            this.$refs.progress.style.width =  "0%";
            this.$refs.progress.innerHTML = "0%";

          let client = new XMLHttpRequest();
          let progress = this.$refs.progress;

          formData.append('world', fileField.files[0]);


          client.onload = function(e) {
            progress.style.width = "100%";
            progress.innerHTML = "100%";
          };

          client.upload.onprogress = function(e) {
            let p = Math.round(100 / e.total * e.loaded);
            progress.style.width = p + "%";
            progress.innerHTML = p + "%";

            console.log(p);
          };

          let importName = this.$refs.importName;
          let fileChooser = this.$refs.fileChooser;

          console.log("----");
            console.log(XMLHttpRequest.UNSENT);
            console.log(XMLHttpRequest.OPENED);
            console.log(XMLHttpRequest.HEADERS_RECEIVED);
            console.log(XMLHttpRequest.LOADING);
            console.log(XMLHttpRequest.DONE);
            console.log("----");
          client.onreadystatechange = function () {
            console.log("State " + client.readyState);

            if (client.readyState == XMLHttpRequest.DONE) {

              let result = JSON.parse(client.responseText);

              if(result["State"] === "200") {
              importName.innerText = result["Message"];
              fileChooser.value = "";
              }
            }
          }

          client.onerror = function (e) {
            console.log(e);
          }

          client.open("POST", "./world/upload");
          client.send(formData);

        } catch {
        }
        }
    },
  head: {
    title: 'AriesBuildings - Worlds',
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
  name: 'WorldsPage'
}
</script>
<style scoped>
.siteHeader {
background-image: url('/assets/b7.jpg'); 
background-size: cover; 
background-position: center;
height: 250px;
}

.py-8 {
    margin-top: 8rem !important;
    margin-bottom: 8rem !important;
}

.pbtn:hover {
  color: var(--bs-primary) !important;
}
</style>