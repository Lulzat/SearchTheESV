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
        <div class="card-content">
          <div class="content" v-html="data.passages[0]">
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

      <!-- Navigation 
      <div class="dropdown " style="width: 100vw;">
        <b-navbar-dropdown v-for="book in $page.allBibleBooks.edges[0].node.books" :key="book.Name" :label="book.Name" style="width: 25px;"> 
          <b-navbar-item v-for="n in book.Chapters" v-on:click="getBookChapter(book.Name, n)" style="width: 25px;">
            {{ n }}
          </b-navbar-item>
        </b-navbar-dropdown>
      </div>-->
      <!--<div class="container is-fluid">
        <div class="select" v-for="book in $page.allBibleBooks.edges[0].node.books">
          <select>
            <option>{{book.Name}}</option>
            <option v-for="n in book.Chapters" v-on:click="getBookChapter(book.Name, n)">{{n}}</option>
          </select>
        </div>
      </div> -->
      
      <div class="container is-fluid">
        <div class="select">
          <select v-model="selectedBook">
            <option v-for="book in $page.allBibleBooks.edges[0].node.books" v-bind:value="book">{{book.Name}}
            </option>
          </select>
        </div>
        <div class="select">
          <select v-model="selectedChapter" class="form-control" :required="true">
            <option v-for="chapter in selectedBook.Chapters" v-bind:value="chapter">{{ chapter }}</option>
          </select>
        </div>
        <b-button type="is-primary" v-on:click="getBookChapter(selectedBook.Name, selectedChapter)" outlined>Get Chapter!</b-button>
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
        show : false,
        selectedBook: {
        "Name": "Genesis",
        "Chapters": 50
        },
        selectedChapter: 1
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
          this.errorMsg = 'No Results Found'
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
          this.errorMsg = 'No Results Found (How did this one happen?)'
          this.dataChapter = []
        })
      },
    enabled(array, index) {
      for (let a=0; a<index; a++) {
        if (!array[a]) return false;
      }
      return true;
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