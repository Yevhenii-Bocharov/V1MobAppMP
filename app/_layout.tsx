import { Session } from "@supabase/supabase-js";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "../backend/supabase";

export default function RootLayoutNav() {
  const [session, setSession] = useState<Session | null>(null);
  const [isReady, setIsReady] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // 1. Check if there is a session already saved in AsyncStorage
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsReady(true);
    });

    // 2. Listen for any auth changes (Login, Logout, or Token Refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!isReady) return;

    // Check if the user is currently in the "(auth)" folder
    const inAuthGroup = segments[0] === "(auth)";

    if (!session && !inAuthGroup) {
      // If NOT logged in and NOT in auth screens -> redirect to Login
      router.replace("/(auth)/login");
    } else if (session && inAuthGroup) {
      // If IS logged in and trying to access Login screen -> redirect to Tabs
      router.replace("/(tabs)");
    }
  }, [session, isReady, segments]);

  if (!isReady) return null; // Keep splash screen visible until we know the auth state

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
