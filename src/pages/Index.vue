<template>
  <Layout>

    <div id="app">
      <transition name="slide-fade" mode="out-in" appear>
        <div class="alert alert-info" v-if="show" key="info">
          Search The 
          <g-image alt="ESV Logo" src="~/favicon.png" width="135" />
        </div>
        <div class="alert alert-warning" v-else key="warning">
           Search The 
          <g-image alt="ESV Logo" src="~/favicon.png" width="135" />
        </div>
      </transition>

      <!-- Search Bar -->
      <form @submit.prevent="search">
        <b-field>
          <b-input v-model.lazy="passage" placeholder="Search..." type="search" icon="magnify" icon-clickable
            @icon-click="searchIconClick">
          </b-input>
        </b-field>
      </form>

      <!-- Search Results Card -->
      <div class="card" v-if="data.query">
        <header class="card-header">
          <p class="card-header-title">
            {{ data.query }}
          </p>
        </header>
        <div class="card-content">
          <div class="content">
            {{ data.passages[0] }}
          </div>
        </div>
      </div>
      <div class="card" v-else>
        <div class="card-content">
          <div class="content">
            {{ errorMsg }}
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="container">
        <div class="row">
          <div v-for="book in $page.allBibleBooks.edges[0].node.books" :key="book.Name">
            <b-navbar-dropdown :label="book.Name" class="book-list col-12">
              <ul class="d-flex flex-wrap">
                <b-navbar-item v-for="n in book.Chapters" class="chapter-list">
                  <li v-on:click="getBookChapter(book.Name, n)" type="is-primary" outlined class="list-group-item">{{ n }}
                  </li>
                </b-navbar-item>
              </ul>
            </b-navbar-dropdown>
          </div>
        </div>
      </div>

      <!-- Nav Results -->
      <div class="card" v-if="dataChapter.query">
        <div class="card-content">
          <div class="content" v-html="dataChapter.passages[0]">
          </div>
        </div>
      </div>
      <div class="card" v-else>
        <div class="card-content">
          <div class="content">
            {{ errorMsg }}
          </div>
        </div>
      </div>

      <!-- Chapter Display -->

    </div>
    <!--<b-button v-on:click=getNextChapter type="is-primary" outlined>Continue Reading</b-button>-->
    </div>
    <footer>
      Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®), copyright © 2001 by Crossway, a publishing ministry of Good News Publishers. Used by permission. All rights reserved. You may not copy or download more than 500 consecutive verses of the ESV Bible or more than one half of any book of the ESV Bible.
    </footer>
  </Layout>
</template>

<page-query>
  query {
    allBibleBooks {
      edges {
        node {
          books {
            Name
            Chapters
          }
        }
      }
    }
  }
</page-query>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import SearchBar from '~/components/SearchBar.vue'

  Vue.use(VueAxios, axios)

  export default {
    data() {
      return {
        passage: '',
        data: [],
        dataChapter: [],
        errorMsg: '',
        chapters: [],
        next_chapter: '1002001-1002025',
        show : false
      }
    },
    components: {
    SearchBar
  },
    methods: {
      search() {
        const url = `/.netlify/functions/searchPassage?passage=${this.passage}`;
        console.log(this.passage)
        Vue.axios.get(
          url).then(response => {
          console.log(response)
          this.data = response.data
        }).catch(error => {
          this.errorMsg = 'Nope.'
          this.data = []
        })
      },

      getBookChapter(bookName, bookChapter) {
        const bookQuery = bookName + bookChapter;
        const url = `/.netlify/functions/getBook?bookQuery=${bookQuery}`;
        console.log(bookQuery) 
        axios.get(url).then(response => {
          console.log(response)
          this.dataChapter = response.data
        }).catch(error => {
          this.errorMsg = 'Nope.'
          this.dataChapter = []
        })
      }
    },
    beforeMount() {
      this.getBookChapter("genesis", 1)
    }
    }
</script>

<style>
  .home-links a {
    margin-right: 1rem;
  }

  /* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .8s ease;
}
.slide-fade-leave-active {
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-20px);
  opacity: 0;
}

.fade-enter{
        opacity: 0;
    }
    .fade-enter-active{
        transition: opacity 1s;
    }
    .fade-leave{
        /* opacity: 1; */
    }
    .fade-leave-active{
        transition: opacity 1s;
        opacity: 0;
    }
</style>