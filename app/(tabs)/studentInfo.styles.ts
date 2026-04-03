import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Main Container
  container: {
    flex: 1,
    backgroundColor: "#0b122d",
    padding: 20,
    paddingTop: 50,
  },
  input: { color: "#f3f8ff", fontSize: 16, paddingVertical: 8 },

  // Header Section
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  backButtonText: {
    fontSize: 22,
    color: "#cccccc",
    fontWeight: "700",
    lineHeight: 22,
  },
  studentName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
    marginLeft: 12,
    flex: 1,
    flexWrap: "wrap",
  },

  // Info Card
  card: {
    width: "100%",
    backgroundColor: "#111a3a",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 20,
  },

  // Input & Field Styles
  fieldLabel: {
    color: "#a8b8d6",
    fontSize: 14,
    marginBottom: 6,
    fontWeight: "600",
  },
  fieldValue: {
    color: "#e5ebff",
    fontSize: 16,
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.2)",
    paddingBottom: 4,
    marginBottom: 10,
  },
  textInput: {
    color: "#f3f8ff",
    fontSize: 16,
    paddingVertical: 8,
  },

  // Buttons
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  saveButton: {
    backgroundColor: "#4caf50", // Success Green
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  createClassButton: {
    backgroundColor: "#0f56d1",
    paddingVertical: 14,
    marginTop: 20,
    paddingHorizontal: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#0b3ec0",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  createClassButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 14,
    marginTop: 14,
    paddingHorizontal: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#c5372b",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  deleteButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  // FlatList & Item Styles
  classCard: {
    width: "100%",
    backgroundColor: "#162248",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
  },
  instructorName: {
    color: "#dce2f5",
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "700",
  },
  commentText: {
    color: "#b6c2e1",
    fontSize: 14,
    marginBottom: 4,
  },
  dateText: {
    color: "#8fa6d1",
    fontSize: 12,
  },
  emptyText: {
    color: "#a9b8d6",
    fontSize: 15,
    textAlign: "center",
    marginTop: 20,
  },

  // Layout Helpers
  bottomContainer: {
    width: "100%",
    paddingBottom: 30,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  centerView: {
    flex: 1,
    width: "100%",
  },

  //   MODAL
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#1a1a1a",
  },
  modalText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtonRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  stayButton: {
    backgroundColor: "#f0f0f0",
  },
  stayButtonText: {
    color: "#333",
    fontWeight: "600",
  },
  discardButton: {
    backgroundColor: "#ff5252",
  },
  discardButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
