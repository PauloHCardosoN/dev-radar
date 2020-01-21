//Importando o SocketIO
import socketio from 'socket.io-client' ;


//Criando variavel|constante de conexão com o "Banco de Dados"
const socket = socketio(`http://192.168.1.12:5000`,{
    //Define se ele se conectará automaticamente
    autoConnect: false
})


//Quando o evento 'newDev' for disparado, o 'subscribeFunction' será disparado
function subscribeToNewDevs(subscribeFunction) {
    //socket.on('CallBack',execultarFunção)
    socket.on('newDev',subscribeFunction)
}

//Conectando ao "Banco de Dados" e levando dados
/* latitude, longitude, techs */ 
function connect(latitude, longitude, techs){
    //Retorna os valores de latitude & longitude & techs para o socket.io.opts.query <-- Onde contem os informações
    //Enviandos no connect(*Aqui*) e trocando pelos atuais
    //!Utilize um
    /*
        console.log(socket.io.opts.query)
    */
    //para saber qual informações estão sendo enviadas, 
    //caso esteja vazio, verifique a conexão
    socket.io.opts.query = {
        latitude,
        longitude,
        techs
    }
   

    //Conectando ao "Banco de Dados"
    socket.connect();

    //socket.on('Callback',execultarFunção)
    socket.on('message',text => {})
}

//Função de Desconectar
function disconnect(){
    //!Caso estaja conectado
    if(socket.connected)
        //Desconectar
        socket.disconnect();
}

//Exportando funções
export {
    connect,
    disconnect,
    subscribeToNewDevs
}