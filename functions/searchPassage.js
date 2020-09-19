require('dotenv').config();
const axios = require('axios');
const ESV_TOKEN = process.env.ESV_API_KEY

exports.handler = function (event, context, callback) {
  const passage = event.queryStringParameters.passage;
  const url = `https://api.esv.org/v3/passage/text/?q=${passage}`;
  
  axios.get(url, {
    headers: {
        'Authorization': process.env.ESV_TOKEN
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