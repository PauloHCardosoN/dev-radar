import React, { useEffect , useState } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import DevItem from './components/DevItem/index'


function App() {
  const [ devs, setDevs ] = useState([])


  const [ github_username, setGithubUsername] = useState('')
  const [ techs, setTechs ] = useState('')


  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')


  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(
      (position)=>{
        const { latitude, longitude } = position.coords;

        setLatitude(latitude)
        setLongitude(longitude)
      },
      (err)=>{
        console.log(err)
      },
      {
        timeout: 30000,
      }
    );
  }, [])
  
  useEffect(()=>{
    async function loadDevs(){
      const response = await api.get('/devs');

      setDevs(response.data)
    }
     loadDevs()
  }, [])

  async function handleAddDev(e){
    e.preventDefault();


    const response = await api.post('./devs',{
      github_username,
      techs,
      latitude,
      longitude,
    })

    console.log(response)
  }

  return (
    <div id="app">
      <aside>
        <strong>
          <h2>
            Cadastrar
          </h2>
        </strong>

        <form onSubmit={handleAddDev}>

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
              disabled 
              type="number" 
              name="latitude" 
              required value={latitude}
              onChange={e => setLatitude(e.target.value)}
              />
            </div>

            <div className="input-block">

              <label htmlFor="longitude">Longitude</label>
              <input 
              disabled 
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

export default App;
