//Importando modulos
import React from 'react';

//Importando estilização
import { StyleSheet, StatusBar, YellowBox } from 'react-native';

//Importando componentes
import Routes from './src/routes';

/*Apenas uma configuração para não aparecer uma Caixa Amarela de Aviso*/
/*Ainda não é possivel burlar esse aviso, essa é apenas uma configuração para ela não aparecer*/
//!Você pode apagar isso se quiser
YellowBox.ignoreWarnings(['Unrecognized WebSocket'])


//Exportando e Configurando o componente de rederização no Android e IOS
export default function App() {
  return (
    <>
      <StatusBar /*Muda a cor dos itens da StatusBar (IOS)*/ barStyle="light-content" /*Muda a cor dos itens da StatusBar (Android)*/ backgroundColor="black"/>
      <Routes />
    </>
  );
}