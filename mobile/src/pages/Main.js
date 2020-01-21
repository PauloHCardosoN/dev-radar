import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location' 
import { MaterialIcons } from '@expo/vector-icons';


import { connect, disconnect, subscribeToNewDevs } from '../services/socket';
import api from '../services/api';



function Main({ navigation }){


    const [devs, setDevs] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null)
    const [techs, setTechs] = useState('')



    function setupWebsoket(){
        disconnect();

        const { latitude, longitude } = currentRegion


        connect(
            latitude,
            longitude,
            techs
        )

    }


    async function loadDevs(){
        const { latitude, longitude } = currentRegion;

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
        })

        
        setDevs(response.data.devs);
        setupWebsoket();

    }


    useEffect(() => {
        subscribeToNewDevs(dev => setDevs([...devs, dev]))
    }, [devs])

    useEffect(() => {
        async function loadInitialPosition(){
            const { granted } = await requestPermissionsAsync() 



            if(granted){
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                })


                const { latitude , longitude } = coords;

                setCurrentRegion({
                    latitude:  -3.012991,
                    longitude: -59.987220,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                })
            }
        }


        loadInitialPosition()
    }, [])

    function handleRegionChanged(region){
        setCurrentRegion(region)
    }



    if(!currentRegion){
        return null;
    }



    return(
        <>
            <MapView onRegionChangeComplete={handleRegionChanged} initialRegion={currentRegion} style={styles.map}>

                    {devs.map(dev => (
                        <Marker 
                        key={dev._id} 
                        coordinate={{ longitude: dev.location.coordinates[0], latitude: dev.location.coordinates[1]  }}
                        >

                            <Image style={styles.avatar} source={{ uri: dev.avatar_url }}/>

                            <Callout onPress={()=>{
                                navigation.navigate('Profile', { github_username: dev.github_username })
                            }}>
                                <View style={styles.callout}>
                                    <Text style={styles.name}>{ dev.name }</Text>
                                    <Text style={styles.bio}>{ dev.bio }</Text>
                                    <Text style={styles.techs}>{ dev.techs.join(', ') }</Text>
                                </View>
                            </Callout>

                        </Marker>
                    ))}
            </MapView>
            <View style={styles.searchForm}>
                <TextInput 
                style={styles.searchInput} 
                placeholder="Buscar devs por techs..." 
                placeholderTextColor="#999999" 
                autoCapitalize="words" autoCorrect={false} 
                value={techs} 
                onChangeText={setTechs} />
                <TouchableOpacity onPress={loadDevs} style={styles.loadButton}> 
                    <MaterialIcons name="my-location" size={20} color="#FFF"/>
                </TouchableOpacity>
            </View> 
        </>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    avatar: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray'
    },
    callout: {
        width: 260,
        borderRadius: 4,
        padding: 10
    },
    name: {
        fontWeight: 'bold',
    },
    bio: {
        color: 'rgba(0,0,0,0.7)',
        marginTop: 10,
        marginBottom: 10
    },
    searchInput:{
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        paddingVertical: 7.5,
        borderRadius: 25,
        fontSize: 16,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 5,
            height: 5
        },
        elevation: 2,
        marginRight: 15
    },
    searchForm: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        zIndex: 5,
        flexDirection: 'row',
    },
    loadButton:{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#8E4Dff',
        alignItems: 'center',
        justifyContent: 'center'
    }

})

export default Main;