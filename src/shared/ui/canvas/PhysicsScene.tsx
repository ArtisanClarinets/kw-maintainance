"use client";

import { Physics } from "@react-three/cannon";
import { ReactNode } from "react";
import { Debug } from "@react-three/cannon";

interface PhysicsSceneProps {
  children: ReactNode;
  debug?: boolean;
  gravity?: [number, number, number];
}

export const PhysicsScene = ({ children, debug = false, gravity = [0, -9.81, 0] }: PhysicsSceneProps) => {
  return (
    <Physics
      broadphase="SAP"
      gravity={gravity}
    >
      {debug && <Debug color="black" scale={1.1} />}
      {children}
    </Physics>
  );
};
