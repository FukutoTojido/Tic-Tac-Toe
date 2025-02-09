import { useContext } from "react";
import { Context } from "../Context";
import { GamePhase } from "../types";
import { Circle, Triangle, X } from "lucide-react";
import { Actions } from "../actions";

export default function Winner() {
	const { state, dispatch } = useContext(Context);
	return (
		<div className="w-full flex flex-col gap-5 items-center justify-center text-xl">
			<div className="text-2xl">
				{state.phase === GamePhase.NewGame ||
				state.phase === GamePhase.OnGoing ? (
					"You are not supposed to be here?"
				) : state.phase === GamePhase.O ? (
					<div className="flex items-center gap-2.5 text-[#ff9752]">
						<Circle size={36} color="#ff9752" strokeWidth={4} />
						is the winner!
					</div>
				) : state.phase === GamePhase.X ? (
					<div className="flex items-center gap-2.5 text-[#594a39]">
						<X size={36} color="#594a39" strokeWidth={4} />
						is the winner!
					</div>
				) : (
					<div className="flex items-center gap-2.5 text-black">
						<Triangle size={36} color="black" strokeWidth={4} />
						It is a draw
					</div>
				)}
			</div>

			<button
				type="button"
				className="p-2.5 px-5 flex items-center gap-2.5 bg-[#594a39] rounded-md cursor-pointer text-white"
				onClick={() => {
					dispatch?.({
						action: Actions.NewGame,
						payload: null,
					});
				}}
			>
				New Game
			</button>
		</div>
	);
}
