import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
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

  useEffect(() => {
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
    loadStudent();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteStudent(Number(id));
      router.back();
    } catch (error: any) {
      console.error("Error deleting student:", error.message);
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
      {/* Fixed missing 'View' tag here */}
      <View style={styles.headerRow}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>←</Text>
        </Pressable>
        <Text style={styles.studentName}>
          {studentInfo?.full_name || "No Name Found"}
        </Text>
      </View>
      <View style={styles.centerView}>
        <FlatList
          data={studentInfo?.Classes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            /* 1. Wrap the View in a Pressable */
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/classInfo", // Or whatever your detail screen is named
                  params: { classId: item.id, studentId: id }, // Pass IDs to the next screen
                })
              }
              /* 2. Add visual feedback so the user knows they clicked it */
              style={({ pressed }) => [
                styles.classCard,
                { opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <Text style={styles.instructorName}>
                Instructor: {item.instrustors_name}
              </Text>
              <Text style={styles.commentText}>{item.comments}</Text>
              <Text style={styles.dateText}>
                {new Date(item.created_at).toLocaleDateString()}
              </Text>
            </Pressable>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No classes attended yet.</Text>
          }
        />
      </View>
      {/* Simplified bottom container to avoid duplicates */}
      <View style={styles.bottomContainer}>
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/createclass",
              params: { id: studentInfo?.id },
            })
          }
          style={styles.createClassButton}
        >
          <Text style={styles.createClassButtonText}>Create Class</Text>
        </Pressable>

        <Pressable onPress={handleDelete} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete Student</Text>
        </Pressable>
      </View>
    </View>
  );
}
