require('../models')
const request = require("supertest")
const app = require('../app')
const Director = require("../models/Director")
const Movie = require("../models/Movie")




let movie
let director 
let URL_DIRECTORS = '/directors'

beforeAll(async ()  => {
    movie = await Movie.create(
    {
        name: "Star Wars",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Star_wars2.svg/225px-Star_wars2.svg.png",
        synopsis: "Star Wars is an American epic space opera[1] media franchise created by George Lucas, which began with the eponymous 1977 film[a] and quickly became a worldwide pop culture phenomenon",
        releaseYear:"1977"
    })
    
    
    director = {
          name: "Gerge ",
          nacionality:"USA",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/George_Lucas_cropped_2009.jpg/220px-George_Lucas_cropped_2009.jpg",
          birthday: "1944",
          movieId: movie.id
    }
})   
test("Post -> 'URL_DIRECTORS' should return status code 201,  res.body. to be defined and res.body.name = director.name", async () => {
    const res = await request(app)
      .post(URL_DIRECTORS)
      .send(director)
     
    directorId = res.body.id  

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(director.name)  
   
})
// Get All
test("Get -> 'URL_DIRECTORS', should return status code 200 and res.body.length === 1", async () => {
    const res = await request(app)
       .get(URL_DIRECTORS)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)   
})
// Get one
test("Get One -> 'URL_DIRECTORS/:id', should return status code 200 and res.body.name === movie.name", async () => {
    const res = await request(app)
       .get(`${URL_DIRECTORS}/${directorId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(director.name)   
})
// Update
test("Put -> 'URL_DIRECTORS/:id', should return status code 200 and res.body.name === movieUpdate.name", async () => {
   const directorUpdate = {
    name: "John"
   }

   const res = await request(app)
      .put(`${URL_DIRECTORS}/${directorId}`)
      .send({ name: "John"})
   
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe("John")  
})

// Delete
test("Delete 'URL_DIRECTORS', should return status code 204", async () => {
    const res = await request(app)
       .delete(`${URL_DIRECTORS}/${directorId}`)

    expect(res.statusCode).toBe(204)   
    await movie.destroy()
})