import React, { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SignInPage() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChangeText = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSignUp = async () => {
    try {
      if (
        formData.name === "" ||
        formData.email === "" ||
        formData.password === ""
      ) {
        Alert("Please Enter All Required Details");
        return;
      } else {
        const res = await axios.post(
          "http://192.168.1.9:8070/api/users/register",
          formData
        );
        if (res.data.success) {
          navigation.navigate("Login");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.main_container}>
      <View style={styles.main_header}>
        <Text style={styles.header_text}>Create an Account</Text>
      </View>
      <View style={styles.form_group}>
        <Text style={styles.input_lable}>Full Name</Text>
        <TextInput
          style={styles.input_text}
          placeholder="Enter Full Name"
          onChangeText={(val) => handleChangeText("name", val)}
        />
      </View>
      <View style={styles.form_group}>
        <Text style={styles.input_lable}>Email</Text>
        <TextInput
          style={styles.input_text}
          keyboardType="email-address"
          placeholder="Enter Email"
          onChangeText={(val) => handleChangeText("email", val)}
        />
      </View>
      <View style={styles.form_group}>
        <Text style={styles.input_lable}>Password</Text>
        <TextInput
          style={styles.input_text}
          secureTextEntry={true}
          placeholder="Enter Password"
          onChangeText={(val) => handleChangeText("password", val)}
        />
      </View>
      <TouchableOpacity
        style={styles.sign_up_button}
        onPress={handleSignUp}
        underlayColor="#0084FF"
      >
        <Text style={styles.button_text}>SIGN UP</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#FFFFFF",
  },
  main_header: {
    marginBottom: 30,
  },
  header_text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
  form_group: {
    marginBottom: 20,
  },
  input_lable: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 5,
  },
  input_text: {
    height: 40,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  sign_up_button: {
    marginTop: 20,
    backgroundColor: "#0D47A1",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
  },
  button_text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
