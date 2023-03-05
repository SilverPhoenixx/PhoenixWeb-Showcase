<template>
<div>
<Navigator logged-in="true"/>
  <div class="container-fluid min-vh-100 p-0">
    <div class="siteHeader">
      <div class="d-flex justify-content-center align-items-center h-100">
        <span style="display: inline-block; transform: skew(-30deg); font-weight: bold; background-color: #fff;">
          <p class="display-4" style="font-weight: bold; padding: 5px 40px;transform: skew(30deg); color: #000;text-shadow: none;">
            Profil
          </p>
        </span>
      </div>
    </div>
    <div class="p-4 bg-dark"></div>
    <div class="container-fluid py-4 my-5 h-25 d-inline-block ">
      <div class="container-fluid mb-5">
        <div class="row">
          <div class="col-9 mx-auto my-5 shadow-lg">      
            <div class="px-5 my-3 service-description">
              <p class="text-center display-6 fw-bold">
                {{this.username}}
              </p>
            </div>    
              <img v-if="this.uuid != '/'" v-bind:src="'https://visage.surgeplay.com/full/' + this.uuid" class="mx-auto d-block"> 
              <p class="text-center fs-4 fw-bold">
                {{this.role}}
              </p>
          </div>
        </div>
        <div class="row">
          <div class="col-3 mx-auto p-3 shadow-lg">
            <form method="post" action="./user/setpassword">
              <div class="form-group">
                <span id="passwordResponseMessage" class="form-control mb-4 text-white" hidden></span>
                <span ref="passwordMessage" class="form-control bg-danger mb-4 text-white" hidden>Die Passwörter stimmen nicht über ein.</span>
                <span class="form-group-text">Altes Passwort</span>
                <input autocomplete="password" ref="oldpassword" type="password" class="form-control" name="oldpassword" required>
                <span class="form-group-text">Neues Passwort</span>
                <input autocomplete="new-password" ref="password" type="password" class="form-control" name="password" required>
                <span  class="form-group-text">Neues Passwort (Wiederholen)</span>
                <input autocomplete="new-password" ref="passwordRepeat" type="password" class="form-control" name="repeatPassword" required>
                <button ref="passwordButton" type="button" value="Passwort ändern" @click='changePassword' class="form-control btn btn-primary my-4">Passwort ändern</button>
              </div>
            </form>
          </div>
          <div class="col-3 mx-auto p-3 shadow-lg">
              <div class="form-group">
                <span id="emailResponseMessage" class="form-control mb-4 text-white" hidden></span>
                <span ref="emailMessage" class="form-control bg-danger mb-4 text-white" hidden>Die E-Mail stimmen nicht über ein.</span>
                <span class="form-group-text">Momentanes Passwort</span>
                <input type="password" class="form-control"  ref="currentpassword" name="currentpassword" required>
                <span class="form-group-text">Neue E-Mail</span>
                <input ref="email" type="email" class="form-control" name="email" required>
                <span  class="form-group-text">Neue E-mail (Wiederholen)</span>
                <input  ref="emailRepeat" type="email" class="form-control" name="repeatEmail" required>
                <button ref="emailButton" type="button" @click='changeEmail' value="E-Mail ändern" class="form-control btn btn-primary my-4">E-Mail ändern</button>
              </div>
          </div>
        </div>
        <div class="row py-3">
          <div class="col-9 text-center p-3 mx-auto shadow-lg">
            <a href="./worlds?page=1" class="pbtn text-primary m-1">
              <i class="fas fa-folder fa-xl"></i>
            </a>
            <a v-if="this.role ==='Administrator'" href="./users-management?id=1" class="pbtn text-primary m-1">
              <i class="fa-solid fa-people-group fa-xl"></i>
            </a>
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
      username: context?.req?.data?.username,
      uuid: context?.req?.data?.uuid,
      role: context?.req?.data?.role
    }
  },
  methods: {
    changePassword() {
      if(this.$refs.oldpassword.value && this.$refs.password.value && this.$refs.passwordRepeat.value) {
        fetch("./user/setpassword",
            {
              headers: {'Content-Type': 'application/json'},
              method: "POST",
              body: JSON.stringify({
                "oldpassword": this.$refs.oldpassword.value,
                "password": this.$refs.password.value,
                "passwordRepeat": this.$refs.passwordRepeat.value
              })
            })
            .then(function(res) { return res.json(); })
            .then(function(data) {
              document.getElementById("passwordResponseMessage").innerHTML = data["Message"];
              document.getElementById("passwordResponseMessage").removeAttribute("hidden");
              if(data["State"] === "200") {
                console.log("2");
                document.getElementById("passwordResponseMessage").className = "form-control mb-4 text-white bg-success";
              } else if(data["State"] === "400") {
                document.getElementById("passwordResponseMessage").className = "form-control mb-4 text-white bg-danger";
              }
            })
      }
    },
    changeEmail() {
    if(this.$refs.currentpassword.value && this.$refs.email.value && this.$refs.emailRepeat.value) {
      fetch("./user/setemail",
          {
            headers: {'Content-Type': 'application/json'},
            method: "POST",
            body: JSON.stringify({
              "currentpassword": this.$refs.currentpassword.value,
              "email": this.$refs.email.value,
              "emailRepeat": this.$refs.emailRepeat.value
            })
          })
          .then(function(res) { return res.json(); })
          .then(function(data) {
            document.getElementById("emailResponseMessage").innerHTML = data["Message"];
            document.getElementById("emailResponseMessage").removeAttribute("hidden");
            if(data["State"] === "200") {
              console.log("1");
              document.getElementById("emailResponseMessage").className = "form-control mb-4 text-white bg-success";
            } else if(data["State"] === "400") {
              document.getElementById("emailResponseMessage").className = "form-control mb-4 text-white bg-danger";
            }
          })
    }
    }
  },
  head: {
    title: 'AriesBuildings - Profil',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
  },
  name: 'ProfilPage'
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
  filter: brightness(75%);
}
</style>