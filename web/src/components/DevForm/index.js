//Importando modulos
import React, { useState, useEffect } from 'react';

//Importando estilização
import './style.css'


//Criando componente do Formulário
function DevForm({ onSubmit }){

  //Criando variaveis|constantes para pegar os valores da API do Github
  /*
    devs: Lista de Desenvolvedores no "Banco de Dados" (Definida pelo seu "Banco de Dados")
    github_username: Nickname ou Nome de Usuário no Github (Definida pelo Github API)
    techs: Tecnologias que o usúario trabalha (Definida Manualmente)
    latitude & longitude: Cordenadas cadastrada pelo dev (Definida Automaticamente na página de Login)
  */
  const [ devs, setDevs ] = useState([])
  const [ github_username, setGithubUsername] = useState('')
  const [ techs, setTechs ] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  
  //Uma função de conclusão do formulário
  async function handleSubmit(e){
    
    //Impede o formulário de te enviar à outro link
    e.preventDefault();

    //Define essas variaveis de acordo com o valor do Formulário
    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude,
    });

    //Define um valor inicial para o github_username & techs
    setGithubUsername('');
    setTechs('');
  }

  return (
    <form onSubmit={handleSubmit}>

        <div className="input-block">

            <label htmlFor="github_username">Usuário do Github</label>
            <input type="text" name="github_username" id="github_username" required value={github_username} onChange={e => setGithubUsername(e.target.value)}/>

        </div>
        <div className="input-block">

            <label htmlFor="techs">Tecnologias</label>
            <input type="text" name="techs" id="techs" required value={techs} onChange={e => setTechs(e.target.value)}/>

        </div>
        
        <div className="input-grid">

            <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input 
            
            type="number" 
            name="latitude" 
            required value={latitude}
            onChange={e => setLatitude(e.target.value)} 
            />
            </div>

            <div className="input-block">

            <label htmlFor="longitude">Longitude</label>
            <input 
             
            type="number" 
            name="longitude"  
            required 
            value={longitude}
            onChange={e => setLongitude(e.target.value)} 
            />

            </div>
            
        </div>

        <button>Enviar</button>

      </form>
  )
}

//Exportando o componente
export default DevForm;