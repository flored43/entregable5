require('../models')

const request = require("supertest")
const app = require('../app')
const Genre = require('../models/Genre')

const URL_ACTORS ='/actors'

const actor = {
    first_name: "Vin",
    last_name: "Diesel",
    nacionality: "USA",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Vin_Diesel_cropped.jpg/220px-Vin_Diesel_cropped.jpg",
    birthday:"1990"
}

let actorId;

// Create item
test("Post -> 'URL_ACTORS, should return status code 201, and res.body.name = actor.name", async () => {
    const res = await request(app)
      .post(URL_ACTORS)
      .send(actor)

    actorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(actor.name)
})
// Get All
test("Get -> 'URL_ACTORS, should return status code 200, res.body to be defined and res.body.length = 1", async () => {
  const res = await request(app)
     .get(URL_ACTORS)

   expect(res.statusCode).toBe(200)
   expect(res.body).toBeDefined()
   expect(res.body).toHaveLength(1)  
})
// Get one 
test("Get -> 'URL_ACTORS/:id', should return status code 200, res.body to be defined and res.body.name = actor.name", async () => {
  const res = await request(app)
     .get(`${URL_ACTORS}/${actorId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(actor.name)  
})
// Update
test("Put -> 'URL_ACTORS/:id', shuold return status code 200, res.body to be defined and res.body.name = 'Vin Diesel'", async () => {
  const res = await request(app)
     .put(`${URL_ACTORS}/${actorId}`)
     .send({ first_name: 'John Wick'})
  //  console.log(res)
   expect(res.statusCode).toBe(200)
   expect(res.body).toBeDefined()
   expect(res.body.first_name).toBe('John Wick')  
}) 
// Delete
test("Delete -> 'URL_ACTORS/:id', should return status code 204", async () => {
  const res = await request(app)
     .delete(`${URL_ACTORS}/${actorId}`)

  expect(res.statusCode).toBe(204)   
})

