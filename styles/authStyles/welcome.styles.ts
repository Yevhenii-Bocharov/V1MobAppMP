import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b122d",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#c3cddb",
    textAlign: "center",
    maxWidth: 280,
    marginBottom: 30,
  },
  button: {
    marginTop: 12,
    height: 54,
    width: 280,
    backgroundColor: "#5c6df1",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#ffffff",
  },
  secondaryButton: {
    marginTop: 8,
    height: 54,
    width: 280,
    backgroundColor: "#17233f",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#5c6df1",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#5c6df1",
  },
});
