import { View, Text,StyleSheet,Image,Dimensions,ScrollView } from 'react-native'
import React from 'react'

const Results = ({results}) => {
  return (
    <ScrollView style={styles.resultContainer}>
        <View style={styles.heading}>
            <Text style={styles.headingText}>
                {results.title} için bulunan {results.prices.length} Arama Sonucu
            </Text>
        </View>
      {results.prices.map(detail=>{
          return (<View style={styles.resultRow}>

<View>
            <Image source={{
                uri:detail.img
            }} style={{width:40,height:40}} />
</View>
              <View style={{
                  width:Dimensions.get("screen").width*2/3,
                  marginHorizontal:10
              }}><Text>{detail.title}</Text></View>
              <View><Text style={styles.price}>{detail.price} TL</Text></View>
          </View>)
      })}
    </ScrollView>
  )
}

export default Results

const styles = StyleSheet.create({
    heading:{
        borderTopWidth:.2,
        borderBottomWidth:.2,
        paddingVertical:20,
        marginVertical:10
    },
    headingText:{
        fontSize:15,
    
    },
    resultContainer:{
        padding:10
    },
    resultRow:{
        marginBottom:10,
        flexDirection:"row"
    },
    price:{
        fontWeight:"700"
    }
})

// rnce