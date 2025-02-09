import { type ActionDispatch, createContext } from "react";
import { GamePhase, type GameState, PlayerState, SquareState } from "./types";
import { Actions, type Payload } from "./actions";

export const defaultValue = {
	grid: [
		[SquareState.Nil, SquareState.Nil, SquareState.Nil],
		[SquareState.Nil, SquareState.Nil, SquareState.Nil],
		[SquareState.Nil, SquareState.Nil, SquareState.Nil],
	],
	phase: GamePhase.NewGame,
	currentScore: {
		O: 0,
		X: 0,
	},
	currentPlayer: PlayerState.O,
	history: [],
};

const checkDiagonally = (grid: SquareState[][], value: SquareState) => {
	let x1 = true;
	for (let i = 0; i < 3; i++) {
		if (grid[i][i] !== value) x1 &&= false;
	}

	let x2 = true;
	for (let i = 0; i < 3; i++) {
		if (grid[2 - i][i] !== value) x2 &&= false;
	}

	return x1 || x2;
};

const checkVertically = (
	grid: SquareState[][],
	value: SquareState,
	x: number,
) => {
	for (let i = 0; i < 3; i++) {
		if (grid[i][x] !== value) return false;
	}

	return true;
};

const checkHorizontally = (
	grid: SquareState[][],
	value: SquareState,
	y: number,
) => {
	for (let i = 0; i < 3; i++) {
		if (grid[y][i] !== value) return false;
	}

	return true;
};

const checkWinner = (grid: SquareState[][], x: number, y: number) => {
	const value = grid[x][y];

	let result = false;
	if (x % 2 === 0 && y % 2 === 0) {
		result ||= checkDiagonally(grid, value);
	}

	return (
		result ||
		checkVertically(grid, value, y) ||
		checkHorizontally(grid, value, x)
	);
};

export const reducer = (state: GameState, { action, payload }: Payload) => {
	switch (action) {
		case Actions.MarkSquare: {
			if (state.grid[payload.y][payload.x] !== SquareState.Nil) {
				return { ...state };
			}

			const grid = structuredClone(state.grid);
			grid[payload.y][payload.x] = payload.state;

			const hasWinner = checkWinner(grid, payload.y, payload.x);

			const nextPlayer =
				state.currentPlayer === PlayerState.O ? PlayerState.X : PlayerState.O;

			if (
				!grid.some((row) => row.some((square) => square === SquareState.Nil))
			) {
				return {
					...state,
					currentPlayer: nextPlayer,
					grid,
					phase: GamePhase.Draw,
					history: [...state.history, SquareState.Nil],
				};
			}

			if (hasWinner) {
				if (payload.state === SquareState.O) {
					return {
						...state,
						currentPlayer: nextPlayer,
						currentScore: {
							...state.currentScore,
							O: state.currentScore.O + 1,
						},
						grid,
						phase: GamePhase.O,
						history: [...state.history, payload.state],
					};
				}

				if (payload.state === SquareState.X) {
					return {
						...state,
						currentPlayer: nextPlayer,
						currentScore: {
							...state.currentScore,
							X: state.currentScore.X + 1,
						},
						grid,
						phase: GamePhase.X,
						history: [...state.history, payload.state],
					};
				}
			}

			return { ...state, currentPlayer: nextPlayer, grid };
		}
		case Actions.NewGame: {
			return {
				...defaultValue,
				history: [...state.history],
				currentScore: { ...state.currentScore },
			};
		}
		case Actions.SelectFirst: {
			return {
				...state,
				currentPlayer: payload.player,
				phase: GamePhase.OnGoing,
			};
		}
	}
};

export const Context = createContext<{
	state: GameState;
	dispatch?: ActionDispatch<[Payload]>;
}>({
	state: defaultValue,
});
