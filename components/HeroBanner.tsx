"use client";
import { HeroCard } from "@/img";

export default function HeroBanner() {
  return (
    <div className="w-full flex flex-col sm:flex-row bg-background self-strech items-center justify-center px-[32px] py-16 gap-y-12 md:px-[11.25%]">
        <div>
            <h1 className="boldheader1 shrink-0 text-text">
                "Transforming Ideas <br className="visible md:hidden"/> into Reality"
            </h1>
        </div>
        <div className="flex md:w-[32%] md:max-w-[432px] md:max-h-[464px]">
          <img src={HeroCard} alt="HeroCard image banner" className="flex flex-auto width-[316px] height-[348px] animate-waveUpDown delay-0"/>
        </div>
    </div>
  );
}