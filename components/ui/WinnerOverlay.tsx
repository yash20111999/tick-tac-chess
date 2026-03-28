import { useGameStore } from "@/store/gameStore";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import AnimatedPressable from "./AnimatedPressable";

const pieceWeights = {
  rook: 5,
  knight: 3,
  bishop: 3,
  king: 7,
};

const calculateScore = (board, player) => {
  let score = 0;
  board.forEach((row) => {
    row.forEach((cell) => {
      if (cell && cell.player === player) {
        score += pieceWeights[cell.type];
      }
    });
  });
  return score;
};

export default function WinnerOverlay() {
  const { winner, board, resetGame } = useGameStore();
  const progress = useSharedValue(0);

  const scoreA = calculateScore(board, "A");
  const scoreB = calculateScore(board, "B");

  useEffect(() => {
    if (winner) {
      progress.value = withTiming(1, { duration: 500 });
    } else {
      progress.value = 0;
    }
  }, [winner]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [{ scale: interpolate(progress.value, [0, 1], [0.8, 1]) }],
    };
  });

  if (!winner) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.container, animatedContainerStyle]}>
        <Text style={styles.title}>Game Over</Text>
        <Text style={styles.winnerText}>Player {winner} Wins!</Text>

        <View style={styles.scores}>
          <Text style={styles.scoreText}>Final Score:</Text>
          <Text style={styles.scoreText}>Player A: {scoreA}</Text>
          <Text style={styles.scoreText}>Player B: {scoreB}</Text>
        </View>

        <AnimatedPressable onPress={resetGame} style={styles.resetBtn}>
          <Text style={styles.resetBtnText}>Play Again</Text>
        </AnimatedPressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#1e1e1e",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    width: "85%",
    boxShadowColor: "#000",
    boxShadowOffset: { width: 0, height: 10 },
    boxShadowOpacity: 0.5,
    boxShadowRadius: 20,
    elevation: 30,
    borderWidth: 1,
    borderColor: "rgba(255, 215, 0, 0.5)",
  },
  title: {
    fontSize: 20,
    color: "#ccc",
    marginBottom: 10,
  },
  winnerText: {
    fontSize: 32,
    color: "#FFD700",
    fontWeight: "bold",
    marginBottom: 20,
  },
  scores: {
    marginBottom: 30,
    alignItems: "center",
  },
  scoreText: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 5,
  },
  resetBtn: {
    backgroundColor: "#FFD700",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  resetBtnText: {
    fontSize: 18,
    color: "#121212",
    fontWeight: "bold",
  },
});
