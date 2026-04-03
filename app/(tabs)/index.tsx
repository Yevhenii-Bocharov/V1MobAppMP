import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable } from "react-native";
import { getStudents } from "../../backend/calls";
import { supabase } from "../../backend/supabase"; // FIX: Added import
import { styles } from "./index.styles";

export default function TabOneScreen() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

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

  const onRefresh = () => {
    setRefreshing(true);
    loadStudents();
  };

  useEffect(() => {
    loadStudents();

    // REAL-TIME SUBSCRIPTION
    const subscription = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Students" }, // Ensure table name matches dashboard
        (payload) => {
          console.log("Change received!", payload);
          loadStudents();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4a90e2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER SECTION using your styles.headerRow */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>Directory</Text>
        <Pressable
          style={styles.addButton}
          onPress={() => router.push("/createstudent")}
        >
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>

      {/* LIST SECTION */}
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        onRefresh={onRefresh} // Pull-to-refresh
        refreshing={refreshing} // Loading state for pull-to-refresh
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
            <Text style={styles.studentName}>{item.full_name}</Text>
            <Text style={styles.studentSubtitle}>Tap to see classes →</Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text
            style={{ textAlign: "center", color: "#a0aec0", marginTop: 40 }}
          >
            No students found. Add some in Supabase!
          </Text>
        }
      />
    </View>
  );
}
