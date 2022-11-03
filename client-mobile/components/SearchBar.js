import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import baseURL from "../utils/baseURL";
import axios from "axios";
import { Box, Card, Center, Input } from "native-base";

export default function SearchBar({
  getDetails,
  setsearchtext,
  searchtext,
  setloading,
}) {
  const [title, settitle] = useState("");
  const [suggestions, setsuggestions] = useState([]);
  function changeText(text) {
    setsearchtext(text);
    setloading(true);
    axios
      .get(`${baseURL}getSuggestions/${searchtext}`)
      .then((data) => {
        setsuggestions(data.data);
        console.log(suggestions);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally((e) => {
        setloading(false);
      });
  }

  return (
    <View style={styles.container}>
      {/* <TextInput
        onChangeText={changeText}
        autoCapitalize={false}
        style={styles.searchForm}
        placeholder="Aramak İstediğiniz Şeyi Yazınız!"
        value={searchtext}
      /> */}
      <Input
        placeholder="Aramak İçin bir Şey Yazınız"
        onChangeText={changeText}
        autoCapitalize={false}
        size={"lg"}
        value={searchtext}
        backgroundColor="warmGray.100"
        borderColor={"amber.500"}
        _focus={{
          borderColor: "amber.500",
        }}
      />

      {suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          {suggestions.map((s) => (
            <TouchableOpacity
              key={s.url}
              onPress={async () => {
                await getDetails(s.url);
                setsuggestions([]);
              }}
            >
              <Box bg="warning.100" p="4" marginBottom={4} rounded="lg">
                <Text>{s.title}</Text>
              </Box>
              {/* <View style={styles.suggestionsRow}></View> */}
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
  suggestionsContainer: {
    padding: 10,
  },
  suggestionsRow: {
    marginBottom: 10,
    flexDirection: "column",
  },
});

// rnss
