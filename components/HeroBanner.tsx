"use client";
import Image from "next/image";

import { HeroCard } from "@/img";

export default function HeroBanner() {
  return (
    <div className="w-full flex flex-col md:flex-row bg-background self-strech items-center justify-center px-[32px] py-16 gap-y-16 md:px-[11.25%]">
        <div>
            <h1 className="boldheader2 md:boldheader1 shrink-0 text-text">
                Transforming Ideas <br className="visible"/> into <span className="bg-gradient-to-r from-primary to-accent inline-block text-transparent bg-clip-text leading-normal">Reality</span>
            </h1>
        </div>
        <div className="flex md:w-[32%] md:max-w-[432px] md:max-h-[464px]">
          <Image src={HeroCard} alt="HeroCard image banner" className="flex flex-auto width-[316px] height-[348px] animate-waveUpDown delay-0"/>
        </div>
    </div>
  );
}