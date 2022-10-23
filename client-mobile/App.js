import { Text, View,SafeAreaView } from 'react-native'
import React, { Component,useState } from 'react'
import SearchBar from './components/SearchBar'
import Results from './components/Results'
import axios from 'axios'
import baseURL from './utils/baseURL'


const App = () => {
  const [results, setresults] = useState(null)
  function getDetails(link){
    axios.post(`${baseURL}getDetails`,{link}).then(data=>{
      setresults(data.data)
    })
  }
  return (
    <SafeAreaView>
        <SearchBar getDetails={getDetails} />
        {results!=null && (<Results results={results} />)}
      </SafeAreaView>
  )
}

export default App