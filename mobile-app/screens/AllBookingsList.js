import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AllBookingsList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = await AsyncStorage.getItem("token"); // Retrieve the JWT token from AsyncStorage or any other storage mechanism
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.post(
          "http://192.168.1.9:8070/api/bookings/get-bookings-by-user-id",
          { userId: await AsyncStorage.getItem("user") },
          { headers }
        );
        setData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookings();
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
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ flex: 0.5 }}>Bus Name : {item.bus.name}</Text>
        <Text style={{ flex: 0.5 }}>Bus Number : {item.bus.number}</Text>
      </View>
      <View style={{ paddingTop: 15 }}>
        <Text style={{ flex: 1 }}>Journey Date: {item.bus.journeyDate}</Text>
      </View>
      <View style={{ paddingTop: 15 }}>
        <Text style={{ flex: 1 }}>Journey Time: {item.bus.departure}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 10,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ flex: 1 }}>
          Seats:{" "}
          {item.seats?.map((item, i) => (
            <Text key={i}>{item} </Text>
          ))}
        </Text>
        {/* <TouchableOpacity style={{
          alignItems: 'center',
          backgroundColor: '#90B77D',
          padding: 7,
          borderRadius: 10, borderBottomWidth: 1, borderColor: "#000"
        }}>
          <Text>Print Ticket</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
  return (
    <View>
      <View style={styles.box1}>
        <Text style={styles.boxTitle}>Booking List</Text>
      </View>

      <ScrollView>
        <FlatList
          style={styles.box}
          data={data}
          renderItem={renderItem}
          // keyExtractor={(item) => item.id.toString()}
          keyExtractor={(item) => item._id}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#f2f2f2",
    borderRadius: 5,

    //borderBottomLeftRadius:10,

    //justifyContent: 'center',
    //alignItems: 'center',
    //top:10
  },
  box1: {
    width: "98%",
    marginLeft: 3,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    height: 100,
    backgroundColor: "#90B77D",
    justifyContent: "center",
    alignContent: "center",
  },
  boxTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 136,
  },
});
