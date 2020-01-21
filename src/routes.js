//Definindo constante de um modulo
const { Router } = require('express')

//Definindo rotas com constantes
const DevController = require('./controllers/Devcontroller')
const SearchController = require('./controllers/SearchController.js')

//Função Nativa do 'express'
const routes = Router()

//Todas essas são funções definidas no '../controllers'

/*Caso o metodo HTTP seja, GET, apenas rederize os devs -->*/routes.get('/devs', DevController.index);
/*Caso o metodo HTTP seja, POST, cadastre o dev com as informações repassadas -->*/routes.post('/devs', DevController.store);

/*Caso o metode HTTP seja, GET, filtre devs com as informações repassadas -->*/routes.get('/search', SearchController.index);

//Exportando modulo
module.exports = routes;