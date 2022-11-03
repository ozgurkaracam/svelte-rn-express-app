import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import Results from "./components/Results";
import axios from "axios";
import baseURL from "./utils/baseURL";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GoSite from "./components/GoSite";
import NetInfo from "@react-native-community/netinfo";
import { NativeBaseProvider, Box } from "native-base";

const Home = () => {
  const [results, setresults] = useState(null);
  const [loading, setloading] = useState(false);
  const [searchtext, setsearchtext] = useState("");
  const [internetConnection, setinternetConnection] = useState(true);

  function getDetails(link) {
    setloading(true);
    axios
      .post(`${baseURL}getDetails`, { link })
      .then((data) => {
        setresults(data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally((data) => {
        setloading(false);
        setsearchtext("");
      });
  }

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setinternetConnection(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, [internetConnection]);
  if (!internetConnection)
    return (
      <View
        style={{
          backgroundColor: "black",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "600", color: "orange", fontSize: 20 }}>
          İnternet Bağlantınızı Kontrol Edin
        </Text>
      </View>
    );

  return (
    <NativeBaseProvider>
      <SafeAreaView
        style={{
          paddingVertical: Platform.OS == "android" ? 30 : 0,
        }}
      >
        <SearchBar
          getDetails={getDetails}
          setloading={setloading}
          searchtext={searchtext}
          setsearchtext={setsearchtext}
        />

        {loading && (
          <ActivityIndicator
            size={"large"}
            color="orange"
            style={{ marginVertical: 50 }}
          />
        )}
        {results != null && !loading && (
          <Results results={results} setloading={setloading} />
        )}
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="GoSite"
          options={{
            headerStyle: {
              backgroundColor: "black",
            },
            headerTintColor: "white",
          }}
          component={GoSite}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
