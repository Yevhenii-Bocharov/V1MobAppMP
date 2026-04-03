import { useLocalSearchParams, useRouter } from "expo-router"; // Added useLocalSearchParams
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { addClassNote } from "../../backend/calls"; // Import your helper function
import { styles } from "../../styles/authStyles/login.styles";

export default function AddClassScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Get the student ID from the URL/Navigation

  // 1. Updated states for Class information
  const [instructor, setInstructor] = useState("");
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateClass = async () => {
    // Validation
    if (!instructor.trim() || !comments.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      // 2. Use your call function with the passed student ID
      await addClassNote(Number(id), instructor, comments);

      // 3. Clear fields on success
      setInstructor("");
      setComments("");

      Alert.alert("Success", "Class session recorded!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to save class");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Record Class Session</Text>

        <TextInput
          style={styles.input}
          placeholder="Instructor Name"
          value={instructor}
          onChangeText={setInstructor}
          autoFocus
        />

        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: "top" }]} // Added height for notes
          placeholder="Comments / Progress Notes"
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
            <Text style={styles.buttonText}>Save Session</Text>
          )}
        </Pressable>

        <Pressable onPress={() => router.back()} style={{ marginTop: 15 }}>
          <Text style={{ color: "#666", textAlign: "center" }}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
}
