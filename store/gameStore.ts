import { create } from "zustand";
import { getValidMoves, isValidMove } from "../engine/moves";
import { checkWinner } from "../engine/winner";

type Player = "A" | "B";
type PieceType = "rook" | "knight" | "bishop" | "king";

const pieceWeights = {
  rook: 5,
  knight: 3,
  bishop: 3,
  king: 7,
};

type Cell = {
  player: Player;
  type: PieceType;
} | null;

type Position = { row: number; col: number };

type Inventory = {
  rook: number;
  knight: number;
  bishop: number;
  king: number;
};

type GameState = {
  board: Cell[][];
  currentPlayer: Player;

  selectedCell: Position | null;
  selectedInventoryPiece: PieceType | null;
  mode: "place" | "move" | null;

  inventory: Record<Player, Inventory>;
  piecesOnBoard: Record<Player, number>;
  lastCaptured: Record<Player, PieceType | null>;

  validMoves: Position[];
  winner: Player | null;
  scores: Record<Player, number>;

  selectInventoryPiece: (type: PieceType) => void;
  handleCellPress: (row: number, col: number) => void;
  resetGame: () => void;
};

// =========================
// HELPER: Check if King Exists
// =========================
function hasKing(board: Cell[][], player: Player): boolean {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const cell = board[row][col];
      if (cell && cell.player === player && cell.type === "king") {
        return true;
      }
    }
  }
  return false;
}

export const useGameStore = create<GameState>((set, get) => ({
  board: Array(4)
    .fill(null)
    .map(() => Array(4).fill(null)),

  currentPlayer: "A",

  selectedCell: null,
  selectedInventoryPiece: null,
  mode: null,

  inventory: {
    A: { rook: 1, knight: 1, bishop: 1, king: 1 },
    B: { rook: 1, knight: 1, bishop: 1, king: 1 },
  },

  piecesOnBoard: { A: 0, B: 0 },
  lastCaptured: { A: null, B: null },

  validMoves: [],
  winner: null,
  scores: { A: 0, B: 0 },

  // =========================
  // INVENTORY SELECT (OVERRIDE SAFE)
  // =========================
  selectInventoryPiece: (type) => {
    const { currentPlayer, inventory, lastCaptured } = get();

    const total = inventory[currentPlayer][type];

    // cooldown rule (only block if it's the only piece)
    // if (lastCaptured[currentPlayer] === type && total === 1) return;

    if (total <= 0) return;

    set({
      selectedInventoryPiece: type,
      selectedCell: null,
      validMoves: [],
      mode: "place",
    });
  },

  // =========================
  // MAIN CLICK HANDLER
  // =========================
  handleCellPress: (row, col) => {
    const state = get();
    if (state.winner) return;

    if (state.selectedInventoryPiece) {
      return placement(row, col, state, set);
    }

    if (state.mode === "move" && state.selectedCell) {
      return move(row, col, state, set);
    }

    return select(row, col, state, set);
  },
  resetGame: () => {
    set({
      board: Array(4)
        .fill(null)
        .map(() => Array(4).fill(null)),
      currentPlayer: "A",
      selectedCell: null,
      selectedInventoryPiece: null,
      mode: null,
      inventory: {
        A: { rook: 1, knight: 1, bishop: 1, king: 1 },
        B: { rook: 1, knight: 1, bishop: 1, king: 1 },
      },
      piecesOnBoard: { A: 0, B: 0 },
      lastCaptured: { A: null, B: null },
      validMoves: [],
      winner: null,
      scores: { A: 0, B: 0 },
    });
  },
}));

// =========================
// PLACEMENT
// =========================
function placement(row, col, state: GameState, set: any) {
  const { board, currentPlayer, selectedInventoryPiece } = state;

  const cell = board[row][col];

  // place only on empty
  if (!cell) {
    const newBoard = board.map((r) => [...r]);

    newBoard[row][col] = {
      player: currentPlayer,
      type: selectedInventoryPiece!,
    };

    const newInventory = {
      ...state.inventory,
      [currentPlayer]: {
        ...state.inventory[currentPlayer],
        [selectedInventoryPiece!]:
          state.inventory[currentPlayer][selectedInventoryPiece!] - 1,
      },
    };

    const newPieces = {
      ...state.piecesOnBoard,
      [currentPlayer]: state.piecesOnBoard[currentPlayer] + 1,
    };

    const winner = checkWinner(newBoard);

    set({
      board: newBoard,
      inventory: newInventory,
      piecesOnBoard: newPieces,
      lastCaptured: {
        ...state.lastCaptured,
        [currentPlayer]: null,
      },
      currentPlayer: winner ? currentPlayer : currentPlayer === "A" ? "B" : "A",
      selectedInventoryPiece: null,
      mode: null,
      winner,
    });

    return;
  }

  // own piece → switch to move
  if (cell.player === currentPlayer) {
    if (state.piecesOnBoard[currentPlayer] < 3) {
      set({ selectedInventoryPiece: null, mode: null });
      return;
    }

    const moves = getValidMoves(board, { row, col }, currentPlayer);

    set({
      selectedInventoryPiece: null,
      selectedCell: { row, col },
      validMoves: moves,
      mode: "move",
    });

    return;
  }
}

// =========================
// SELECTION
// =========================
function select(row, col, state: GameState, set: any) {
  const { board, currentPlayer, piecesOnBoard } = state;

  if (!hasKing(board, currentPlayer)) return;

  const cell = board[row][col];

  if (!cell || cell.player !== currentPlayer) return;
  // if (piecesOnBoard[currentPlayer] < 3) return;

  const moves = getValidMoves(board, { row, col }, currentPlayer);

  set({
    selectedCell: { row, col },
    validMoves: moves,
    mode: "move",
  });
}

// =========================
// MOVE
// =========================
function move(row, col, state: GameState, set: any) {
  const { board, currentPlayer, selectedCell } = state;

  if (!hasKing(board, currentPlayer)) return;

  const from = selectedCell!;
  const piece = board[from.row][from.col];
  if (!piece) return;

  const targetCell = board[row][col];

  // override selection
  if (targetCell && targetCell.player === currentPlayer) {
    const moves = getValidMoves(board, { row, col }, currentPlayer);

    set({
      selectedCell: { row, col },
      validMoves: moves,
    });
    return;
  }

  const valid = isValidMove(board, from, { row, col }, currentPlayer);
  if (!valid) return;

  const newBoard = board.map((r) => [...r]);
  const newInventory = { ...state.inventory };
  const newPieces = { ...state.piecesOnBoard };
  const newLastCaptured = { ...state.lastCaptured };
  const newScores = { ...state.scores };

  const target = board[row][col];
  let newWinner: Player | null = null;

  // capture
  if (target) {
    newInventory[target.player][target.type]++;
    newPieces[target.player]--;
    newLastCaptured[target.player] = target.type;
    newScores[currentPlayer] += pieceWeights[target.type];

    if (target.type === "king") {
      newWinner = currentPlayer;
    }
  }

  newBoard[row][col] = { ...piece };
  newBoard[from.row][from.col] = null;

  if (!newWinner) {
    newWinner = checkWinner(newBoard);
  }

  set({
    board: newBoard,
    inventory: newInventory,
    piecesOnBoard: newPieces,
    lastCaptured: {
      ...newLastCaptured,
      [currentPlayer]: null,
    },
    selectedCell: null,
    validMoves: [],
    mode: null,
    winner: newWinner,
    currentPlayer: newWinner
      ? currentPlayer
      : currentPlayer === "A"
        ? "B"
        : "A",
    scores: newScores,
  });
}
