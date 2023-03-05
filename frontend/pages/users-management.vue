<template>
    <div>
    <Navigator logged-in="true"/>
        <div class="container-fluid min-vh-100 p-0">
            <div class="siteHeader">
                <div class="d-flex justify-content-center align-items-center h-100">
                    <h1 class="display-4 text-center" style="font-weight: bold; color: #fff; text-shadow: 12px 24px 18px rgb(0 0 0 / 90%); letter-spacing: 1px; ">
                        Die Benutzer
                    <br>
                    <span style="display: inline-block; transform: skew(-30deg); font-weight: bold; background-color: #fff;">
                        <p class="display-4 p-2" style="font-weight: bold; transform: skew(30deg); color: #000;text-shadow: none;">
                        Verwaltung
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
                                <th>Rang</th>
                                <th scope="col">Benutzername</th>
                                <th scope="col">E-Mail</th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users" v-bind:key="user.Email" class="col-9 bg-light mx-auto shadow-lg">
                                <td>{{user.Role}}</td>
                                <td>{{user.Username}}</td>
                                <td>{{user.Email}}</td>
                                <td></td>
                                <td><i class="fa-solid fa-user text-black pbtn" @click='setUserInformation(user.Username, user.Email)' data-bs-toggle="modal" data-bs-target="#userModal"></i></td>
                                <td><i class="fa-solid fa-lock text-black pbtn" @click='setPasswordInformation(user.Username, user.Email)' data-bs-toggle="modal" data-bs-target="#passwordModal"></i></td>
                                <td><i class="fa-solid fa-envelope text-black pbtn" @click='setEmailInformation(user.Username, user.Email)' data-bs-toggle="modal" data-bs-target="#emailModal"></i></td>
                            </tr>
                          </tbody>
                    </table>
                          <a  class="btn btn-primary mb-2 mx-3" :href="'./users-management?page=' + ((page-1) == 0 ? 1 : page-1)">Vorherige Seite</a>
                          <a  class="btn btn-primary  mb-2 mx-3 float-end" :href="'./users-management?page=' + (page+1)">Nächste Seite</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  <Footer/>
  <div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="b2" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Benutzer Informationen ändern</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="text-center">
          <span ref="userResponse" class="bg-danger mb-4 text-white" hidden></span>
        </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Abbrechen</button>
          <button type="button" class="btn btn-primary" @click="setUser()">Speichern</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="emailModal" tabindex="-1" aria-labelledby="email" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Email ändern</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="text-center">
          <span ref="emailResponse" class="bg-danger mb-4 text-white" hidden></span>
        </div>
          <span>Alte Email</span>
          <input ref="emailEmail" class="form-control mb-3" type="email" disabled>
          <span>Neue Email</span>
          <input ref="emailNewEmail" class="form-control" type="email">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Abbrechen</button>
          <button type="button" class="btn btn-primary" @click="setEmail()">Speichern</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="passwordModal" tabindex="-1" aria-labelledby="password" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Passwort ändern</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="text-center">
          <span ref="passwordResponse" class="bg-danger mb-4 text-white" hidden></span>
        </div>
          <span>Email</span>
          <input ref="passwordEmail" class="form-control mb-3" type="email" disabled>
          <span>Neues Password</span>
          <input ref="passwordPassword" class="form-control" type="password">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Abbrechen</button>
          <button type="button" class="btn btn-primary"  @click="setPassword()">Speichern</button>
        </div>
      </div>
    </div>
  </div>
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
        
                users: context?.req?.data,
                page: context?.req?.page
            }
        },
        methods: {
            manipulateDOM(url, information, name, input, reload) {
              fetch(url, {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: information
              }).then(response => {
              return response.json()}
              ).then(data => {
                switch(data.code) {
                  case "404": {
                    this.$refs[name + "Response"].classList.value = "rounded p-2 fw-bold text-white bg-danger"
                    break;
                  } 
                  case "200": {
                    if(reload) {
                      window.location.reload();
                      return;
                    }
                    this.$refs[name + "Response"].classList.value = "rounded p-2 fw-bold text-white bg-success"
                    break;
                  }
                }
                this.$refs[name + "Response"].innerHTML = data.message;
                this.$refs[name + "Response"].hidden = false;
                this.$refs[input].value = "";
              })
            },
            setEmail() {
              this.manipulateDOM("./users-management/email",
               JSON.stringify({
                  email: this.$refs.emailEmail.value,
                  newemail: this.$refs.emailNewEmail.value
                }), "email", "emailNewEmail", true);

            
            },
            setPassword() {
              this.manipulateDOM("./users-management/password",
               JSON.stringify({
                  password: this.$refs.passwordPassword.value,
                  email: this.$refs.passwordEmail.value
                }), "password", "passwordPassword", false);
            },
            setUser() {
              
            },
            setEmailInformation(username, email) {
                this.$refs.emailEmail.value = email;
            },
            setPasswordInformation(username, email) {
                this.$refs.passwordEmail.value = email;
            },
            setUserInformation(username, email) {

            }
        },
      head: {
        title: 'AriesBuildings - User Management',
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