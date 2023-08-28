import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ClientHome from './screens/ClientHome';
import AllBookingsList from './screens/AllBookingsList';
import LoginPage from './screens/LoginPage';
import SignInPage from './screens/SignInpage';
import Seat from './screens/SeatBooking';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <View style={styles.container}>


      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={LoginPage} />
          <Stack.Screen name="ClientHome" component={ClientHome} />
          <Stack.Screen name="AllBookingsList" component={AllBookingsList} />
          <Stack.Screen name="Sign Up" component={SignInPage} />
          <Stack.Screen name="seat" component={Seat} />
        </Stack.Navigator>
      </NavigationContainer>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'

  },
});
