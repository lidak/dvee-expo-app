import { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
  LayoutChangeEvent,
} from "react-native";
import { Image } from "expo-image";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share2,
} from "lucide-react-native";
import { colors } from "@/constants/theme";
import { Post, PostSide } from "@/types/post";

interface DveePostProps {
  post: Post;
  onShare: (post: Post, side: PostSide) => void;
}

export function DveePost({ post, onShare }: DveePostProps) {
  const [dividerPct, setDividerPct] = useState(50);
  const [containerWidth, setContainerWidth] = useState(0);
  const [likedLeft, setLikedLeft] = useState(false);
  const [likedRight, setLikedRight] = useState(false);

  const divider = useSharedValue(50);
  const startDivider = useSharedValue(50);

  const activeSide: PostSide = dividerPct >= 50 ? "left" : "right";
  const activeData = activeSide === "left" ? post.left : post.right;

  const updateDivider = useCallback((pct: number) => {
    const clamped = Math.max(6, Math.min(94, pct));
    setDividerPct(clamped);
  }, []);

  const onLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  const pan = Gesture.Pan()
    .onBegin(() => {
      startDivider.value = divider.value;
    })
    .onUpdate((event) => {
      if (containerWidth <= 0) return;
      const next = startDivider.value + (event.translationX / containerWidth) * 100;
      const clamped = Math.max(6, Math.min(94, next));
      divider.value = clamped;
      runOnJS(updateDivider)(clamped);
    });

  const dividerStyle = useAnimatedStyle(() => ({
    left: `${divider.value}%`,
  }));

  const leftCaptionOpacity = dividerPct >= 50 ? 1 : 0.35;
  const rightCaptionOpacity = dividerPct < 50 ? 1 : 0.35;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
        <View style={styles.headerText}>
          <View style={styles.nameRow}>
            <Text style={styles.name} numberOfLines={1}>
              {post.user.name}
            </Text>
            {post.ad ? (
              <View style={styles.sponsoredBadge}>
                <Text style={styles.sponsoredText}>Sponsored</Text>
              </View>
            ) : null}
          </View>
          <Text style={styles.handle}>
            @{post.user.handle} · {post.timestamp}
          </Text>
        </View>
        <MoreHorizontal size={16} color={colors.mutedForeground} />
      </View>

      <GestureDetector gesture={pan}>
        <View style={styles.splitContainer} onLayout={onLayout}>
          <View style={[styles.sideClip, { width: `${dividerPct}%` }]}>
            <Image
              source={{ uri: post.left.url }}
              style={[styles.fullImage, { width: containerWidth || "100%" }]}
              contentFit="cover"
            />
          </View>
          <View style={[styles.sideClip, styles.rightClip, { left: `${dividerPct}%` }]}>
            <Image
              source={{ uri: post.right.url }}
              style={[
                styles.fullImage,
                {
                  width: containerWidth || "100%",
                  marginLeft: containerWidth ? -(dividerPct / 100) * containerWidth : 0,
                },
              ]}
              contentFit="cover"
            />
          </View>

          <View style={styles.badgeLeft}>
            <View
              style={[
                styles.sideBadge,
                activeSide === "left" ? styles.sideBadgeActiveLeft : styles.sideBadgeIdle,
              ]}
            >
              <Text style={styles.sideBadgeText}>L</Text>
            </View>
          </View>
          <View style={styles.badgeRight}>
            <View
              style={[
                styles.sideBadge,
                activeSide === "right" ? styles.sideBadgeActiveRight : styles.sideBadgeIdle,
              ]}
            >
              <Text style={styles.sideBadgeText}>R</Text>
            </View>
          </View>

          <Animated.View style={[styles.dividerLine, dividerStyle]} />
          <Animated.View style={[styles.dividerHandle, dividerStyle]}>
            <Text style={styles.handleArrows}>‹›</Text>
          </Animated.View>

          {post.ad?.left ? (
            <Pressable
              style={[styles.adCta, { left: `${Math.min(dividerPct / 2, dividerPct - 6)}%` }]}
              onPress={() => Linking.openURL(post.ad!.left!.link)}
            >
              <Text style={styles.adTag}>AD</Text>
              <Text style={styles.adLabel}>{post.ad.left.ctaLabel}</Text>
            </Pressable>
          ) : null}
          {post.ad?.right ? (
            <Pressable
              style={[
                styles.adCta,
                { left: `${dividerPct + (100 - dividerPct) / 2}%` },
              ]}
              onPress={() => Linking.openURL(post.ad!.right!.link)}
            >
              <Text style={styles.adTag}>AD</Text>
              <Text style={styles.adLabel}>{post.ad.right.ctaLabel}</Text>
            </Pressable>
          ) : null}

          <View style={styles.captionOverlay}>
            <Text style={styles.captionText}>
              <Text style={{ opacity: leftCaptionOpacity, fontWeight: "600" }}>
                {post.left.caption}
              </Text>
              <Text style={styles.captionDot}> · </Text>
              <Text style={{ opacity: rightCaptionOpacity, fontWeight: "600" }}>
                {post.right.caption}
              </Text>
            </Text>
          </View>
        </View>
      </GestureDetector>

      <View style={styles.reactions}>
        <Pressable style={styles.reactionBtn} onPress={() => setLikedLeft((v) => !v)}>
          <Heart
            size={15}
            color={likedLeft ? colors.danger : colors.mutedForeground}
            fill={likedLeft ? colors.danger : "transparent"}
          />
          <Text style={[styles.reactionText, likedLeft && { color: colors.danger }]}>
            {post.left.likes + (likedLeft ? 1 : 0)}
          </Text>
          <Text style={styles.sideHint}>L</Text>
        </Pressable>

        <View style={styles.reactionDivider} />

        <Pressable style={styles.reactionBtn} onPress={() => setLikedRight((v) => !v)}>
          <Heart
            size={15}
            color={likedRight ? colors.danger : colors.mutedForeground}
            fill={likedRight ? colors.danger : "transparent"}
          />
          <Text style={[styles.reactionText, likedRight && { color: colors.danger }]}>
            {post.right.likes + (likedRight ? 1 : 0)}
          </Text>
          <Text style={styles.sideHint}>R</Text>
        </Pressable>

        <View style={{ flex: 1 }} />

        <View style={styles.reactionBtn}>
          <MessageCircle size={15} color={colors.mutedForeground} />
          <Text style={styles.reactionText}>
            {post.left.comments.length + post.right.comments.length}
          </Text>
        </View>

        <Pressable style={styles.iconBtn} onPress={() => onShare(post, activeSide)}>
          <Share2 size={15} color={colors.mutedForeground} />
        </Pressable>
        <Pressable style={styles.iconBtn}>
          <Bookmark size={15} color={colors.mutedForeground} />
        </Pressable>
      </View>

      <View style={styles.commentsSection}>
        <View style={styles.commentsHeader}>
          <View
            style={[
              styles.activeSideBadge,
              activeSide === "left" ? styles.activeLeft : styles.activeRight,
            ]}
          >
            <Text
              style={[
                styles.activeSideText,
                { color: activeSide === "left" ? colors.left : colors.right },
              ]}
            >
              {activeSide === "left" ? "◀ LEFT" : "RIGHT ▶"}
            </Text>
          </View>
          <Text style={styles.commentCount}>
            {activeData.comments.length} comments
          </Text>
        </View>

        {activeData.comments.map((comment) => (
          <View key={comment.id} style={styles.commentRow}>
            <Image source={{ uri: comment.avatar }} style={styles.commentAvatar} />
            <Text style={styles.commentBody}>
              <Text style={styles.commentUser}>{comment.user} </Text>
              {comment.text}
            </Text>
          </View>
        ))}

        <Pressable>
          <Text style={styles.addComment}>Add a comment...</Text>
        </Pressable>
      </View>

      <View style={styles.postDivider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.1)",
  },
  headerText: {
    flex: 1,
    minWidth: 0,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  name: {
    color: colors.foreground,
    fontSize: 14,
    fontWeight: "600",
    flexShrink: 1,
  },
  sponsoredBadge: {
    backgroundColor: "rgba(251,191,36,0.15)",
    borderWidth: 1,
    borderColor: "rgba(251,191,36,0.25)",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  sponsoredText: {
    color: colors.sponsored,
    fontSize: 9,
    fontWeight: "700",
  },
  handle: {
    color: colors.mutedForeground,
    fontSize: 12,
    marginTop: 2,
  },
  splitContainer: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#18181b",
    overflow: "hidden",
  },
  sideClip: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    overflow: "hidden",
  },
  rightClip: {
    right: 0,
  },
  fullImage: {
    height: "100%",
  },
  badgeLeft: {
    position: "absolute",
    top: 12,
    left: 12,
  },
  badgeRight: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  sideBadge: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  sideBadgeIdle: {
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  sideBadgeActiveLeft: {
    backgroundColor: "rgba(79,158,255,0.85)",
  },
  sideBadgeActiveRight: {
    backgroundColor: "rgba(217,70,239,0.85)",
  },
  sideBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
  dividerLine: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 1,
    marginLeft: -0.5,
    backgroundColor: "rgba(255,255,255,0.75)",
  },
  dividerHandle: {
    position: "absolute",
    top: "50%",
    width: 40,
    height: 40,
    marginLeft: -20,
    marginTop: -20,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  handleArrows: {
    color: colors.background,
    fontSize: 14,
    fontWeight: "700",
  },
  adCta: {
    position: "absolute",
    bottom: 40,
    transform: [{ translateX: -50 }],
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(251,191,36,0.92)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  adTag: {
    fontSize: 8,
    fontWeight: "900",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 4,
    borderRadius: 4,
    color: colors.background,
  },
  adLabel: {
    color: colors.background,
    fontSize: 12,
    fontWeight: "700",
  },
  captionOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 32,
    paddingBottom: 10,
    paddingHorizontal: 16,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  captionText: {
    color: "#fff",
    fontSize: 12,
  },
  captionDot: {
    opacity: 0.3,
  },
  reactions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  reactionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  reactionText: {
    color: colors.mutedForeground,
    fontSize: 12,
    fontWeight: "500",
  },
  sideHint: {
    color: colors.mutedForeground,
    fontSize: 10,
    opacity: 0.5,
  },
  reactionDivider: {
    width: 1,
    height: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  iconBtn: {
    padding: 2,
  },
  commentsSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  commentsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  activeSideBadge: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  activeLeft: {
    backgroundColor: "rgba(79,158,255,0.15)",
  },
  activeRight: {
    backgroundColor: "rgba(217,70,239,0.15)",
  },
  activeSideText: {
    fontSize: 10,
    fontWeight: "700",
  },
  commentCount: {
    color: colors.mutedForeground,
    fontSize: 12,
  },
  commentRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  commentAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginTop: 2,
  },
  commentBody: {
    flex: 1,
    color: "rgba(250,250,250,0.7)",
    fontSize: 12,
    lineHeight: 18,
  },
  commentUser: {
    color: colors.foreground,
    fontWeight: "600",
  },
  addComment: {
    color: colors.mutedForeground,
    fontSize: 12,
    marginTop: 2,
  },
  postDivider: {
    height: 1,
    backgroundColor: colors.border,
  },
});
