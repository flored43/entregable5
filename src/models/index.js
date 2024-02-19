const Movie = require('./Movie')
const Genre = require('./Genre')
const Actor = require('./Actor')
const Director = require('./Director')

Genre.belongsToMany(Movie, { through: 'genreMovie' })
Movie.belongsToMany(Genre, { through: 'genreMovie' })

// Movie.hasMany(Actor)
// Actor.hasMany(Movie)
// Movie.hasMany(Director)
// Director.hasMany(Movie)

Movie.belongsToMany(Actor, { through: 'movieActor' })
Actor.belongsToMany(Movie, { through: 'movieActor' })

Movie.belongsToMany(Director, { through: 'movieDirector' })
Director.belongsToMany(Movie, { through: 'movieDirector' })



