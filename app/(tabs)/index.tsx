import { useState } from "react";
import { FlatList, StyleSheet, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Heart, MessageCircle } from "lucide-react-native";
import { DveePost } from "@/components/DveePost";
import { ShareSheet } from "@/components/ShareSheet";
import { StoryRow } from "@/components/StoryRow";
import { POSTS } from "@/data/mockPosts";
import { colors } from "@/constants/theme";
import { Post, PostSide } from "@/types/post";

export default function FeedScreen() {
  const [shareState, setShareState] = useState<{ post: Post; side: PostSide } | null>(null);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.logo}>dvee</Text>
        <View style={styles.headerActions}>
          <Heart size={21} color={colors.mutedForeground} />
          <View>
            <MessageCircle size={21} color={colors.mutedForeground} />
            <View style={styles.badge} />
          </View>
        </View>
      </View>

      <FlatList
        data={POSTS}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <StoryRow />
            <View style={styles.listDivider} />
          </>
        }
        renderItem={({ item }) => (
          <DveePost post={item} onShare={(post, side) => setShareState({ post, side })} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />

      {shareState ? (
        <ShareSheet
          post={shareState.post}
          defaultSide={shareState.side}
          visible
          onClose={() => setShareState(null)}
        />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  logo: {
    fontSize: 28,
    fontWeight: "900",
    color: colors.left,
    letterSpacing: -0.5,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.left,
  },
  list: {
    paddingBottom: 24,
  },
  listDivider: {
    height: 1,
    backgroundColor: colors.border,
  },
});
