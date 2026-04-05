import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function CustomHeader({ title = "HIPL" }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>School</Text>
        <Text style={styles.headerText2}>App</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#131314", // Matches your blue theme
  },
  headerContainer: {
    // height: 60,
    backgroundColor: "#131314",
    display: "flex",
    flexDirection: "row",
    // alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#3e3e3e",
  },
  headerText: {
    marginLeft: 20,
    marginTop: 40,
    marginBottom: 10,
    color: "#aeaeae",
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: 2, // Gives it that "tuff" premium look
  },
    headerText2: {
    marginLeft: 5,
    marginTop: 40,
    marginBottom: 10,
    color: "#614ae2",
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: 2, // Gives it that "tuff" premium look
  },
});
