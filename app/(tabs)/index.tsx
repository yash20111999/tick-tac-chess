import { useGameStore } from "@/store/gameStore";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Board from "../../components/game/Board";
import PlayerInventory from "../../components/game/PlayerInventory";
import Header from "../../components/ui/Header";
import Scoreboard from "../../components/ui/Scoreboard";
import WinnerOverlay from "../../components/ui/WinnerOverlay";

export default function HomeScreen() {
  const currentPlayer = useGameStore((s) => s.currentPlayer);

  return (
    <LinearGradient
      colors={["#1F241C", "#2C3327", "#3A4630"]}
      locations={[0, 0.45, 1]}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.gameContainer}>
          <View style={styles.topSection}>
            <PlayerInventory player="B" />
          </View>
          <Board />
          <View style={styles.bottomSection}>
            <PlayerInventory player="A" />
          </View>
        </View>
        <Scoreboard />
        <Text
          style={styles.turnIndicator}
        >{`Player ${currentPlayer}'s Turn`}</Text>

        <WinnerOverlay />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  gameContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topSection: {
    marginBottom: 20,
  },
  bottomSection: {
    marginTop: 20,
  },
  turnIndicator: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#F2F1E8",
    paddingBottom: 10,
    textShadowColor: "rgba(0, 0, 0, 0.28)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
