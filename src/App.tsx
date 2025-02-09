import { useReducer, useState } from "react";

import { Context, reducer, defaultValue } from "./Context";
import { Circle, RotateCcw, Timer, Triangle, X } from "lucide-react";
import Grid from "./components/Grid";
import { Actions } from "./actions";
import NewGame from "./components/NewGame";
import { GamePhase, PlayerState, SquareState } from "./types";
import Winner from "./components/Winner";

function App() {
	const [state, dispatch] = useReducer(reducer, defaultValue);
	const [showHistory, setShowHistory] = useState(false);

	return (
		<Context.Provider
			value={{
				state,
				dispatch,
			}}
		>
			<div className="lg:w-[1024px] w-full flex flex-col gap-5 p-5">
				<div className="w-full flex items-center justify-center gap-10 text-[64px] ">
					<Circle size={64} strokeWidth={4} color="#ff9752" />
					<div className="text-[#ff9752]">{state.currentScore.O}</div>
					<div className="text-[#594a39]">{state.currentScore.X}</div>
					<X size={64} strokeWidth={4} color="#594a39" />
				</div>
				<div className="w-full text-center text-xl text-[#594a39]">
					It is {state.currentPlayer === PlayerState.O ? "O" : "X"}'s turn
				</div>
				<div className="w-full flex justify-center">
					<div className="flex-1 max-w-[600px] flex justify-center gap-5 flex-col">
						<Grid />
						<div className="w-full flex items-center justify-center gap-10">
							<button
								type="button"
								className="p-4 transition-all rounded-xl hover:bg-[#7e706648] flex gap-2.5 items-center text-xl text-[#594a39]"
								onClick={() => setShowHistory(true)}
							>
								<Timer size={36} color="#594a39" />
								Match History
							</button>
							<button
								type="button"
								className="p-4 transition-all rounded-xl hover:bg-[#7e706648] flex gap-2.5 items-center text-xl text-[#594a39]"
								onClick={() => {
									dispatch?.({
										action: Actions.NewGame,
										payload: null,
									});
								}}
							>
								<RotateCcw size={36} color="#594a39" />
								Restart
							</button>
						</div>
					</div>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<div
						className={`lg:hidden fixed top-0 left-0 w-full h-full bg-black opacity-50 ${showHistory ? "fixed" : "hidden"}`}
						onClick={() => setShowHistory(false)}
						tabIndex={-1}
					/>
					<div
						className={`lg:w-[400px] lg:relative w-full bottom-0 left-0 fixed p-5 bg-white lg:rounded-xl rounded-t-xl h-max flex flex-col gap-2.5 ${showHistory ? "infoOut" : "infoOff"} overflow-ellipsis lg:max-h-[600px]`}
					>
						<div className="flex w-full justify-between items-center overflow-hidden">
							<div className="flex-1 text-xl text-[#ff9752] overflow-hidden">
								Match-up History
							</div>
							<button
								type="button"
								className="p-2.5"
								onClick={() => setShowHistory(false)}
							>
								<X size={20} color="#ff9752" />
							</button>
						</div>
						<div className="w-full flex gap-2.5 flex-col-reverse overflow-auto">
							{state.history.map((match, idx) => (
								<div
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									key={idx}
									className={`p-2.5 shadow-md rounded-md flex items-center gap-2.5 text-xl ${
										match === SquareState.O
											? "bg-[#ff9752] text-white"
											: match === SquareState.X
												? ("bg-[#594a39] text-white")
												: ("bg-[white] text-black")
									}`}
								>
									{match === SquareState.O ? (
										<>
											<Circle size={24} color="white" /> is the winner
										</>
									) : match === SquareState.X ? (
										<>
											<X size={24} color="white" /> is the winner
										</>
									) : (
										<>
											<Triangle size={24} color="black" /> It is a draw
										</>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
				<dialog
					open={state.phase !== GamePhase.OnGoing}
					className="bg-black/40 flex items-center justify-center p-5"
				>
					<div className="max-w-full w-[500px] bg-white p-5 shadow-2xl rounded-xl">
						{" "}
						{state.phase === GamePhase.OnGoing ? (
							""
						) : state.phase === GamePhase.NewGame ? (
							<NewGame />
						) : (
							<Winner />
						)}
					</div>
				</dialog>
			</div>
		</Context.Provider>
	);
}

export default App;
