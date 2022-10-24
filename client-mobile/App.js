import { Text, View,SafeAreaView,StyleSheet,ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import SearchBar from './components/SearchBar'
import Results from './components/Results'
import axios from 'axios'
import baseURL from './utils/baseURL'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import GoSite from './components/GoSite'


const Home = () => {
  const [results, setresults] = useState(null)
  const [loading, setloading] = useState(false)
  const [searchtext, setsearchtext] = useState("")
  function getDetails(link){
    setloading(true)
    axios.post(`${baseURL}getDetails`,{link}).then(data=>{
      setresults(data.data)
    }).catch(err=>{
      console.log(err);
    }).finally(data=>{
        setloading(false)
        setsearchtext("")
    })
  }
  return (
    <SafeAreaView>
        <SearchBar getDetails={getDetails} setloading={setloading} searchtext={searchtext} setsearchtext={setsearchtext} />
        {loading && <ActivityIndicator size={"large"} color="orange" style={{marginVertical:50}}  />}
        {results!=null && !loading && (<Results results={results} setloading={setloading} />)}
      </SafeAreaView>
  )
}

const Stack = createNativeStackNavigator();

function App() {
  return ( 
    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{
          title:'',
          headerShown:false
        }}
         />
        <Stack.Screen name="GoSite" component={GoSite} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App