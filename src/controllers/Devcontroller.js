const axios = require('axios');
const Dev = require('../models/Dev') 
const parseStringAsArray = require('../utils/parseStringasArray');
const { findConnections, sendMessage } = require('../websocket')


module.exports = {
    
    //Pega todos os devs cadastrados
    async index(req, res){
        const devs = await Dev.find()

        return res.json(devs)
    },

    //Cadastra um novo dev
    async store(req,res){

        const { github_username, techs, latitude, longitude } = req.body;

        let dev = await Dev.findOne({ github_username })


        if(!dev){
            const APIres = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = APIres.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
            

            const sendSocketMenssageTo = findConnections({
                latitude,
                longitude
            },techsArray)

            sendMessage(sendSocketMenssageTo, 'newDev', dev);

        }


        return res.json(dev)


    }

}