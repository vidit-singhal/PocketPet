"use client";

import { useEffect, useRef } from "react";

import type Phaser from "phaser";

/**
 * Mount point for the Phaser canvas. Creates the game on mount and destroys it on unmount.
 * Phaser is loaded dynamically so it never runs during Next.js SSR.
 */
export function GameCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    const parent = containerRef.current;
    if (!parent || gameRef.current) return;

    let cancelled = false;

    async function startGame() {
      const Phaser = (await import("phaser")).default;
      const { createGameConfig } = await import("@/game/engine/gameConfig");

      if (cancelled || !containerRef.current) return;

      gameRef.current = new Phaser.Game(
        createGameConfig(containerRef.current),
      );
    }

    void startGame();

    return () => {
      cancelled = true;
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full min-h-[600px] bg-zinc-950"
      aria-label="PocketPet game canvas"
    />
  );
}
