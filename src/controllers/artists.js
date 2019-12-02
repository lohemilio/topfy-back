const Artist = require('../models/artist.js')

const getArtists = function(req, res) {
  // solo podemos hacer GET de los todos del usuario que hizo login
  Artist.find({ createdBy: req.user._id}).then(function(artists) {
    res.send(artists)
  }).catch(function(error){
    res.status(500).send(error)
  })
}

const getArtist = function(req, res) {
  // solo podemos traer el todo si es que es del usuario que hizo login
  const _id = req.params.id
  Artist.findOne({ _id, createdBy: req.user._id }).then(function(artist) {
    if(!artist){
      return res.status(404).send({ error: `Task with id ${_id} not found.`})
    }
    return res.send(artist)
  }).catch(function(error) {
    return res.status(500).send({ error: error })
  })
}

const createArtist = function(req, res){
  // los ... son para copiar todo el req.body
  // modificar aqui
  const artist = new Artist({
    //...req.body.description
    name: req.body.name,
    createdBy: req.user._id
  })
  artist.save().then(function() {
    return res.send(artist)
  }).catch(function(error) {
    return res.status(400).send({ error: error })
  })
}

/*const updateTodo = function(req, res) {
  const _id = req.params.id
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  // revisa que los updates enviados sean permitidos, que no envie una key que no permitimos
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

  if( !isValidUpdate ) {
    return res.status(400).send({
      error: 'Invalid update, only allowed to update: ' + allowedUpdates
    })
  }
  // ya no solo buscamos por id, si no también deberia de ser de el owner
  // del todo por lo tanto usamos findOneAndUpdate para pasarle mas datos
  // Todo.findByIdAndUpdate(_id, req.body ).then(function(todo) {
  Todo.findOneAndUpdate({ _id, createdBy: req.user._id }, req.body ).then(function(todo) {
    if (!todo) {
      return res.status(404).send({ error: `Task with id ${_id} not found.`})
    }
    return res.send(todo)
  }).catch(function(error) {
    res.status(500).send({ error: error })
  })
}*/

const deleteArtist = function(req, res) {
  const _id = req.params.id
  Artist.findOneAndDelete({ _id, createdBy: req.user._id }).then(function(artist){
    if(!artist) {
      return res.status(404).send({ error: `Task with id ${_id} not found.`})
    }
    return res.send(artist)
  }).catch(function(error) {
    res.status(505).send({ error: error })
  })
}

module.exports = {
  getArtists : getArtists,
  getArtist: getArtist,
  createArtist : createArtist,
  //updateTodo : updateTodo,
  deleteArtist : deleteArtist
}