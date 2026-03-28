type Player = "A" | "B";

export function checkWinner(board: any[][]): Player | null {
  const directions = [
    [1, 0], // vertical
    [0, 1], // horizontal
    [1, 1], // diagonal
    [1, -1], // anti-diagonal
  ];

  const isInside = (r: number, c: number) => r >= 0 && r < 4 && c >= 0 && c < 4;

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const cell = board[row][col];
      if (!cell) continue;

      for (let [dr, dc] of directions) {
        let count = 1;

        // 🔥 forward
        let r = row + dr;
        let c = col + dc;

        while (
          isInside(r, c) &&
          board[r][c] &&
          board[r][c].player === cell.player
        ) {
          count++;
          r += dr;
          c += dc;
        }

        // 🔥 backward
        r = row - dr;
        c = col - dc;

        while (
          isInside(r, c) &&
          board[r][c] &&
          board[r][c].player === cell.player
        ) {
          count++;
          r -= dr;
          c -= dc;
        }

        if (count >= 4) return cell.player;
      }
    }
  }

  return null;
}
