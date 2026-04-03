import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Shows a back button and title
        // headerTitle: "", // Keeps it clean by hiding the text title
        headerShadowVisible: true, // Makes the top bar look seamless
      }}
    >
      {/* The Welcome screen (no back button needed here) */}
      <Stack.Screen name="index" options={{ headerShown: false }} />

      {/* Login and Signup will show a back button automatically */}
      <Stack.Screen name="login" options={{ title: "Log In" }} />
      <Stack.Screen name="signup" options={{ title: "Create Account" }} />
    </Stack>
  );
}
