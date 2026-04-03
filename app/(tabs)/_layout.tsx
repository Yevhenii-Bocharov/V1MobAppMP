import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";

import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tabIconDefault,
        tabBarStyle: {
          backgroundColor:
            (Colors[colorScheme ?? "light"] as any).tabBarBackground ||
            Colors[colorScheme ?? "light"].background,
          borderTopColor: Colors[colorScheme ?? "light"].tabIconDefault,
          borderTopWidth: 1,
        },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          headerShown: false,
          title: "Settings",
          tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
        }}
      />
      <Tabs.Screen
        name="createstudent"
        options={{
          href: null, // <--- THIS hides it from the bottom bar
          headerShown: false, // <--- THIS hides the top header
        }}
      />
      <Tabs.Screen
        name="studentInfo"
        options={{
          href: null, // <--- THIS hides it from the bottom bar
          headerShown: false, // <--- THIS hides the top header
        }}
      />
      <Tabs.Screen
        name="createclass"
        options={{
          href: null, // <--- THIS hides it from the bottom bar
          headerShown: false, // <--- THIS hides the top header
        }}
      />
      <Tabs.Screen
        name="classInfo"
        options={{
          href: null, // <--- THIS hides it from the bottom bar
          headerShown: false, // <--- THIS hides the top header
        }}
      />
    </Tabs>
  );
}
