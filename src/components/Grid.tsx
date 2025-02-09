import { useContext } from "react";

import { Context } from "../Context";
import { PlayerState, SquareState } from "../types";
import { Circle, X } from "lucide-react";
import { Actions } from "../actions";

function Square({ state, x, y }: { state: SquareState; x: number; y: number }) {
	const { state: gameState, dispatch } = useContext(Context);
	return (
		<button
			type="button"
			className="aspect-square bg-white rounded-xl hover:shadow-xl shadow-[#ff9752]/30 hover:-translate-y-1 transition-all cursor-pointer flex items-center justify-center p-5 overflow-hidden"
			onClick={() => {
				dispatch?.({
					action: Actions.MarkSquare,
					payload: {
						x,
						y,
						state:
							gameState.currentPlayer === PlayerState.O
								? SquareState.O
								: SquareState.X,
					},
				});
			}}
		>
			{state === SquareState.Nil ? (
				""
			) : state === SquareState.O ? (
				<Circle size={128} strokeWidth={4} color="#ff9752" />
			) : (
				<X size={128} strokeWidth={4} color="#594a39" />
			)}
		</button>
	);
}

export default function Grid() {
	const { state } = useContext(Context);

	return (
		<div className="grid grid-cols-3 grid-rows-3 w-full gap-5 aspect-square">
			{state.grid.map((row, idx_r) =>
				row.map((col, idx_c) => (
					<Square
						state={col}
						key={`${idx_r}${
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							idx_c
						}`}
						x={idx_c}
						y={idx_r}
					/>
				)),
			)}
		</div>
	);
}
