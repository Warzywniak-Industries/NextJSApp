"use client";

import HeroBanner from "@/components/HeroBanner";
import LadingPageTimeline from "@/components/Timeline";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroBanner/>
      <LadingPageTimeline/>
    </div>
  );
}
