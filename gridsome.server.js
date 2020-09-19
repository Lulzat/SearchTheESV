const axios = require('axios')

module.exports = function (api) {
  api.loadSource(async actions => {
    const Books = require('./src/bible_data.json');

    const collection = actions.addCollection({
      typeName: 'BibleBooks'
    })

    for (const book of Books) {
      collection.addNode(book);
    }
  })

}