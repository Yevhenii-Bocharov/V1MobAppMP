import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { supabase } from "../../backend/supabase";
import { styles } from "./two.styles";

export default function TabTwoScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      // The layout listener will usually handle this,
      // but we can force it just to be sure.
      router.replace("/(auth)/login");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.separator} />

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>
    </View>
  );
}
