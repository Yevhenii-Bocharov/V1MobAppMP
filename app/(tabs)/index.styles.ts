import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b122d",
    paddingTop: 50, // Increased for status bar clearance
    paddingHorizontal: 20, // Better for list alignment
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
  },
  addButton: {
    backgroundColor: "#4a90e2", // A nice blue that pops on dark backgrounds
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  addButtonText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: -2, // Optical alignment for the "+"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    backgroundColor: "#2f466f",
    alignSelf: "center",
  },
  studentCard: {
    backgroundColor: "#1a2332",
    borderRadius: 12,
    padding: 20,
    marginVertical: 8,
    width: "100%", // Let it fill the container padding
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#2f466f", // Subtle border for depth
  },
  studentName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 5,
  },
  studentSubtitle: {
    fontSize: 14,
    color: "#a0aec0",
  },
  searchBar: {
    backgroundColor: "#1a2332",
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 16,
    height: 48,
    borderWidth: 1,
    borderColor: "#2f466f",
    color: "#f3f8ff",
    fontSize: 16,
  },
});
