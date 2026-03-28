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
    backgroundColor: "#B58863",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    boxShadowColor: "#000",
    boxShadowOffset: { width: 0, height: 10 },
    boxShadowOpacity: 0.5,
    boxShadowRadius: 15,
    elevation: 20,
  },
  row: {
    flexDirection: "row",
  },
});
