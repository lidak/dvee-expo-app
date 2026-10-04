import { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  Share,
} from "react-native";
import { Image } from "expo-image";
import { X } from "lucide-react-native";
import { colors } from "@/constants/theme";
import { Post, PostSide } from "@/types/post";

interface ShareSheetProps {
  post: Post;
  defaultSide: PostSide;
  visible: boolean;
  onClose: () => void;
}

const PLATFORMS = [
  { name: "Instagram", emoji: "📸" },
  { name: "X / Twitter", emoji: "𝕏" },
  { name: "Facebook", emoji: "📘" },
  { name: "WhatsApp", emoji: "💬" },
  { name: "Telegram", emoji: "✈️" },
  { name: "Copy Link", emoji: "🔗" },
];

export function ShareSheet({ post, defaultSide, visible, onClose }: ShareSheetProps) {
  const [side, setSide] = useState<PostSide>(defaultSide);
  const data = side === "left" ? post.left : post.right;
  const deepLink = `dvee://post/${post.id}?side=${side}`;

  const shareSide = async (platform: string) => {
    await Share.share({
      message: `${data.caption}\n\nView the full Dvee: ${deepLink}`,
      url: data.url,
      title: `Dvee by @${post.user.handle}`,
    });
    if (platform === "Copy Link") {
      // Native share sheet includes copy on iOS/Android
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <View style={styles.pill} />
          <View style={styles.header}>
            <Text style={styles.title}>Share to social media</Text>
            <Pressable style={styles.closeBtn} onPress={onClose}>
              <X size={13} color={colors.mutedForeground} />
            </Pressable>
          </View>

          <Text style={styles.subtitle}>Choose which side to share:</Text>
          <View style={styles.sidePicker}>
            {(["left", "right"] as const).map((s) => {
              const sideData = s === "left" ? post.left : post.right;
              const selected = side === s;
              return (
                <Pressable
                  key={s}
                  style={[
                    styles.sideOption,
                    selected && styles.sideOptionSelected,
                    !selected && styles.sideOptionIdle,
                  ]}
                  onPress={() => setSide(s)}
                >
                  <Image source={{ uri: sideData.url }} style={styles.sideImage} contentFit="cover" />
                  <View style={styles.sideLabelWrap}>
                    <Text style={styles.sideLabel}>
                      {s === "left" ? "← Left" : "Right →"}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.note}>
            <Text style={styles.noteEmoji}>🔗</Text>
            <Text style={styles.noteText}>
              A link to the full Dvee post will be included. Viewers need the Dvee app to see both sides.
            </Text>
          </View>

          <View style={styles.platformGrid}>
            {PLATFORMS.map((platform) => (
              <Pressable
                key={platform.name}
                style={styles.platformBtn}
                onPress={() => shareSide(platform.name)}
              >
                <Text style={styles.platformEmoji}>{platform.emoji}</Text>
                <Text style={styles.platformName}>{platform.name}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  sheet: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
  },
  pill: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignSelf: "center",
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  title: {
    color: colors.foreground,
    fontSize: 14,
    fontWeight: "700",
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#27272a",
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    color: colors.mutedForeground,
    fontSize: 12,
    marginBottom: 10,
  },
  sidePicker: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  sideOption: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 2,
  },
  sideOptionSelected: {
    borderColor: colors.left,
    opacity: 1,
  },
  sideOptionIdle: {
    borderColor: "transparent",
    opacity: 0.45,
  },
  sideImage: {
    width: "100%",
    height: "100%",
  },
  sideLabelWrap: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  sideLabel: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
    textAlign: "center",
    paddingBottom: 8,
  },
  note: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "rgba(79,158,255,0.07)",
    borderWidth: 1,
    borderColor: "rgba(79,158,255,0.15)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  noteEmoji: {
    fontSize: 14,
  },
  noteText: {
    flex: 1,
    color: colors.mutedForeground,
    fontSize: 11,
    lineHeight: 16,
  },
  platformGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  platformBtn: {
    width: "31%",
    alignItems: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "rgba(39,39,42,0.4)",
  },
  platformEmoji: {
    fontSize: 20,
  },
  platformName: {
    color: colors.mutedForeground,
    fontSize: 10,
    fontWeight: "500",
    textAlign: "center",
  },
});
