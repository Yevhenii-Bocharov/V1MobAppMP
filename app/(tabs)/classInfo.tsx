import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { getClassById } from "../../backend/calls";
import { styles } from "./studentInfo.styles"; 

export default function ClassInfoScreen() {
  // 1. MUST match the key you sent in router.push
  const { classId } = useLocalSearchParams(); 
  
  const [classInfo, setClassInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClassData = async () => {
      // 2. Check if classId exists before trying to convert it
      if (!classId) {
        console.error("No classId found in params");
        setLoading(false);
        return;
      }

      try {
        const data = await getClassById(Number(classId));
        setClassInfo(data);
      } catch (error) {
        console.error("Error loading class:", error);
      } finally {
        setLoading(false);
      }
    };

    loadClassData();
  }, [classId]);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} />;
  }

  // 3. Optional chaining (?.) prevents "Cannot read property of null"
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Class Details</Text>
        
        {/* Use the exact names from your screenshot! */}
        <Text>Instructor: {classInfo?.instructor_name}</Text>
        <Text>Date: {classInfo?.date ? new Date(classInfo.date).toLocaleDateString() : 'N/A'}</Text>
        <Text style={{ marginTop: 10 }}>Notes: {classInfo?.comments}</Text>
      </View>
    </View>
  );
}