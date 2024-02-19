const express = require('express');
const routerGenre = require('./genre.router');
const routerMovie = require('./movie.router');
const routerActor = require('./actor.router');
const routerDirector = require('./director.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/genres', routerGenre)
router.use('/movies', routerMovie)
router.use('/actors', routerActor)
router.use('/directors', routerDirector)


module.exports = router;