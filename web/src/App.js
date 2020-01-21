//Importando modulos
import React, { useEffect , useState } from 'react';

//Importando a API do servidor de "banco de dados"
import api from './services/api';


//Importando componentes
import DevItem from './components/DevItem/index';
import DevForm from './components/DevForm/index';

//Importando estilização
import './global.css';
import './App.css';


//Criando componente
function App() {

  //Criando variaveis|constantes para pegar os valores da API do Github
  /*
    devs: Lista de Desenvolvedores no "Banco de Dados" (Definida pelo seu "Banco de Dados")
    github_username: Nickname ou Nome de Usuário no Github (Definida pelo Github API)
    techs: Tecnologias que o usúario trabalha (Definida Manualmente)
    latitude & longitude: Cordenadas cadastrada pelo dev (Definida Automaticamente na página de SignUp)
  */
  //!O 'useState(*string*|*number*)' pega a primeira váriavel e
  //transforma numa função que retornar o valor do Array[0]
  //então a função 'useState' sempre vai procurar o primeiro valor, o segundo sempre vai ter um [código nativo].
  const [ devs, setDevs ] = useState([])//<-- Neste caso ele vai pegar a string e transformar em um Array
  const [ github_username, setGithubUsername] = useState('')
  const [ techs, setTechs ] = useState('')
  const [ latitude, setLatitude ] = useState('')
  const [ longitude, setLongitude ] = useState('')

  //!Ação que ocorre ao rederizar o App
  //Criando ação de configurar as cordenadas atuais do dev
  useEffect(()=>{

    //Pegar a atual posição do dev
    navigator.geolocation.getCurrentPosition(

      //!Caso de certo
      //Pegando a latitude e longitude do dev
      (position)=>{
        //Desestruturação da variavel|constante na valor 'coords' |  position.coords <- Valor que contem as variaveis latitude & longitude
        const { latitude, longitude } = position.coords;

        //Configurando a latitude & longitude
        setLatitude(latitude)
        setLongitude(longitude)
      },

      //!Caso de errado
      //Alertando um erro
      (err)=>{
        alert('Não foi possivel detectar sua posição atual. Tente novamente mais tarde')
      },

      //Configuranções opcionais
      {
        //Tempo maximo de solicitação, caso o ultrapasse, o erro é ativado
        timeout: 30000,
      }
    );
  }, [])


  //!Ação que ocorre ao renderizar o App
  //Criando um conexão com o servidor do "Banco de Dados"
  useEffect(()=>{
    async function loadDevs(){

      //Criando uma constante de que manda uma requisição ao "Banco de Dados"
      const response = await api.get('/devs');

      //Fazendo uma requisição ao servidor
      //Recebendo Informações do servidor
      setDevs(response.data)
    }

    //Renderiza os devs no App.js de acordo com os dados 
    loadDevs()
  }, [])
  
  async function handleAddDev(data){

    //Envia os dados com o metodo o HTTP 'POST', ou seja, um cadastro para a API (Confira o api.js)
    /*
    Os dados (response.data) contem { latitude, longitude, github_username, techs } 
    */
    const response = await api.post('./devs',data)


    //Envia os dados que foram adicionados no formulário
    //setDevs([Onde adicionar, Dados à adicionar])
    setDevs([...devs, response.data])


  }

  return (
    <div id="app">
      <aside>
        <strong>
          <h2>
            Cadastrar
          </h2>
        </strong>

        <DevForm onSubmit={handleAddDev}/>
      </aside>

      <main>
        <ul>

          {devs.map(dev => (

            <DevItem key={dev._id} dev={ dev }/>

          ))}

        </ul>
      </main>
    </div>
  );
}


//Exportar componente
export default App;
