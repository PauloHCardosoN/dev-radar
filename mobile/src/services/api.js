//Importanto o Axios
import axios from 'axios';


//Cria uma variavel|constante que cria a conexão com o "Banco de Dados"
const api = axios.create({
    baseURL: "http://192.168.1.12:5000",
})


//Exporta a variavel|constante de conexão 
export default api;