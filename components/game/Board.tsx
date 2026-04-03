import React from "react";
import { StyleSheet, View } from "react-native";
import { useGameStore } from "../../store/gameStore";
import Cell from "./Cell";
import Piece from "./Piece";

const BOARD_SIZE = 4;

export default function Board() {
  const board = useGameStore((s) => s.board);

  return (
    <View style={styles.container}>
      {/* Render the grid of cells */}
      {Array.from({ length: BOARD_SIZE }).map((_, row) => (
        <View key={row} style={styles.row}>
          {Array.from({ length: BOARD_SIZE }).map((_, col) => (
            <Cell key={col} row={row} col={col} />
          ))}
        </View>
      ))}

      {/* Render the pieces on top */}
      {board.map((rowArr, row) =>
        rowArr.map((cell, col) => {
          if (cell) {
            return (
              <Piece
                key={`${row}-${col}`}
                type={cell.type}
                player={cell.player}
                row={row}
                col={col}
              />
            );
          }
          return null;
        }),
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 280,
    backgroundColor: "#5D7A3A",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(238, 238, 210, 0.14)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 20,
  },
  row: {
    flexDirection: "row",
  },
});
