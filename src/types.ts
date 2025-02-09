export enum SquareState {
	Nil = 0,
	O = 1,
	X = 2,
}

export enum PlayerState {
	O = 0,
	X = 1,
}

export type GridState = SquareState[][];

export enum GamePhase {
	NewGame = 0,
	OnGoing = 1,
	O = 2,
	X = 3,
	Draw = 4,
}
export type GameState = {
	grid: GridState;
	phase: GamePhase;
	currentScore: {
		O: number;
		X: number;
	};
	currentPlayer: PlayerState;
	history: SquareState[];
};
