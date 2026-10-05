import { Tabs, type BottomTabBarButtonProps } from "expo-router/js-tabs";
import { useRouter } from "expo-router";
import { Home, Plus, User } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/constants/theme";

function CreateTabButton(buttonProps: BottomTabBarButtonProps) {
  const router = useRouter();
  return (
    <Pressable
      {...buttonProps}
      style={[buttonProps.style, styles.createTabButton]}
      onPress={() => router.push("/create")}
    >
      <View style={styles.createBtn}>
        <Plus size={22} color="#fff" strokeWidth={2.5} />
      </View>
    </Pressable>
  );
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
          { height: 84 + insets.bottom, paddingBottom: insets.bottom },
        ],
        tabBarActiveTintColor: colors.foreground,
        tabBarInactiveTintColor: colors.muted,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Feed",
          tabBarIcon: ({ color, focused }) => (
            <Home size={22} color={color} strokeWidth={focused ? 2.5 : 1.8} />
          ),
        }}
      />
      <Tabs.Screen
        name="create-tab"
        options={{
          title: "",
          tabBarButton: (props) => <CreateTabButton {...props} />,
        }}
        listeners={{
          tabPress: (e) => e.preventDefault(),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <User size={22} color={color} strokeWidth={focused ? 2.5 : 1.8} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "rgba(9,9,11,0.92)",
    borderTopColor: colors.border,
    paddingTop: 8,
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: "600",
  },
  createTabButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  createBtn: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.left,
    marginTop: -8,
    shadowColor: colors.left,
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
});
