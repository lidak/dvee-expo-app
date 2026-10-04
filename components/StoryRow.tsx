import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Image } from "expo-image";
import { Plus } from "lucide-react-native";
import { POSTS } from "@/data/mockPosts";
import { colors } from "@/constants/theme";

export function StoryRow() {
  const stories = [
    { name: "You", avatar: null },
    { name: "marta.v", avatar: POSTS[0].user.avatar },
    { name: "kyiv.days", avatar: POSTS[1].user.avatar },
    { name: "olena", avatar: POSTS[2]?.user.avatar },
    {
      name: "dima.f",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=56&h=56&fit=crop",
    },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {stories.map((story, index) => (
        <View key={story.name} style={styles.story}>
          <View
            style={[
              styles.ring,
              index === 0 ? styles.ringYou : styles.ringActive,
            ]}
          >
            {index === 0 ? (
              <View style={styles.youAvatar}>
                <Plus size={18} color={colors.mutedForeground} />
              </View>
            ) : (
              <Image source={{ uri: story.avatar! }} style={styles.avatar} />
            )}
          </View>
          <Text style={styles.name}>{story.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  story: {
    alignItems: "center",
    gap: 4,
  },
  ring: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  ringYou: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "rgba(255,255,255,0.25)",
  },
  ringActive: {
    borderWidth: 2,
    borderColor: colors.left,
  },
  youAvatar: {
    width: "100%",
    height: "100%",
    backgroundColor: "#27272a",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  name: {
    color: colors.mutedForeground,
    fontSize: 10,
  },
});
