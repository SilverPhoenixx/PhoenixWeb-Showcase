<template>
  <div>
    <Navigator :username="this.username"/>
    <div class="siteHeader">
      <div class="d-flex justify-content-center align-items-center h-100">
        <div>
          <h1 class="display-4"
              style="font-weight: bold; color: #fff; text-shadow: 12px 24px 18px rgb(0 0 0 / 90%); letter-spacing: 1px; ">
            <br>
            <span style="display: inline-block; transform: skew(-30deg); font-weight: bold; background-color: #fff;">
            <p class="display-4 p-2"
               style="font-weight: bold; transform: skew(30deg); color: #000;text-shadow: none;">
              Unser Team
            </p>
          </span>
          </h1>
        </div>
      </div>
    </div>
    <div class="container-fluid bg-dark" style="min-height: 100vh">
        <team-users :team='this.team'/>
    </div>
    <Footer :username="this.username"/>
  </div>
</template>


<style scoped>

.siteHeader {
  background-image: url('/assets/SkyWhale.jpg');
  background-size: cover;
  background-position: center;
  height: 250px;
}

</style>

<script>
import Navigator from "../components/Navigator"
import TeamUsers from '../components/TeamUsers.vue'
import Footer from "../components/Footer";

export default {
  components: {
    Navigator,
    TeamUsers,
    Footer
  },
  asyncData(context) {
    return {
      username: context?.req?.session?.username
    }
  },
  data() {
    return {
      team: undefined
    }
  },
  mounted() {
    fetch("./api/team")
        .then(response => response.json())
        .then(data => {
          this.team = data;
    });
  },
  head: {
    title: 'Seraphim Buildings - Team',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
  },
  name: 'TeamPage'
}
</script>
