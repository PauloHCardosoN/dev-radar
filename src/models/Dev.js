//Importando modulos
const mongoose = require('mongoose')
const PointSchema = require('../utils/PointSchema')


//Definindo variavel|constante para receber dados dos devs
const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
});


//Exportando variavel
module.exports = mongoose.model('Dev', DevSchema)