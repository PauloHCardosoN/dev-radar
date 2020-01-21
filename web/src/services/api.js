//Importando axios
import axios from 'axios';

//Criando variavel|constante de conexão com o servidor com o "Banco de Dados"
const api = axios.create({
    baseURL: 'http://localhost:5000'
})

//Exporta a variavel|constante
export default api;