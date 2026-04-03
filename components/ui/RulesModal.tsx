import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  visible: boolean;
  onClose: () => void;
};

const rules = [
  "4x4 board",
  "Each player has: 1 rook, 1 knight, 1 bishop, 1 king",
  "Players can place a piece or move a piece",
  "Movement allowed only after 3 pieces are on board",
  "Captured pieces return to opponent inventory",
  "Cooldown rule: recently captured piece cannot be placed immediately if it’s the only one",
  "Win conditions: Form a straight line (row, column, or diagonal) OR after max turns → winner decided by score",
  "Score system: knight = 3, bishop = 3, rook = 5, king = 7",
  "If tie: player with more pieces on board wins",
];

export default function RulesModal({ visible, onClose }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Game Rules</Text>
          {rules.map((rule, index) => (
            <Text key={index} style={styles.ruleText}>
              • {rule}
            </Text>
          ))}
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(10, 14, 8, 0.78)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#242D1F",
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(238, 238, 210, 0.14)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#EEEED2",
    marginBottom: 20,
    textAlign: "center",
  },
  ruleText: {
    fontSize: 16,
    color: "#D9E2C2",
    marginBottom: 10,
    lineHeight: 22,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#769656",
    borderRadius: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "rgba(238, 238, 210, 0.12)",
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#F7F7EE",
    textAlign: "center",
  },
});
