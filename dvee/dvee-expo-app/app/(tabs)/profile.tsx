import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { POSTS } from "@/data/mockPosts";
import { colors } from "@/constants/theme";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.topRow}>
            <Image source={{ uri: POSTS[0].user.avatar }} style={styles.avatar} />
            <View style={styles.statsWrap}>
              <Text style={styles.name}>Marta V.</Text>
              <Text style={styles.handle}>@marta.v</Text>
              <View style={styles.stats}>
                <Stat value="24" label="Dvees" />
                <Stat value="1.2k" label="Followers" />
                <Stat value="381" label="Following" />
              </View>
            </View>
          </View>
          <Pressable style={styles.editBtn}>
            <Text style={styles.editText}>Edit Profile</Text>
          </Pressable>
        </View>

        <View style={styles.grid}>
          {POSTS.flatMap((post) =>
            [post.left, post.right].map((side, index) => (
              <View key={`${post.id}-${index}`} style={styles.gridItem}>
                <Image source={{ uri: side.url }} style={styles.gridImage} contentFit="cover" />
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  topRow: {
    flexDirection: "row",
    gap: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "rgba(79,158,255,0.4)",
  },
  statsWrap: {
    flex: 1,
    paddingTop: 4,
  },
  name: {
    color: colors.foreground,
    fontSize: 18,
    fontWeight: "700",
  },
  handle: {
    color: colors.mutedForeground,
    fontSize: 14,
    marginTop: 2,
  },
  stats: {
    flexDirection: "row",
    gap: 20,
    marginTop: 10,
  },
  statValue: {
    color: colors.foreground,
    fontSize: 14,
    fontWeight: "700",
  },
  statLabel: {
    color: colors.mutedForeground,
    fontSize: 10,
  },
  editBtn: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: "center",
  },
  editText: {
    color: colors.foreground,
    fontSize: 14,
    fontWeight: "600",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  gridItem: {
    width: "33.1%",
    aspectRatio: 1,
    backgroundColor: "#18181b",
  },
  gridImage: {
    width: "100%",
    height: "100%",
  },
});
