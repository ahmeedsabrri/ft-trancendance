"use client";
import { useUser } from '../context/userContext';
import Game from "./components/Game";
import Rank from "./components/Rank";
import Statistique from "./components/Statistique";

export default  function   Dashboard() {
  const { user, loading, error } = useUser();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>
  return (
    <div className="size-full p-4  flex flex-col justify-center border-t-1 shadow-xl border-t border-l border-border backdrop-blur-3xl rounded-3xl">
            <div className="h-[50%] w-full flex items-center gap-4">
                <Game />
                <Rank />
            </div>
            <div className="h-[50%] w-full flex items-center">
                <Statistique />
            </div>
        </div>
  );
}
