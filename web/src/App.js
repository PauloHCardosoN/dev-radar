import React, { useEffect , useState } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import DevItem from './components/DevItem/index';
import DevForm from './components/DevForm/index';


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

  async function handleAddDev(data){


    const response = await api.post('./devs',data)

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

export default App;
