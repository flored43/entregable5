require('../models')
const request = require("supertest")
const app = require('../app')
const Actor = require('../models/Actor')
const Genre = require('../models/Genre')
const Director = require('../models/Director')



let movie 
let actor
let director
let movieId

const URL_MOVIES = '/movies'

beforeAll(async () => {
    actor = await Actor.create(
        {
            first_name: "Vin",
            last_name: "Diesel",
            nacionality: "USA",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Vin_Diesel_cropped.jpg/220px-Vin_Diesel_cropped.jpg",
            birthday:"1990"
        }
        )
        movie = {
            name: "smallfoot",
            image: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/Smallfoot_%28film%29.png/220px-Smallfoot_%28film%29.png",
            synopsis:"Smallfoot is a 2018 American animated musical comedy film co-produced by Warner Bros. Pictures Animation, and Zaftig Films, and distributed by Warner Bros. Pictures.",
            releaseYear:"2018",
            actorId: actor.id
        }

})
// create
test("Post -> 'URL_MOVIES', should  return status code 201, res.body to be defined and res.body.movie = song.name", async () => {
    const res = await request(app)
       .post(URL_MOVIES)
       .send(movie)

    movieId = res.body.id   

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)   

    await actor.destroy() 
})
// Get All 
test("Get -> 'URL_MOVIES', should return status code 200 and res.body.length === 1", async () => {
    const res = await request(app)
       .get(URL_MOVIES)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)   

    expect(res.body[0].actors).toBeDefined()
    expect(res.body[0].actors).toHaveLength(0)
    // expect(res.body[0].actor.id).toBe(actor.id)

    expect(res.body[0].genres).toBeDefined()
    expect(res.body[0].genres).toHaveLength(0)
    // expect(res.body[0].genre.id).toBe(genre.id)

    expect(res.body[0].directors).toBeDefined()
    expect(res.body[0].directors).toHaveLength(0)
    // expect(res.body[0].director.id).toBe(director.id)


})
// Get one
test("Get One -> 'URL_MOVIES/:id', should return status code 200 and res.body.name === movie.name", async () => {
    const res = await request(app)
       .get(`${URL_MOVIES}/${movieId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)   
})
// Update
test("Put -> 'URL_MOVIES/:id', should return status code 200 and res.body.name === movieUpdate.name", async () => {
   const movieUpdate = {
    name: "Star wars"
   }

   const res = await request(app)
      .put(`${URL_MOVIES}/${movieId}`)
      .send({ name: "John Wick"})
   
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe("John Wick")  
})
// Set genre to a movie
test("Post -> 'URL_MOVIES/:id/genres', should status code 200, res.body to be defined", async () => {
    const genre = await Genre.create({
        name: "Action"
    })
    const res = await request(app)
        .post(`${URL_MOVIES}/${movieId}/genres`)
        .send([genre.id])

    //  console.log(res.body)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBe(genre.id)
    
    await genre.destroy()
})
// Set actor to a movie
test("Post -> 'URL_MOVIES/:id/actors', should return status code 200, res.body to be defined and res.body.length = 1", async () => {
    
    const result = await Actor.create({
            first_name: "Sendeya",
            last_name: "Mani",
            nacionality: "USA",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Vin_Diesel_cropped.jpg/220px-Vin_Diesel_cropped.jpg",
            birthday:"1990"
        
    })
    const res = await request(app)
      .post(`${URL_MOVIES}/${movieId}/actors`)
      .send([result.id])

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.length).toBe(1)
    expect(res.body).toHaveLength(1)
    
    
    await result.destroy()
})
// set Director to a movie
test("Post -> 'URL_MOVIES/:id/directors', should return status code 200, res.body to be defined and res.body.length = 1", async () => {
    
    const director = await Director.create({
            name: "Mell ",
            nacionality:"USA",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/George_Lucas_cropped_2009.jpg/220px-George_Lucas_cropped_2009.jpg",
            birthday: "1944",
            movieId: movie.id
      
    })
    const res = await request(app)
      .post(`${URL_MOVIES}/${movieId}/directors`)
      .send([director.id])

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.length).toBe(1)
    expect(res.body).toHaveLength(1)
    
    
    await director.destroy()
})
// Delete
test("Delete 'URL_MOVIES', should return status code 204", async () => {
    const res = await request(app)
       .delete(`${URL_MOVIES}/${movieId}`)

    expect(res.statusCode).toBe(204)   
    // await actor.destroy()
})