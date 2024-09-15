"use client";
import React from "react";
import { AnimatedTooltip } from "./ui/animated-tooltip";

import { Artur, Kacper, Wojciech } from "@/img";

const people = [
  {
    id: 1,
    name: "Artur Niemiec",
    designation: "Devops",
    image:
      Artur.src,
  },
  {
    id: 2,
    name: "Kacper Baum-Azbum",
    designation: "Frontend Developer",
    image:
      Kacper.src,
  },
  {
    id: 3,
    name: "Wojciech Zawistowski",
    designation: "Frontend Developer",
    image:
      Wojciech.src,
  },
];
 
export function Creators() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}