import { useRouter } from "expo-router";
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
import { supabase } from "../../backend/supabase";
import { styles } from "./createclass.styles";

export default function AddStudentScreen() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Custom Modal States
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const isDirty = name.trim().length > 0;

  const handleBackPress = () => {
    if (isDirty) {
      setShowDiscardModal(true);
    } else {
      router.push("/(tabs)");
    }
  };

  const handleCreate = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter a name");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from("Students")
        .insert([{ full_name: name }]);

      if (error) throw error;

      // Clear field and show custom success modal
      setName("");
      setShowSuccessModal(true);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    router.push("/(tabs)");
  };

  return (
    <View style={styles.container}>
      {/* CUSTOM DISCARD MODAL */}
      <Modal visible={showDiscardModal} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Discard Entry?</Text>
            <Text style={styles.modalText}>
              You have started entering a student's name. Are you sure you want
              to go back?
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
                  router.push("/(tabs)");
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
            <Text style={styles.modalTitle}>Success!</Text>
            <Text style={styles.modalText}>
              The student has been added to the directory.
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
        <Text style={styles.toptitle}>New Student</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Add Student</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#8d9cc5"
          value={name}
          onChangeText={setName}
          autoFocus
        />
        <Pressable
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleCreate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Create Student</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}
