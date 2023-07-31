<template>
<div>
  <Navigator :username="this.username"/>
<div class="container-fluid min-vh-100 p-0">
   <div class="siteHeader">
        <div class="d-flex justify-content-center align-items-center h-100">
            <h1 class="display-4 text-center" style="font-weight: bold; color: #fff; text-shadow: 12px 24px 18px rgb(0 0 0 / 90%); letter-spacing: 1px; ">
                <span style="display: inline-block; transform: skew(-30deg); font-weight: bold; background-color: #fff;">
                    <p class="display-4" style="font-weight: bold; padding: 5px 40px;transform: skew(30deg); color: #000;text-shadow: none;">
                        Login
                </p>
                </span>
            </h1>
        </div>
    </div>
            <div class="p-4 bg-dark"></div>
        <div class="container-fluid py-8 my-5 h-25 d-inline-block ">
            <div class="row">
                <div class="col-6 mx-auto my-5 shadow-lg">
                        
                    <div class="px-5 my-3 service-description">
                        <p class="text-center display-6 fw-bold">
                           Login
                        </p>
                
                    <div v-if="this.message != null">
                    <span class="form-control bg-danger mb-4 text-white">{{this.message}}</span>
                    </div>
                         <form method="post" action="./login">
                            <div class="form-group">
                                <span class="form-group-text">E-Mail</span>
                                <input autocomplete="email" type="email" class="form-control" name="email" placeholder="max@mustermann.de" required>
                                <span class="form-group-text">Password</span>
                                <input autocomplete="password" type="password" class="form-control" name="password" placeholder="Password" required>
                                <input type="submit" value="Login" class="form-control btn btn-primary my-4">
                            </div>
                        </form>
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
      username: context?.req?.session?.username,
      message: context?.req?.data?.message
    }
  },

  head: {
    title: 'Seraphim Buildings - Login',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ]
  },
  name: 'LoginPage'
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
</style>