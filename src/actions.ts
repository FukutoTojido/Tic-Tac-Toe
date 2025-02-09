import type { PlayerState, SquareState } from "./types";

export enum Actions {
	MarkSquare = 0,
	NewGame = 1,
	SelectFirst = 2,
}

export type MarkSquarePayload = {
	action: Actions.MarkSquare;
	payload: {
		x: number;
		y: number;
		state: SquareState;
	};
};

export type NewGamePayload = {
	action: Actions.NewGame;
	payload: null;
};

export type SelectFirstPayload = {
	action: Actions.SelectFirst;
	payload: {
		player: PlayerState;
	};
};

export type Payload = MarkSquarePayload | NewGamePayload | SelectFirstPayload;
