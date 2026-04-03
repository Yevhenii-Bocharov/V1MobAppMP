import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { styles } from "../../styles/authStyles/welcome.styles";

export default function Welcome() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>
        Your journey starts here. Sign in or create an account.
      </Text>
      <Pressable style={styles.button} onPress={() => router.push("/login")}>
        <Text style={styles.buttonText}>Log In</Text>
      </Pressable>
      {/* <Pressable
        style={styles.secondaryButton}
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.secondaryButtonText}>Create Account</Text>
      </Pressable> */}
    </View>
  );
}
