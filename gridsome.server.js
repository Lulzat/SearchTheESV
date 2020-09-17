const axios = require('axios')

module.exports = function (api) {
  api.loadSource(async actions => {
    const { data } = await axios.get(`
    https://api.esv.org/v3/passage/html/?q=gen1`, {
        headers: {
          'Authorization': `Token cbd26d0652943136cfa0ecb6e7a09edb9e3bd3a5`
        },
        params: {
          'include-footnotes': false,
          'include-footnote-body': false,
          'include-short-copyright': false
        }
      })
    const collection = actions.addCollection({
      typeName: 'Posts'
    })

      collection.addNode({
        Canonical: data.canonical,
        Passage: data.passages[0],
        Next_Chapter: data.passage_meta[0].next_chapter[0]
      })
    }
  )

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