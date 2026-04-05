import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  deleteClassById,
  getClassById,
  updateClassById,
} from "../../backend/calls";
import { styles } from "../../styles/tabsStyles/studentInfo.styles";

export default function ClassInfoScreen() {
  const router = useRouter();
  const { classId, studentName, studentId } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);
  const [instructor, setInstructor] = useState("");
  const [comments, setComments] = useState("");
  const [initialData, setInitialData] = useState<any>(null);

  // Custom Modal States
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // New Success State

  const isDirty =
    initialData &&
    (instructor !== initialData.instructor_name ||
      comments !== initialData.comments);

  useEffect(() => {
    if (classId) {
      loadClassData();
    }
  }, [classId]);

  const loadClassData = async () => {
    try {
      const data = await getClassById(Number(classId));
      setInitialData(data);
      setInstructor(data.instructor_name || "");
      setComments(data.comments || "");
    } catch (error) {
      console.error("Error loading class:", error);
    } finally {
      setLoading(false);
    }
  };

  const navigateBack = () => {
    router.push({
      pathname: "/studentInfo",
      params: { id: studentId },
    });
  };

  const handleBackPress = () => {
    if (isDirty) {
      setShowDiscardModal(true);
    } else {
      navigateBack();
    }
  };

  const handleDiscardChanges = () => {
    setInstructor(initialData.instructor_name || "");
    setComments(initialData.comments || "");
    setShowDiscardModal(false);
    navigateBack();
  };

  const handleSave = async () => {
    try {
      await updateClassById(Number(classId), instructor, comments);
      setInitialData({
        ...initialData,
        instructor_name: instructor,
        comments: comments,
      });
      // Trigger the custom success modal instead of Alert
      setShowSuccessModal(true);
    } catch (error: any) {
      console.error("Save Error:", error.message);
    }
  };

  const confirmDeleteClass = async () => {
    try {
      setShowDeleteModal(false);
      setLoading(true);
      await deleteClassById(Number(classId));
      navigateBack();
    } catch (error: any) {
      setLoading(false);
      console.error("Delete Error:", error.message);
    }
  };

  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4a90e2" />
      </View>
    );

  return (
    <View style={styles.container}>
      {/* CUSTOM DISCARD MODAL */}
      <Modal visible={showDiscardModal} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Unsaved Changes</Text>
            <Text style={styles.modalText}>
              You have modified this class session. Are you sure you want to
              discard these changes?
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
                onPress={handleDiscardChanges}
              >
                <Text style={styles.discardButtonText}>Discard</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* CUSTOM DELETE MODAL */}
      <Modal visible={showDeleteModal} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete Class Session?</Text>
            <Text style={styles.modalText}>
              Are you sure you want to delete this session forever? This action
              cannot be undone.
            </Text>
            <View style={styles.modalButtonRow}>
              <Pressable
                style={[styles.modalButton, styles.stayButton]}
                onPress={() => setShowDeleteModal(false)}
              >
                <Text style={styles.stayButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.discardButton]}
                onPress={confirmDeleteClass}
              >
                <Text style={styles.discardButtonText}>Delete</Text>
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
              The class session has been successfully updated.
            </Text>
            <View style={styles.modalButtonRow}>
              <Pressable
                style={[
                  styles.modalButton,
                  { backgroundColor: "#4a90e2", width: "100%" },
                ]}
                onPress={() => setShowSuccessModal(false)}
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
        <Text style={styles.studentName}>{studentName || "Class Details"}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Edit Session</Text>

        <Text style={styles.fieldLabel}>Instructor</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            position: "relative",
          }}
        >
          <TextInput
            style={[styles.input, { flex: 1, paddingRight: 40 }]}
            value={instructor}
            onChangeText={setInstructor}
            placeholder="Instructor Name"
          />
          <MaterialCommunityIcons
            name="pencil"
            size={20}
            color="#ffffff"
            style={{ position: "absolute", right: 10 }}
          />
        </View>

        <Text style={styles.fieldLabel}>Notes</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            position: "relative",
          }}
        >
          <TextInput
            style={[
              styles.input,
              {
                height: 100,
                textAlignVertical: "top",
                flex: 1,
                paddingRight: 40,
              },
            ]}
            value={comments}
            onChangeText={setComments}
            multiline
            placeholder="Notes..."
          />
          <MaterialCommunityIcons
            name="pencil"
            size={20}
            color="#ffffff"
            style={{ position: "absolute", right: 10, top: 14 }}
          />
        </View>

        {isDirty && (
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </Pressable>
        )}

        <Pressable
          style={styles.deleteButton}
          onPress={() => setShowDeleteModal(true)}
        >
          <Text style={styles.deleteButtonText}>Delete Class Session</Text>
        </Pressable>
      </View>
    </View>
  );
}
