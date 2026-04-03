import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import { deleteStudent, getStudentById } from "../../backend/calls";
import { styles } from "./studentInfo.styles";

export default function StudentInfoScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [studentInfo, setStudentInfo] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Custom Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const loadStudent = async () => {
    try {
      const data = await getStudentById(Number(id));
      setStudentInfo(data);
    } catch (error: any) {
      console.error("Error loading student:", error);
    } finally {
      setLoading(false);
    }
  };

  // REFRESH TRIGGER: Runs when you land on this page or navigate back to it
  useFocusEffect(
    useCallback(() => {
      loadStudent();
    }, [id]),
  );

  const confirmDelete = async () => {
    try {
      // 1. Hide modal first for smooth UI
      setShowDeleteModal(false);
      setLoading(true);

      // 2. Call backend
      await deleteStudent(Number(id));

      // 3. Navigate back to directory
      router.push("/(tabs)");
    } catch (error: any) {
      setLoading(false);
      console.error("Delete Error:", error.message);
      Alert.alert("Error", "Could not delete student. Please try again.");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4a90e2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* CUSTOM DELETE MODAL */}
      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete Student?</Text>
            <Text style={styles.modalText}>
              Are you sure you want to delete {studentInfo?.full_name}? This
              will permanently erase all class history.
            </Text>

            {/* FIXED: Changed <div> to <View> */}
            <View style={styles.modalButtonRow}>
              <Pressable
                style={[styles.modalButton, styles.stayButton]}
                onPress={() => setShowDeleteModal(false)}
              >
                <Text style={styles.stayButtonText}>Cancel</Text>
              </Pressable>

              <Pressable
                style={[styles.modalButton, styles.discardButton]}
                onPress={confirmDelete}
              >
                <Text style={styles.discardButtonText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* HEADER SECTION */}
      <View style={styles.headerRow}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.push("/(tabs)")}
        >
          <Text style={styles.backButtonText}>←</Text>
        </Pressable>
        <Text style={styles.studentName}>
          {studentInfo?.full_name || "No Name"}
        </Text>
      </View>

      {/* CLASS LIST SECTION */}
      <View style={styles.centerView}>
        <FlatList
          data={studentInfo?.Classes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/classInfo",
                  params: {
                    classId: item.id,
                    studentId: id,
                    studentName: studentInfo?.full_name,
                  },
                })
              }
              style={({ pressed }) => [
                styles.classCard,
                { opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <Text style={styles.instructorName}>
                Instructor: {item.instructor_name}
              </Text>
              <Text style={styles.commentText}>{item.comments}</Text>
              <Text style={styles.dateText}>
                {item.created_at
                  ? new Date(item.created_at).toLocaleDateString()
                  : "No Date"}
              </Text>
            </Pressable>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No classes attended yet.</Text>
          }
        />
      </View>

      {/* FOOTER BUTTONS */}
      <View style={styles.bottomContainer}>
        <Pressable
          onPress={() =>
            router.push({ pathname: "/createclass", params: { id: id } })
          }
          style={styles.createClassButton}
        >
          <Text style={styles.createClassButtonText}>Create Class</Text>
        </Pressable>

        <Pressable
          onPress={() => setShowDeleteModal(true)}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteButtonText}>Delete Student</Text>
        </Pressable>
      </View>
    </View>
  );
}
