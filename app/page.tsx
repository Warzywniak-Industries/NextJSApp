"use client";

import HeroBanner from "@/components/HeroBanner";
import LadingPageTimeline from "@/components/Timeline";
import PostCarousel from "@/components/PostCarousel";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-6">
      <HeroBanner/>
      <LadingPageTimeline/>
      <PostCarousel />
    </div>
  );
}
