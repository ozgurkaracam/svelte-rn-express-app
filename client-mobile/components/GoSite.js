import { View, Text } from 'react-native'
import React,{useEffect} from 'react'
import WebView from 'react-native-webview'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native'

const GoSite = () => {
    const {link,title}=useRoute().params
    const navigation=useNavigation()
    useEffect(() => {

        navigation.setOptions({
            title
        })
      return () => {
      }
    }, [navigation])
    
  return (
        <WebView
      source={{ uri: link }}
    />
  )
}

export default GoSite