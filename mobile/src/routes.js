//Importando Modulos
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, HeaderTitle } from 'react-navigation-stack';

//Importando Componentes
import Main from './pages/Main';
import Profile from './pages/Profile';


//Criando a página principal do App
const Routes = createAppContainer(
    //Função Nativa para carregar páginas no App
    createStackNavigator({
        //Páginas
        Main: {
            //screen* Qual componente ele vai rederizar
            screen: Main,//<!-- Está renderizando o Main, lá do './pages/Main.js'
            //nagigationOptions* Algumas opções que podem ser definidas
            navigationOptions: {
                title: 'DevRadar',//<!-- O Titulo da aba que aparecerá no topo da tela
            }
        },
        Profile: {
            screen: Profile,//<!-- Está renderizando o Main, lá do './pages/Profile.js'
            navigationOptions: {
                title: 'Perfil no Github'//<!-- O Titulo da aba que aparecerá no topo da tela
            }
        },
    },
    //Opções adicionais
    {
        //Definir as opções padrões
        defaultNavigationOptions: {
            //Estilização do Header
            headerStyle: {
                //Cor de Fundo
                backgroundColor: '#7D40E7'
            },
            //Cor das Letras do Header
            headerTintColor: 'white',
            //Define se o nome da aplicação aparece junto da seta * < DevRadar *
            headerBackTitleVisible: false
        }
    })
)

//Exportando o Componente
export default Routes;
