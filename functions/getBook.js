require('dotenv').config();
const axios = require('axios');
const ESV_TOKEN = process.env.ESV_API_KEY

exports.handler = function (event, context, callback) {
  const bookQuery = event.queryStringParameters.bookQuery;
  const url = `https://api.esv.org/v3/passage/html/?q=${bookQuery}`;
  
  axios.get(url, {
    headers: {
        'Authorization': process.env.ESV_TOKEN
    },
    params: {
      'include-footnotes': false,
      'include-footnote-body': false,
      'include-short-copyright': false
    }
})
    .then(json => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(json.data)
      });
    })
    .catch(ex => callback(ex));
}