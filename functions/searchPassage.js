require('dotenv').config();
const axios = require('axios');

exports.handler = function (event, context, callback) {
    const passage = event.queryStringParameters.passage;
    console.log(passage)
    const url = `https://api.esv.org/v3/passage/text/?q=${passage}`;

    axios.get(url, {
            headers: {
                'Authorization': process.env.ESV_API_TOKEN
            }
        })
        .then(
            json => {
                console.log(json);
                callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(json.data)
                });
            })
        .catch(ex => callback(ex));
}