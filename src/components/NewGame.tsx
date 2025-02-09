import { useContext } from "react";
import { Context } from "../Context";
import { Circle, X } from "lucide-react";
import { Actions } from "../actions";
import { PlayerState } from "../types";
export default function NewGame() {
	const { dispatch } = useContext(Context);

	return (
		<div className="w-full flex flex-col gap-2.5 text-xl">
			Please select which one to go first
			<div className="flex w-full gap-2 5 items-center justify-center text-white">
				<button
					type="button"
					className="p-2.5 px-5 flex items-center gap-2.5 rounded-md bg-[#ff9752] cursor-pointer"
					onClick={() => {
						dispatch?.({
							action: Actions.SelectFirst,
							payload: {
								player: PlayerState.O,
							},
						});
					}}
				>
					<Circle size={24} color="#ffffff" strokeWidth={4} />
					Circle
				</button>
				<button
					type="button"
					className="p-2.5 px-5 flex items-center gap-2.5 bg-[#594a39] rounded-md cursor-pointer"
					onClick={() => {
						dispatch?.({
							action: Actions.SelectFirst,
							payload: {
								player: PlayerState.X,
							},
						});
					}}
				>
					<X size={24} color="#ffffff" strokeWidth={4} />
					Cross
				</button>
			</div>
		</div>
	);
}
