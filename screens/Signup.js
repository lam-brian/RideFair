import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  View,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  Pressable,
} from "react-native";
import styles from "./Signup.styles";

const Signup = ({ navigation }) => {
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const buttonIsDisabled = !enteredFirstName || !enteredLastName;

  const handleSignup = () => {};

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <View style={styles.textInputs}>
          <TextInput
            style={styles.input}
            placeholder="First name"
            value={enteredFirstName}
            onChangeText={(text) => setEnteredFirstName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Last name"
            value={enteredLastName}
            onChangeText={(text) => setEnteredLastName(text)}
          />
        </View>
        <Text style={styles.agreement}>
          By selecting Agree and continue, I agree to RideFair's{" "}
          <Text style={styles.link}>
            Terms of Service, Payments Terms of Service{" "}
          </Text>
          and <Text style={styles.link}>Notification Policy </Text>
          and acknowledge the <Text style={styles.link}>Privacy Policy</Text>.
        </Text>
        <Pressable
          onPress={handleSignup}
          style={
            buttonIsDisabled
              ? { ...styles.button, ...styles.buttonDisabled }
              : styles.button
          }
          disabled={!enteredFirstName && !enteredLastName}
        >
          <Text
            style={
              buttonIsDisabled
                ? { ...styles.buttonText, ...styles.buttonTextDisabled }
                : styles.buttonText
            }
          >
            Agree and continue
          </Text>
        </Pressable>
        <StatusBar style="auto" />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
  i;
};

export default Signup;
