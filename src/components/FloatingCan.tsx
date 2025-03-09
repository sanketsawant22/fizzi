"use client";

import { Float } from "@react-three/drei";
import { SodaCan, SodaCanProps } from "@/components/SodaCan";
import { Group } from "three";
import { forwardRef, ReactNode } from "react";

type FloatingCanProps = {
  flavor?: SodaCanProps["flavor"];
  floatSpeed?: number;
  rotationIntensity?: number;
  floatingtensity?: number;
  floatingrange?: [number, number];
  children?: ReactNode;
};

const FloatingCan = forwardRef<Group, FloatingCanProps>(
  ({
    flavor = "blackCherry",
    floatSpeed = 1.5,
    rotationIntensity = 1,
    floatingtensity = 1,
    floatingrange = [-0.1, 0.1],
    children,
    ...props
  }
  ,ref
) => {
    return (
      <group ref={ref} {...props}>
        <Float
          speed={floatSpeed}
          rotationIntensity={rotationIntensity}
          floatIntensity={floatingtensity}
          floatingRange={floatingrange}
        >
          {children}
          <SodaCan flavor={flavor}/>
        </Float>
      </group>
    );
  }
);

FloatingCan.displayName = "FloatingCan";

export default FloatingCan;
