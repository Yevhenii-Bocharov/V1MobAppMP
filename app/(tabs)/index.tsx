import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { getStudents } from "../../backend/calls";
import { supabase } from "../../backend/supabase";
import { styles } from "./index.styles";

export default function TabOneScreen() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Filter students based on search query
  const filteredStudents = students.filter((student) =>
    student.full_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // 1. Standard data fetcher
  const loadStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data || []);
    } catch (error: any) {
      console.error("Error loading students:", error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // 2. Refresh the list every time the user navigates back to this screen
  useFocusEffect(
    useCallback(() => {
      loadStudents();
    }, []),
  );

  // 3. Realtime Subscription (Needs "Replication" enabled in Supabase Dashboard)
  useEffect(() => {
    const subscription = supabase
      .channel("directory-sync")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Students" },
        (payload) => {
          console.log("Realtime Change detected:", payload);
          loadStudents(); // Re-fetch data on any DB change
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadStudents();
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
      {/* HEADER SECTION */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Directory</Text>
        <Pressable
          style={styles.addButton}
          onPress={() => router.push("/createstudent")}
        >
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>

      {/* SEARCH BAR SECTION */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search students..."
        placeholderTextColor="#8fa6d1"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* LIST SECTION */}
      <FlatList
        data={filteredStudents}
        keyExtractor={(item) => item.id.toString()}
        onRefresh={onRefresh}
        refreshing={refreshing}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <Pressable
            style={styles.studentCard}
            onPress={() =>
              router.push({
                pathname: "/studentInfo",
                params: { id: item.id },
              })
            }
          >
            <View style={{ flex: 1, backgroundColor: "transparent" }}>
              <Text style={styles.studentName}>{item.full_name}</Text>
              <Text style={styles.studentSubtitle}>Tap to see classes →</Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View
            style={{
              backgroundColor: "transparent",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <Text style={{ color: "#a0aec0" }}>
              {searchQuery
                ? "No students found matching your search."
                : "No students found. Add your first student!"}
            </Text>
          </View>
        }
      />
    </View>
  );
}
