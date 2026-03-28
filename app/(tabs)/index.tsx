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
      colors={["#121212", "#1A1A1A", "#121212"]}
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
        <Text style={styles.turnIndicator}>Player {currentPlayer}'s Turn</Text>

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
    color: "white",
    paddingBottom: 10,
  },
});
