import { useGameStore } from "@/store/gameStore";
import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import PieceIcon from "./PieceIcon";

const CELL_SIZE = 70;

type PieceType = "rook" | "knight" | "bishop" | "king";
type Player = "A" | "B";

type Props = {
  type: PieceType;
  player: Player;
  row: number;
  col: number;
};

export default function Piece({ type, player, row, col }: Props) {
  const selectedCell = useGameStore((s) => s.selectedCell);
  const isSelected = selectedCell?.row === row && selectedCell?.col === col;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: withTiming(row * CELL_SIZE),
      left: withTiming(col * CELL_SIZE),
      transform: [{ scale: withSpring(isSelected ? 1.2 : 1) }],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <PieceIcon player={player} type={type} width={42} height={42} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: CELL_SIZE,
    height: CELL_SIZE,
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "none",
  },
});
