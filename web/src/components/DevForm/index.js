import React, { useState, useEffect } from 'react';



function DevForm({ onSubmit }){

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
          alert('Não foi possivel obter sua localização atual. Por favor, tente novamente mais tarde ou confira se seu GPS está habilitado')
        },
        {
          timeout: 30000,
        }
      );
  }, [])

  async function handleSubmit(e){
      e.preventDefault();

      await onSubmit({
        github_username,
        techs,
        latitude,
        longitude,
      });

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

export default DevForm;