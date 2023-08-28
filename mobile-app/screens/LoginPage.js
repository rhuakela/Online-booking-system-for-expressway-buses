import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import pic from "../assets/rr.jpg";

import { useNavigation } from "@react-navigation/native";

export default function LoginPage() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://192.168.1.9:8070/api/users/login", {
        email: email,
        password: password,
      });
      if (res.data.success) {
        await AsyncStorage.setItem("token", res.data.data);
        await AsyncStorage.setItem("user", res.data.user);
        navigation.navigate("ClientHome");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.main_container}>
      <View style={{ marginBottom: 50 }}>
        <Text style={styles.header_text}>Welcome to GoBus</Text>
        <Image style={styles.pic} source={pic}></Image>
      </View>
      <View>
        <Text style={styles.input_lable}>Email</Text>
        <TextInput
          style={styles.input_text}
          keyboardType="email-address"
          placeholder="Enter email"
          onChangeText={(text) => setEmail(text)}
        ></TextInput>
        <Text style={styles.input_lable}>Password</Text>
        <TextInput
          style={styles.input_text}
          secureTextEntry={true}
          placeholder="Enter password"
          onChangeText={(text) => setPassword(text)}
        ></TextInput>

        <TouchableOpacity
          style={{
            alignContent: "center",
            marginTop: 35,
            backgroundColor: "#0D47A1",
            height: 45,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 7,
            width: "100%",
          }}
          onPress={() => handleLogin()}
          underlayColor="#0084fffa"
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
            Login
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          <Text
            style={{
              color: "#130160",
              fontSize: 17,
              textAlign: "center",
              marginRight: 7,
            }}
          >
            You don't have an account yet?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Sign Up")}>
            <Text
              style={{
                fontWeight: "bold",
                opacity: 0.6,
                fontSize: 17,
                color: "#1565C0",
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    top: 50,
    margin: 15,
  },
  header_text: {
    fontSize: 30,
    fontWeight: "700",
    color: "#130160",
    textAlign: "center",
  },
  input_text: {
    fontSize: 17,
    borderColor: "#67afff",
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 10,
    paddingLeft: 10,
    marginVertical: 5,
  },
  input_lable: {
    color: "#0D0140",
    marginVertical: 5,
    fontWeight: "bold",
    fontSize: 20,
  },
  pic: {
    width: 200,
    height: 200,
    marginLeft: 70,
  },
});
