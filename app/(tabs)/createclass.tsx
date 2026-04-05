import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { addClassNote } from "../../backend/calls";
import { styles } from "../../styles/tabsStyles/createclass.styles";

export default function AddClassScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [instructor, setInstructor] = useState("");
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);

  // Custom Modal States
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Check if user has typed anything
  const isDirty = instructor.trim().length > 0 || comments.trim().length > 0;

  const handleBackPress = () => {
    if (isDirty) {
      setShowDiscardModal(true);
    } else {
      router.push({ pathname: "/studentInfo", params: { id: id } });
    }
  };

  const handleCreateClass = async () => {
    if (!instructor.trim() || !comments.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await addClassNote(Number(id), instructor, comments);

      // Clear fields and show custom success modal
      setInstructor("");
      setComments("");
      setShowSuccessModal(true);
    } catch (error: any) {
      console.error("Supabase Insert Error:", error);
      Alert.alert("Error", error.message || "Failed to save class");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    router.push({
      pathname: "/studentInfo",
      params: { id: id },
    });
  };

  return (
    <View style={styles.container}>
      {/* CUSTOM DISCARD MODAL */}
      <Modal visible={showDiscardModal} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Discard Changes?</Text>
            <Text style={styles.modalText}>
              You have started entering class details. Are you sure you want to
              go back?
            </Text>
            <View style={styles.modalButtonRow}>
              <Pressable
                style={[styles.modalButton, styles.stayButton]}
                onPress={() => setShowDiscardModal(false)}
              >
                <Text style={styles.stayButtonText}>Stay</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.discardButton]}
                onPress={() => {
                  setShowDiscardModal(false);
                  router.push({ pathname: "/studentInfo", params: { id: id } });
                }}
              >
                <Text style={styles.discardButtonText}>Discard</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* CUSTOM SUCCESS MODAL */}
      <Modal visible={showSuccessModal} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Class Recorded!</Text>
            <Text style={styles.modalText}>
              The new session has been added to the student's history.
            </Text>
            <View style={styles.modalButtonRow}>
              <Pressable
                style={[
                  styles.modalButton,
                  { backgroundColor: "#4a90e2", width: "100%" },
                ]}
                onPress={handleSuccessClose}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>Great</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.headerRow}>
        <Pressable style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>←</Text>
        </Pressable>
        <Text style={styles.toptitle}>New Class</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Record Class Session</Text>

        <TextInput
          style={styles.input}
          placeholder="Instructor Name"
          placeholderTextColor="#8d9cc5"
          value={instructor}
          onChangeText={setInstructor}
        />

        <TextInput
          style={[
            styles.input,
            { height: 120, textAlignVertical: "top", paddingTop: 12 },
          ]}
          placeholder="Comments / Progress Notes"
          placeholderTextColor="#8d9cc5"
          value={comments}
          onChangeText={setComments}
          multiline
        />

        <Pressable
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleCreateClass}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Create Class</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}
