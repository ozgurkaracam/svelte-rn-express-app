import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import WebView from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";

const GoSite = () => {
  const { link, title } = useRoute().params;
  const [loader, setloader] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    setloader(true);
    navigation.setOptions({
      title,
    });
    // setTimeout(() => setloader(false), 4000);
    return () => {
      setloader(true);
    };
  }, [navigation]);

  return (
    <>
      {loader && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color={"orange"} size={"large"} />
        </View>
      )}

      <WebView
        source={{ uri: link }}
        onNavigationStateChange={(t) => {
          if (!t.url.startsWith("https://www.cimri.com")) {
            setTimeout(() => setloader(false), 1000);
          } else {
          }
        }}
        style={{ display: loader ? "none" : "block" }}
      />
    </>
  );
};

export default GoSite;
