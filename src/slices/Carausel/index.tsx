"use client";

import { FC, useRef, useState } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import clsx from "clsx"; 

import { Center, Environment, View } from "@react-three/drei";
import { Group } from "three";

import { ArrowIcon } from "./Arrow";
import { WavyCircles } from "./WavyCircles";
import { SodaCanProps } from "@/components/SodaCan";
import FloatingCan from "@/components/FloatingCan";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Props for `Carausel`.
 */

const SPINS_ON_CHANGE = 8;

const FLAVORS: {
  flavor: SodaCanProps["flavor"];
  color: string;
  name: string;
}[] = [
  { flavor: "blackCherry", color: "#710523", name: "Black Cherry" },
  { flavor: "grape", color: "#572981", name: "Grape Goodness" },
  { flavor: "lemonLime", color: "#164405", name: "Lemon Lime" },
  {
    flavor: "strawberryLemonade",
    color: "#690B3D",
    name: "Strawberry Lemonade",
  },
  { flavor: "watermelon", color: "#4B7002", name: "Watermelon Crush" },
];

export type CarauselProps = SliceComponentProps<Content.CarauselSlice>;

/**
 * Component for "Carausel" Slices.
 */
const Carausel: FC<CarauselProps> = ({ slice }) => {
  const [currentFlavourIndex, setcurrentFlavourIndex] = useState(0);

  const sodaCanRef = useRef<Group>(null);

  function changeFlavour(index: number) {
    if (!sodaCanRef.current) return;

    const nextIndex = (index + FLAVORS.length) % FLAVORS.length;

    const tl = gsap.timeline();

    tl.to(
      sodaCanRef.current.rotation,
      {
        y:
          index > currentFlavourIndex
            ? `-=${Math.PI * 2 * SPINS_ON_CHANGE}`
            : `+=${Math.PI * 2 * SPINS_ON_CHANGE}`,
        ease: "power2.inOut",
        duration: 1,
      },
      0
    )
      .to(
        ".background, .wavy-circles-outer, .wavy-circles-inner",
        {
          backgroundColor: FLAVORS[nextIndex].color,
          fill: FLAVORS[nextIndex].color,
          ease: "power2.inOut",
          duration: 1,
        },
        0
      )
      .to(".text-wrapper", { duration: 0.2, y: -10, opacity: 0 }, 0)
      .to(
        {},
        {
          onStart: () => {
            setcurrentFlavourIndex(nextIndex);
          },
        },
        0.5
      )
      .to(".text-wrapper", { duration: 0.2, y: 0, opacity: 1 }, 0.7);
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="carousel relative grid h-[110vh] grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-white py-12 text-white"
    >
      <div className="background pointer-events-none absolute inset-0 bg-[#710523] opacity-50" />

      <WavyCircles className="absolute top-1/2 left-1/2 h-[120vmin] -translate-x-1/2 -translate-y-1/2 text-[#710523]" />

      <h2 className="relative text-center text-5xl font-bold">
        <PrismicText field={slice.primary.heading} />
      </h2>

      <div className="flex items-center justify-center gap-4">
        {/* left */}
        <ArrowButton
          onClick={() => changeFlavour(currentFlavourIndex + 1)}
          direction="left"
          label="Previous Flavor"
        />
        {/* can */}
        <View className="aspect-square h-[70vmin] min-h-40">
          <Center position={[0, 0, 1.5]}>
            <FloatingCan
              ref={sodaCanRef}
              floatingtensity={0.3}
              rotationIntensity={1}
              flavor={FLAVORS[currentFlavourIndex].flavor}
            />
          </Center>
          <Environment files="/hdr/lobby.hdr" environmentIntensity={1} />
          <directionalLight intensity={3} position={[2, 0, 1]} />
        </View>
        {/* right */}
        <ArrowButton
          onClick={() => changeFlavour(currentFlavourIndex - 1)}
          direction="right"
          label="Next Flavor"
        />
      </div>

      <div className="text-area relative mx-auto text-center">
        <div className="text-wrapper text-4xl font-medium">
          <p>{FLAVORS[currentFlavourIndex].name}</p>
        </div>
        <div className="mt-2 text-2xl font-normal opacity-90">
          <PrismicRichText field={slice.primary.price_copy} />
        </div>
      </div>
    </section>
  );
};

export default Carausel;

type ArrowButtonProps = {
  direction?: "right" | "left";
  label: string;
  onClick: () => void;
};
function ArrowButton({
  label,
  onClick,
  direction = "right",
}: ArrowButtonProps) {
  return (
    <button
      onClick={onClick}
      className="size-12 rounded-full border-2 border-white bg-white/10 p-3 opacity-85 ring-white focus:outline-none focus-visible:opacity-100 focus-visible:ring-4 md:size-16 lg:size-20"
    >
      <ArrowIcon className={clsx(direction === "right" && "-scale-x-100")} />
      <span className="sr-only">{label}</span>
    </button>
  );
}
