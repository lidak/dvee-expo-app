import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Upload, X } from "lucide-react-native";
import { colors } from "@/constants/theme";

const SAMPLE_LEFT =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop&auto=format";
const SAMPLE_RIGHT =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=400&fit=crop&auto=format";

export default function CreateScreen() {
  const router = useRouter();
  const [leftImg, setLeftImg] = useState<string | null>(null);
  const [rightImg, setRightImg] = useState<string | null>(null);
  const [leftCaption, setLeftCaption] = useState("");
  const [rightCaption, setRightCaption] = useState("");

  const canPost = !!leftImg && !!rightImg;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <X size={20} color={colors.mutedForeground} />
        </Pressable>
        <Text style={styles.title}>New Dvee</Text>
        <Pressable disabled={!canPost} style={[styles.postBtn, !canPost && styles.postBtnDisabled]}>
          <Text style={[styles.postText, !canPost && styles.postTextDisabled]}>Post</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.hint}>
          Each side tells its own story. Viewers drag the divider to explore.
        </Text>

        <View style={styles.uploadRow}>
          <UploadSlot
            label="Left side"
            tag="L"
            color={colors.left}
            image={leftImg}
            onToggle={() => setLeftImg(leftImg ? null : SAMPLE_LEFT)}
          />
          <UploadSlot
            label="Right side"
            tag="R"
            color={colors.right}
            image={rightImg}
            onToggle={() => setRightImg(rightImg ? null : SAMPLE_RIGHT)}
          />
        </View>

        {leftImg && rightImg ? (
          <View style={styles.preview}>
            <View style={styles.previewLeft}>
              <Image source={{ uri: leftImg }} style={styles.previewImage} contentFit="cover" />
            </View>
            <View style={styles.previewRight}>
              <Image source={{ uri: rightImg }} style={styles.previewImage} contentFit="cover" />
            </View>
            <View style={styles.previewDivider} />
            <View style={styles.previewHandle}>
              <Text style={styles.previewHandleText}>‹›</Text>
            </View>
          </View>
        ) : null}

        <CaptionField
          label="Left caption"
          tag="L"
          color={colors.left}
          value={leftCaption}
          onChangeText={setLeftCaption}
          placeholder="Caption for the left side..."
        />
        <CaptionField
          label="Right caption"
          tag="R"
          color={colors.right}
          value={rightCaption}
          onChangeText={setRightCaption}
          placeholder="Caption for the right side..."
        />

        <View style={styles.tips}>
          <Text style={styles.tipsTitle}>✦ How Dvee works</Text>
          <Text style={styles.tip}>• Each side has its own reactions and comments</Text>
          <Text style={styles.tip}>• Viewers drag the divider to explore both sides</Text>
          <Text style={styles.tip}>• Share either side to Instagram, X, and more</Text>
          <Text style={styles.tip}>• The full Dvee is only viewable inside the app</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function UploadSlot({
  label,
  tag,
  color,
  image,
  onToggle,
}: {
  label: string;
  tag: string;
  color: string;
  image: string | null;
  onToggle: () => void;
}) {
  return (
    <Pressable
      style={[styles.uploadSlot, { borderColor: image ? color : "rgba(255,255,255,0.12)" }]}
      onPress={onToggle}
    >
      {image ? (
        <>
          <Image source={{ uri: image }} style={styles.uploadImage} contentFit="cover" />
          <View style={styles.uploadOverlay}>
            <X size={12} color="#fff" />
          </View>
        </>
      ) : (
        <>
          <Upload size={18} color={colors.mutedForeground} />
          <Text style={styles.uploadLabel}>{label}</Text>
          <Text style={[styles.uploadTag, { backgroundColor: `${color}20`, color }]}>{tag}</Text>
        </>
      )}
    </Pressable>
  );
}

function CaptionField({
  label,
  tag,
  color,
  value,
  onChangeText,
  placeholder,
}: {
  label: string;
  tag: string;
  color: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}) {
  return (
    <View style={styles.field}>
      <View style={styles.fieldLabel}>
        <Text style={[styles.fieldTag, { backgroundColor: `${color}20`, color }]}>{tag}</Text>
        <Text style={styles.fieldLabelText}>{label}</Text>
      </View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        style={styles.input}
      />
    </View>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    flex: 1,
    color: colors.foreground,
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 12,
  },
  postBtn: {
    backgroundColor: colors.left,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  postBtnDisabled: {
    backgroundColor: "#27272a",
  },
  postText: {
    color: colors.background,
    fontWeight: "700",
    fontSize: 14,
  },
  postTextDisabled: {
    color: colors.muted,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  hint: {
    color: colors.mutedForeground,
    fontSize: 12,
    textAlign: "center",
    marginBottom: 16,
  },
  uploadRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  uploadSlot: {
    flex: 1,
    aspectRatio: 1,
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 16,
    backgroundColor: "rgba(39,39,42,0.3)",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    overflow: "hidden",
  },
  uploadImage: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  uploadOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadLabel: {
    color: colors.mutedForeground,
    fontSize: 12,
    fontWeight: "600",
  },
  uploadTag: {
    width: 20,
    height: 20,
    borderRadius: 4,
    textAlign: "center",
    lineHeight: 20,
    fontSize: 10,
    fontWeight: "700",
    overflow: "hidden",
  },
  preview: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    backgroundColor: "#18181b",
  },
  previewLeft: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "50%",
    overflow: "hidden",
  },
  previewRight: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: "50%",
    overflow: "hidden",
  },
  previewImage: {
    width: "200%",
    height: "100%",
  },
  previewDivider: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "50%",
    width: 1,
    marginLeft: -0.5,
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  previewHandle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 36,
    height: 36,
    marginLeft: -18,
    marginTop: -18,
    borderRadius: 18,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  previewHandleText: {
    color: colors.background,
    fontWeight: "700",
  },
  field: {
    marginBottom: 12,
  },
  fieldLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  fieldTag: {
    width: 16,
    height: 16,
    borderRadius: 4,
    textAlign: "center",
    lineHeight: 16,
    fontSize: 9,
    fontWeight: "700",
    overflow: "hidden",
  },
  fieldLabelText: {
    color: colors.mutedForeground,
    fontSize: 12,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "rgba(39,39,42,0.5)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.foreground,
    fontSize: 14,
  },
  tips: {
    marginTop: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 16,
    gap: 6,
  },
  tipsTitle: {
    color: colors.left,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 4,
  },
  tip: {
    color: colors.mutedForeground,
    fontSize: 12,
    lineHeight: 18,
  },
});
