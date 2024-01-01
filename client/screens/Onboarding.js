import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";

const Onboarding = ({ navigation }) => {
  return (
    <View>
      <Text>Hello from Onboarding</Text>
      <StatusBar style="auto" />
    </View>
  );
};

export default Onboarding;
