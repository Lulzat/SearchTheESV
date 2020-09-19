import axios from 'axios'
import VueAxios from 'vue-axios'

exports.handler = function(event, context, passage) {
    const API_ENDPOINT = `https://api.esv.org/v3/passage/text/?q=${passage}`;

    return {
        data: [],
        errorMsg: ''
    },

    Vue.axios.get(
        API_ENDPOINT, {
            headers: {
                'Authorization': process.env.ESV_API_KEY
            }
        }).then(response => {
        data = response.data
    }).catch(error => {
        errorMsg = 'Nope.'
        data = []
    })
};
