'use client'

import { useGameStore } from "./store/PannelStore";
import GamePanel from "./components/gamePannel/GamePanel";

const PongGame = () => {
	const { isFirstDotLarge } = useGameStore();

	return (
		<div className="bg-gray-500 py-1 bg-opacity-30 backdrop-blur-xl w-full h-full flex flex-col justify-center items-center rounded-3xl overflow-hidden px-2 border border-white/10">
			<main className="w-full h-full flex justify-center items-center gap-x-3 p-2 relative overflow-hidden">
				<GamePanel gameType="pingpong" />
				<GamePanel gameType="tictactoe" />
			</main>
			
			<div className="flex justify-center items-center gap-x-2 content-center mb-1">
				<div className={`transition-all duration-300 rounded-full ${isFirstDotLarge ? 'px-[24px] py-[10px] bg-white bg-opacity-40' : 'px-[12px] py-[10px] bg-black bg-opacity-25'}`}></div>
				<div className={`transition-all duration-300 rounded-full ${!isFirstDotLarge ? 'px-[24px] py-[10px] bg-white bg-opacity-40' : 'px-[12px] py-[10px] bg-black bg-opacity-25'}`}></div>
			</div>
		</div>
	);
}

export default PongGame;