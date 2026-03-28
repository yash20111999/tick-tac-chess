import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useGameStore } from "../../store/gameStore";

type Props = {
  row: number;
  col: number;
};

export default function Cell({ row, col }: Props) {
  const { handleCellPress, validMoves, selectedCell } = useGameStore();

  const isSelected = selectedCell?.row === row && selectedCell?.col === col;
  const isValidMove = validMoves.some((m) => m.row === row && m.col === col);
  const isDark = (row + col) % 2 === 1;

  const validMoveStyle = useAnimatedStyle(() => {
    return {
      opacity: withRepeat(withTiming(0.7, { duration: 1000 }), -1, true),
    };
  });

  return (
    <Pressable onPress={() => handleCellPress(row, col)}>
      <View
        style={[
          styles.cell,
          isDark ? styles.darkCell : styles.lightCell,
          isSelected && styles.selectedCell,
        ]}
      >
        {isValidMove && (
          <Animated.View style={[styles.validMove, validMoveStyle]} />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  lightCell: {
    backgroundColor: "#F0D9B5",
  },
  darkCell: {
    backgroundColor: "#B58863",
  },
  selectedCell: {
    borderWidth: 4,
    borderColor: "rgba(255, 215, 0, 0.7)",
  },
  validMove: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255, 215, 0, 0.5)",
  },
});
