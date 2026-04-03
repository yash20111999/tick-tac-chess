import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import RulesModal from "./RulesModal";

export default function Header() {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Tick-Tac Chess</Text>
        </View>
        <Pressable
          style={styles.rulesButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.rulesButtonText}>Rules</Text>
        </Pressable>
      </View>
      <RulesModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#EEEED2",
    textAlign: "center",
  },
  rulesButton: {
    backgroundColor: "rgba(118, 150, 86, 0.22)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(238, 238, 210, 0.12)",
  },
  rulesButtonText: {
    color: "#EEEED2",
    fontSize: 14,
    fontWeight: "600",
  },
});
