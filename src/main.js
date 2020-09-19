// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'


export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.use(Buefy)

  head.link.push({
    rel: 'shortcut icon',
    type: 'image/png',
    href: 'favicon.png'
  })
  
  head.link.push({
    rel: 'stylesheet',
    integrity: 'sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z',
    href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css',
    crossorigin: 'anonymous'
  })

}



