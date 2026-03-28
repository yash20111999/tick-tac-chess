import { useGameStore } from "@/store/gameStore";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Scoreboard() {
  const scores = useGameStore((s) => s.scores);

  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.playerLabel}>Player A</Text>
        <Text style={styles.score}>{scores.A}</Text>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.playerLabel}>Player B</Text>
        <Text style={styles.score}>{scores.B}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  scoreContainer: {
    alignItems: "center",
  },
  playerLabel: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 4,
  },
  score: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
});
