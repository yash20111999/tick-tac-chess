type Player = "A" | "B";
type PieceType = "pawn" | "rook" | "knight" | "bishop" | "king";

type Cell = {
  player: Player;
  type: PieceType;
  direction?: "up" | "down"; // only pawn
} | null;

type Position = { row: number; col: number };

const isInside = (r: number, c: number) => r >= 0 && r < 4 && c >= 0 && c < 4;

export function isValidMove(
  board: Cell[][],
  from: Position,
  to: Position,
  player: Player,
): boolean {
  if (!isInside(to.row, to.col)) return false;

  const piece = board[from.row][from.col];
  const target = board[to.row][to.col];

  if (!piece || piece.player !== player) return false;

  switch (piece.type) {
    case "pawn":
      return validatePawn(piece, from, to, target);

    case "rook":
      return validateRook(board, piece, from, to, target);

    case "knight":
      return validateKnight(piece, from, to, target);

    case "bishop":
      return validateBishop(board, piece, from, to, target);

    case "king":
      return validateKing(piece, from, to, target);

    default:
      return false;
  }
}

export function getValidMoves(
  board: Cell[][],
  from: Position,
  player: Player,
): Position[] {
  const moves: Position[] = [];

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (isValidMove(board, from, { row: r, col: c }, player)) {
        moves.push({ row: r, col: c });
      }
    }
  }

  return moves;
}

// =========================
// PAWN
// =========================
function validatePawn(
  piece: NonNullable<Cell>,
  from: Position,
  to: Position,
  target: Cell,
) {
  const dir = piece.direction as "up" | "down";
  const step = dir === "down" ? 1 : -1;

  if (to.row !== from.row + step) return false;

  if (to.col === from.col) {
    return target === null;
  }

  if (Math.abs(to.col - from.col) === 1) {
    return target !== null && target.player !== piece.player;
  }

  return false;
}

// =========================
// ROOK
// =========================
function validateRook(
  board: Cell[][],
  piece: NonNullable<Cell>,
  from: Position,
  to: Position,
  target: Cell,
) {
  if (from.row !== to.row && from.col !== to.col) return false;

  const dr = Math.sign(to.row - from.row);
  const dc = Math.sign(to.col - from.col);

  let r = from.row + dr;
  let c = from.col + dc;

  while (r !== to.row || c !== to.col) {
    if (board[r][c]) return false;
    r += dr;
    c += dc;
  }

  return !target || target.player !== piece.player;
}

// =========================
// BISHOP (NEW)
// =========================
function validateBishop(
  board: Cell[][],
  piece: NonNullable<Cell>,
  from: Position,
  to: Position,
  target: Cell,
) {
  const dr = Math.abs(to.row - from.row);
  const dc = Math.abs(to.col - from.col);

  if (dr !== dc) return false;

  const stepR = Math.sign(to.row - from.row);
  const stepC = Math.sign(to.col - from.col);

  let r = from.row + stepR;
  let c = from.col + stepC;

  while (r !== to.row && c !== to.col) {
    if (board[r][c]) return false;
    r += stepR;
    c += stepC;
  }

  return !target || target.player !== piece.player;
}

// =========================
// KNIGHT
// =========================
function validateKnight(
  piece: NonNullable<Cell>,
  from: Position,
  to: Position,
  target: Cell,
) {
  const dr = Math.abs(to.row - from.row);
  const dc = Math.abs(to.col - from.col);

  const valid = (dr === 2 && dc === 1) || (dr === 1 && dc === 2);

  if (!valid) return false;

  return !target || target.player !== piece.player;
}

// =========================
// KING (NEW)
// =========================
function validateKing(
  piece: NonNullable<Cell>,
  from: Position,
  to: Position,
  target: Cell,
) {
  const dr = Math.abs(to.row - from.row);
  const dc = Math.abs(to.col - from.col);

  // move 1 step any direction
  if (dr <= 1 && dc <= 1) {
    return !target || target.player !== piece.player;
  }

  return false;
}
