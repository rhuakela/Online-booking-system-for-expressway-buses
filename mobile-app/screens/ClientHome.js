import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function ClientHome() {
  const navigation = useNavigation();

  const [data, setData] = useState([]);

  const handleGetAllBuses = async () => {
    try {
      const res = await axios.post(
        "http://192.168.1.9:8070/api/buses/get-all-buses"
      );
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetAllBuses();
  }, []);

  const renderItem = ({ item }) => (
    <View
      style={{
        padding: 10,
        borderWidth: 2,
        borderColor: "#000",
        margin: 10,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: "#B2B2B2",
          paddingVertical: 5,
        }}
      >
        <Text>{item.name}</Text>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: "#B2B2B2",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 10,
        }}
      >
        <Text>To: {item.to}</Text>
        <Text>From: {item.from}</Text>
        <Text>Fare: {item.fare}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 10,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text>Journey Date : {item.journeyDate}</Text>
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "#90B77D",
            padding: 7,
            borderRadius: 10,
            borderBottomWidth: 1,
            borderColor: "#000",
          }}
          onPress={() => {
            navigation.navigate("seat", { id: item._id });
          }}
        >
          <Text>Press Here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <ScrollView
      style={{ backgroundColor: "#fff", flex: 1, paddingHorizontal: 10 }}
    >
      <View>
        <Image
          source={require("../assets/busWall.jpg")}
          style={styles.image}
        ></Image>
      </View>
      <View>
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: "#90B77D",
            padding: 7,
            margin: 10,
            borderRadius: 5,
            borderBottomWidth: 1,
            borderColor: "#000",
          }}
          onPress={() => navigation.navigate("AllBookingsList")}
        >
          <Text style={{}}>Booking List</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.box1}>
        <Text style={styles.boxTitle}>Bus List</Text>
        <FlatList
          style={styles.box}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  box: {
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    height: 300,
  },
  box1: {
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    height: 400,
    padding: 15,
  },

  boxTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: 220,
    top: 10,
    marginLeft: 80,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "#333",
  },

  headerText: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },
  header2Text: {
    marginLeft: 10,
    marginVertical: 25,
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    width: 200,
    overflow: "hidden",
    margin: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 200,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    resizeMode: "cover",
    zIndex: 2,
    justifyContent: "center",
  },
  cardContent: {
    flex: 1,
    marginVertical: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  subtitle: {
    fontSize: 14,
    marginHorizontal: 10,
    color: "#888",
  },
  date: {
    textAlign: "right",
    fontSize: 14,
    color: "#999999",
    margin: 10,
  },
  price: {
    fontSize: 16,
    color: "#FE3A30",
    fontWeight: "bold",
    marginHorizontal: 10,
    marginTop: 10,
  },
});
