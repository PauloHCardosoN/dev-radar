//Importando o modulo
import React from 'react';

//Importando estilização
import './style.css';

//Criando componente
function DevItem({ dev }){

    return (
        <li className="dev-single">

            <header>

                <img src={dev.avatar_url} className="user-photo" alt={`${dev.github_username}`}></img>

                <div className="user-info">

                <strong>{dev.name}</strong>
                <span>{dev.techs.join(', ')}</span>

                </div>

            </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`} target="_blank" rel="noopener noreferrer">Acessar perfil no Github</a>

        </li>
    )
}



//Exportando componente
export default DevItem;