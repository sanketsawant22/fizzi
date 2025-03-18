"use client";

import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const Loader = dynamic(
  () => import("@react-three/drei").then((mod) => mod.Loader),
  { ssr: false }
);

export default function ViewCanvas() {
  return (
    <>
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 30,
        }}
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true }}
        camera={{
          fov: 30,
        }}
      >
        <Suspense fallback={null}>
          <View.Port />
        </Suspense>
      </Canvas>
      <Loader
        containerStyles={{
          backgroundColor: "rgba(0, 0, 0, 0.95)",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 99999,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backdropFilter: "blur(5px)",
        }}
        dataStyles={{
          color: "#ffffff",
          fontSize: "18px",
          fontFamily: "var(--font-alpino)",
          letterSpacing: "3px",
          textTransform: "uppercase",
          marginTop: "20px",
          textShadow: "0 0 10px rgba(0, 255, 0, 0.7)",
        }}
        innerStyles={{
          backgroundColor: "#00ff00",
          height: "4px",
          boxShadow: "0 0 15px #00ff00, 0 0 30px #00ff00",
          borderRadius: "2px",
          animation: "pulse 1.5s infinite",
          width: "300px",
          maxWidth: "80vw",
        }}
      />
    </>
  );
}
