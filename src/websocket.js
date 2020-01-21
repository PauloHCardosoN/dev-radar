//Importando modulos
const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringasArray');
const calcDist = require('./utils/calculateDistance')

//Criando variaveis globais
let io;
const connections = [];//Definindo que 'connections' será um Array


exports.setupWebsoket = (server) => {
    //Conectando ao servidor, e pega informações
    io = socketio(server);


    //Criando evento na conexão
    io.on('connection', socket => {
        //Ajustando variaveis|constantes
        const { latitude, longitude, techs } = socket.handshake.query;


        //Pega as informações do socketio(server) no Array connections
        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs)
        })
    })
}

//Exportando função
exports.findConnections = (coordinates, techs) => {
    //Filtra as conexões
    return connections.filter(connections => {
        //Não encontre devs à mais de 10Km de Distancia 
        return calcDist(coordinates, connections.coordinates) < 10
         && connections.techs.some(item => techs.includes(item))
    })
}


//Exportando função
exports.sendMessage = (to, message, data) => {

    to.forEach(connection => {
        io.to(connection.id).emit(message, data)
        console.log(io.to(connection.id))
    })
}