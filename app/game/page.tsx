import { GameCanvas } from "@/ui/components/game/GameCanvas";

/**
 * /game route — full-screen shell that hosts the Phaser canvas.
 */
export default function GamePage() {
  return (
    <main className="flex h-screen w-screen flex-col bg-zinc-950">
      <GameCanvas />
    </main>
  );
}
