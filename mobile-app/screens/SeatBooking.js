import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import Box from "./Box";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BusSeatBookingPage = () => {
  const [seatsBooked, setSeatsBooked] = useState([]);
  const [fare, setfare] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const {
    params: { id },
  } = useRoute();
  const rows = 8; // Number of rows
  const seatsPerRow = 4; // Number of seats per row

  const navigation = useNavigation();

  useEffect(() => {
    console.log(id);
    axios
      .post("http://192.168.1.9:8070/api/buses/get-bus-by-id", { _id: id })
      .then((response) => {
        setSeatsBooked(response.data.data.seatsBooked);
        setfare(response.data.data.fare);
      })
      .catch((error) => {
        console.log("error");
        console.log(error.message);
      });
  }, []);

  const isSeatBooked = (seatNumber) => {
    return seatsBooked.includes(seatNumber);
  };

  const isSeatSelected = (seatNumber) => {
    return selectedSeats.includes(seatNumber);
  };

  const toggleSeatSelection = (seatNumber) => {
    console.log(seatNumber);
    if (isSeatBooked(seatNumber)) {
      return; // Cannot change the color of booked seats
    }

    if (isSeatSelected(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleBooking = async () => {
    try {
      const obj = {
        bus: id,
        user: await AsyncStorage.getItem("user"),
        transactionId: [],
        seats: selectedSeats,
      };

      const res = await axios.post(
        "http://192.168.1.9:8070/api/bookings/book-seat",
        obj,
        {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data.message);
      navigation.navigate("ClientHome");
    } catch (err) {
      console.log(err);
    }
  };

  const renderSeats = () => {
    const seats = [];
    let seatNumber = 1;

    for (let row = 1; row <= rows; row++) {
      const rowSeats = [];

      for (let seat = 1; seat <= seatsPerRow; seat++) {
        const isBooked = isSeatBooked(seatNumber);
        const isSelected = isSeatSelected(seatNumber);

        rowSeats.push(
          <Box
            isBooked={isBooked}
            isSelected={isSelected}
            toggleSeatSelection={toggleSeatSelection}
            seatNumber={seatNumber}
          />
        );

        seatNumber++;
      }

      seats.push(
        <View key={row} style={styles.seatRow}>
          {rowSeats}
        </View>
      );
    }

    return seats;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.seatContainer}>{renderSeats()}</View>
      <View style={styles.selectedSeatsContainer}>
        <Text style={styles.selectedSeatsText}>Selected Seats: </Text>
        {selectedSeats.map((seat) => (
          <Text key={seat} style={styles.selectedSeatNumber}>
            {seat}
          </Text>
        ))}
      </View>
      <View style={styles.selectedSeatsContainer}>
        <Text style={styles.selectedSeatsText}>Total: </Text>
        <Text> {selectedSeats.length * fare}</Text>
      </View>
      <TouchableOpacity
        style={{
          alignContent: "center",
          marginVertical: 30,
          backgroundColor: "#0D47A1",
          height: 45,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 7,
          paddingHorizontal: 20,
        }}
        onPress={() => {
          handleBooking();
        }}
        underlayColor="#0084fffa"
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
          Book
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  seatRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  seat: {
    width: 60,
    height: 60,
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
  },
  bookedSeat: {
    backgroundColor: "red",
  },
  seatNumber: {
    fontSize: 16,
  },
  white: {
    color: "white",
  },
  green: {
    backgroundColor: "green",
  },
  seatContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  selectedSeatsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  selectedSeatsText: {
    marginRight: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedSeatNumber: {
    fontSize: 16,
    marginRight: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "green",
    color: "white",
    borderRadius: 4,
  },
});

export default BusSeatBookingPage;
