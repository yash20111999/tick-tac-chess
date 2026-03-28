import React from "react";
import BBishop from "../../assets/pieces/bB.svg";
import BKing from "../../assets/pieces/bK.svg";
import BKnight from "../../assets/pieces/bN.svg";
import BRook from "../../assets/pieces/bR.svg";
import WBishop from "../../assets/pieces/wB.svg";
import WKing from "../../assets/pieces/wK.svg";
import WKnight from "../../assets/pieces/wN.svg";
import WRook from "../../assets/pieces/wR.svg";

type Player = "A" | "B";
type PieceType = "rook" | "knight" | "bishop" | "king";

const pieceMap = {
  A: {
    rook: WRook,
    knight: WKnight,
    bishop: WBishop,
    king: WKing,
  },
  B: {
    rook: BRook,
    knight: BKnight,
    bishop: BBishop,
    king: BKing,
  },
};

type Props = {
  player: Player;
  type: PieceType;
  width?: number;
  height?: number;
};

export default function PieceIcon({
  player,
  type,
  width = 28,
  height = 28,
}: Props) {
  const PieceComponent = pieceMap[player][type];
  return <PieceComponent width={width} height={height} />;
}
