import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  textInputs: {
    gap: 24,
    width: "90%",
    marginTop: 64,
    marginBottom: "auto",
  },
  input: {
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 8,
    padding: 16,
    color: "#717171",
  },
  agreement: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    marginBottom: 16,
    fontSize: 13,
    lineHeight: 19.5,
  },
  link: {
    color: "#1976D2",
  },
  button: {
    width: "90%",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: "#1976D2",
  },
  buttonDisabled: {
    backgroundColor: "#E2EFF5",
  },
  buttonText: {
    textAlign: "center",
    color: "#E2EFF5",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonTextDisabled: {
    color: "#71C4F4",
  },
});

export default styles;
