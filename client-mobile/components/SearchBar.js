import { View, Text, StyleSheet, TextInput,TouchableOpacity } from "react-native";
import React, { useState } from "react";
import baseURL from "../utils/baseURL";
import axios from "axios";

export default function SearchBar({getDetails,setsearchtext,searchtext}) {
  const [title, settitle] = useState("");
  const [suggestions, setsuggestions] = useState([]);
  function changeText(text) {
    setsearchtext(text);
    axios
      .get(`${baseURL}getSuggestions/${searchtext}`)
      .then((data) => {
        setsuggestions(data.data);
        console.log(suggestions);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={changeText}
        autoCapitalize={false}
        style={styles.searchForm}
        placeholder="Aramak İstediğiniz Şeyi Yazınız!"
        value={searchtext}
      />
      {suggestions.length > 0 && (
            <View style={styles.suggestionsContainer}>
          {suggestions.map((s) => (
        <TouchableOpacity key={s.url} onPress={async ()=>{
            await getDetails(s.url)
            setsuggestions([])
        }}>

            <View style={styles.suggestionsRow}>
              <Text>{s.title}</Text>
            </View>
        </TouchableOpacity>

          ))}
        </View>
      )}
    </View>
  );
}

// rnf

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  searchForm: {
    borderBottomWidth: 1,
    padding: 6,
  },
  suggestionsContainer:{
      padding:10
  },
  suggestionsRow:{
      marginBottom:10,
      flexDirection:"column"
  }
});

// rnss
