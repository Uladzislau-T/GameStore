const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)



// server.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });



const querystring = require('querystring');


let db = require('./db.json')

server.get('/Games', (req, res) =>{
  const parsed_query = querystring.parse(req._parsedUrl.query);

  if(parsed_query.startpage != null)
  {
    let result = db.games.slice(0,5)
    res.status(200).json(result)
    return
  }

  const genres = parsed_query.genres != null ? parsed_query.genres.split(',') : []
  const features = parsed_query.features != null ? parsed_query.features.split(',') : []
  const platforms = parsed_query.platforms != null ? parsed_query.platforms.split(',') : []
  const sort = parsed_query._sort || "All"
  const pageNumber = parsed_query._page || 1
  const limit = parsed_query._limit || 12
  
  let games = db.games.filter((game, index) => {
    return (
      genres.every(genre => game['genres'].includes(genre)) &&
      features.every(feature => game['features'].includes(feature)) &&
      platforms.every(platform => game['platforms'].includes(platform))
    )
  })

  switch (sort) {
    case "Date":
      games.sort((a,b) => {return new Date(b.time_created) - new Date(a.time_created)})
      break;
    case "Title":
      games.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
      break;
    case "Price: High to Low":
      games.sort((a,b) => b.price - a.price)
      break;
    case "Price: Low to High":
      games.sort((a,b) => a.price - b.price)
      break;
    default:
      break;
  }

  const gamesLength = games.length

  let startIndex = (pageNumber - 1) * limit

  if(games.length - startIndex < 1)
  {
    let endIndex = 0 + Number(limit)
    games = games.slice(0, endIndex)
  }
  else{
    let endIndex = startIndex + Number(limit)
    games = games.slice(startIndex, endIndex)
  }


  games = games.map((obj, index) => {
    let newIndex = index + 1
    obj.id = newIndex
    return obj
  })

  const result = {games, gamesLength}

  res.status(200).jsonp(result)
})

// router.render = (req, res) => {
//   if (req.url.includes("/Games"))
//   {
//     let dataArray = structuredClone(res.locals.data)

//     const parsed_query = querystring.parse(req._parsedUrl.query);
//     const genres = req.query['genres'];

//     // for (let i1 = 0; i1 < 4; i1++) {      
//     //   for (let i = 0; i < res.locals.data.length; i++) {        
//     //     const obj = res.locals.data[i];

//     //     let clone = structuredClone(obj)

//     //     dataArray.push(clone)      
//     //   }
//     // }
//     // let resp = req.query

//     let games = dataArray.map((obj, index) => {
//       let newIndex = index + 1
//       obj.id = newIndex
//       return obj
//     })

//     res.jsonp(
//       games
//     )
//   }
//   // else if(req.url.includes("/media/")){
//   //   res.static.data
//   // }
//   else{
//     res.jsonp(res.locals.data)
//   }
  
  
// }

// // To handle POST, PUT and PATCH you need to use a body-parser
// // You can use the one used by JSON Server
// server.use(jsonServer.bodyParser)
// server.use((req, res, next) => {
//   if (req.method === 'POST') {
//     req.body.createdAt = Date.now()
//   }
//   // Continue to JSON Server router
//   next()
// })

server.use(router)
server.listen(5002)