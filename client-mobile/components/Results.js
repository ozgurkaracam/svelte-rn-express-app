import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Results = ({ results, navigation }) => {
  const route = useNavigation();

  return (
    <ScrollView style={styles.resultContainer}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>
          {results.title} için bulunan{" "}
          <Text style={{ fontWeight: "700" }}>{results.prices.length}</Text>{" "}
          Arama Sonucu
        </Text>
      </View>
      {results.prices.map((detail) => {
        return (
          <TouchableOpacity
            onPress={() =>
              route.navigate("GoSite", {
                title: results.title,
                link: detail.link,
              })
            }
            key={detail.link}
          >
            <View style={styles.resultRow}>
              <View style={{ flex: 1 }}>
                <Image
                  source={{
                    uri: detail.img,
                  }}
                  style={{ resizeMode: "contain", width: 60, height: 60 }}
                />
              </View>
              <View
                style={{
                  flex: 3,
                }}
              >
                <Text>{detail.title}</Text>
                <View style={styles.cargoContainer}>
                  <Text
                    style={[
                      styles.cargo,
                      {
                        color:
                          detail.cargo == "Ücretsiz Kargo" ? "green" : "red",
                      },
                    ]}
                  >
                    {detail.cargo}
                  </Text>
                  <Text style={styles.cargoTime}> {detail.cargoTime}</Text>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.price}>{detail.price} TL</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default Results;

const styles = StyleSheet.create({
  heading: {
    borderTopWidth: 0.2,
    borderBottomWidth: 0.2,
    paddingVertical: 20,
    marginVertical: 10,
  },
  headingText: {
    fontSize: 15,
  },
  resultContainer: {
    padding: 20,
  },
  resultRow: {
    marginBottom: 10,
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    alignItems: "center",
  },
  price: {
    fontWeight: "700",
  },
  cargoContainer: {
    flexDirection: "row",
  },
  cargoTime: {
    color: "purple",
  },
  cargo: {},
});

// rnce
