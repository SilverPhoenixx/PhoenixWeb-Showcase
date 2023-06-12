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
              PhoenixWiki
            </p>
          </span>
          </h1>
        </div>
      </div>
    </div>
    <div class="container-fluid min-vh-100 bg-dark">
    <div class="row justify-content-center">
      <div class="col-9">
        <div class="row pt-5">
          <div class="col-12">
            <label for="search" class="form-label text-light fs-3">Wiki durchsuchen:</label>
          </div>
          <div class="col-12 col-sm-8 py-1">
            <input type="text" id="search" class="form-control" aria-labelledby="searchWiki" :value="this.searchText">
          </div>
          <template v-if="this.editPermission">
            <div class="col-12 col-sm-2 py-1">
              <button type="submit" class="btn btn-primary w-100" @click="search()">Suchen</button>
            </div>
            <div class="col-12 col-sm-2 py-1">
              <a href="./wiki/add" class="btn btn-success w-100">Hinzufügen</a>
            </div>
          </template>
          <template v-else>
            <div class="col-12 col-sm-4 py-1">
              <button type="submit" class="btn btn-primary w-100" @click="search()">Suchen</button>
            </div>
          </template>

          <div v-for="article in this.articles" class="col py-3">
            <WikiCard :Author="article.Username" :WikiDate="article.Date" :Title="article.Title"/>
          </div>
          <div class="col-12">
            <nav aria-label="WikiPage Pagination">
              <ul class="pagination justify-content-center">
                <li v-if="this.page > 1" class="page-item">
                  <a class="page-link" :href='"./wiki?page=" + (parseInt(this.page)-1) + "&search=" + this.searchText'>
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li class="page-item active"><a class="page-link" :href='"/wiki?page=" + this.page + "&search=" + this.searchText'>{{this.page}}</a></li>
                <li class="page-item">
                  <a class="page-link" :href='"./wiki?page=" + (parseInt(this.page)+1) + "&search=" + this.searchText'>
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>

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
import Navigator from "../../components/Navigator"
import WikiCard from '../../components/WikiCard'
import Footer from "../../components/Footer";

export default {
  components: {
    Navigator,
    WikiCard,
    Footer
  },
  asyncData(context) {
    return {
      editPermission: context?.req?.data?.editPermission,
      page: context?.req?.data?.page,
      searchText: context?.req?.data?.searchText,
      articles: context?.req?.data?.articles,
      username: context?.req?.session?.username
    }
  },
  methods: {
    search() {
      if(document.getElementById("search").value === "") {
        window.location = "./wiki?page=1";
        return;
      };
      window.location = "./wiki?page=1&search=" + document.getElementById("search").value;
    },
  },
  head: {
    title: 'Seraphim Buildings - Wiki',
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
  name: 'WikiIndex'
}
</script>
