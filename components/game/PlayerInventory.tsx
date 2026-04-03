import { StyleSheet, Text, View } from "react-native";
import { useGameStore } from "../../store/gameStore";
import AnimatedPressable from "../ui/AnimatedPressable";
import PieceIcon from "./PieceIcon";

type Player = "A" | "B";
type PieceType = "rook" | "knight" | "bishop" | "king";

export default function PlayerInventory({ player }: { player: Player }) {
  const {
    inventory,
    currentPlayer,
    selectedInventoryPiece,
    selectInventoryPiece,
  } = useGameStore();

  const playerInventory = inventory[player];
  const isActive = currentPlayer === player;

  return (
    <View style={[styles.container, !isActive && styles.inactive]}>
      <Text style={styles.title}>{`Player ${player}'s Inventory`}</Text>
      <View style={styles.row}>
        {(Object.keys(playerInventory) as PieceType[]).map((type) => {
          const count = playerInventory[type];
          const isSelected = selectedInventoryPiece === type && isActive;

          if (count === 0) return null;

          return (
            <AnimatedPressable
              key={type}
              disabled={!isActive}
              onPress={() => selectInventoryPiece(type)}
              style={[styles.item, isSelected && styles.selected]}
            >
              <PieceIcon player={player} type={type} />
              <Text style={styles.count}>x{count}</Text>
            </AnimatedPressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "rgba(18, 23, 16, 0.52)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(238, 238, 210, 0.12)",
  },
  inactive: {
    opacity: 0.5,
  },
  title: {
    color: "#EEEED2",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  item: {
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    backgroundColor: "rgba(118, 150, 86, 0.22)",
  },
  selected: {
    backgroundColor: "rgba(246, 246, 105, 0.28)",
    shadowColor: "#F6F669",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  count: {
    color: "#EEEED2",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 4,
  },
});
