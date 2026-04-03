import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { supabase } from "../../backend/supabase";
import { styles } from "../../styles/authStyles/login.styles"; // Reusing your nice input styles

export default function AddStudentScreen() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter a name");
      return;
    }

    setLoading(true);
    const { error } = await supabase
      .from("Students")
      .insert([{ full_name: name }]);

    setLoading(false);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      // THIS IS THE KEY:
      // We only clear it here, AFTER the database confirmed it's saved.
      setName("");

      Alert.alert("Success", "Student added!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>New Student</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
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

        <Pressable
          onPress={() => {
            router.back();
          }}
          style={{ marginTop: 15 }}
        >
          <Text style={{ color: "#666", textAlign: "center" }}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
}
