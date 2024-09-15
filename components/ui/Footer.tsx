import React from "react";

import { FooterLinks } from "@/constants/Navigation";
import { ImageSpacer1 } from "@/img";

const Footer: React.FC = () => {
    return (
        <div className="flex flex-col overflow-x-hidden mt-auto ">
            <div className="relative w-[105%] h-16 align-left mb-[-5px]">
                <div 
                className="absolute bottom-0 top-0 w-full h-full object-cover animate-wave1 delay-0 z-[-1] bg-repeat-x"
                style={{backgroundImage: `url(${ImageSpacer1.src})`}}
                >
                </div>
                <div
                className="absolute bottom-0 top-0 w-full h-full object-cover animate-wave2 delay-[-5s] z-[-1] opacity-50 bg-repeat-x"
                style={{backgroundImage: `url(${ImageSpacer1.src})`}}
                >    
                </div>
            </div>
            <footer className="flex flex-col md:flex-row items-center justify-between w-full px-8 md:px-[11.25%] bg-[#d2e7fa] shadow-text drop-shadow-lg pt-4 pb-8 gap-y-6">
                <div className="flex flex-col gap-y-2">
                    <a href="/" className="mr-4 font-extrabold text-2xl">StartupHub</a>
                    <p className="basetext md:footertext">Copyright Warzywniak Industries @2024</p>
                </div> 
                {FooterLinks.map((link, index) => (
                    <div key={index} className="flex flex-col gap-y-3">
                        <h2 className="semiboldheader3 text-foreground">{link.label}</h2>
                        <div className="flex flex-col gap-y-2">
                        {link.links.map((sublink, subindex) => (
                            <p key={subindex} className="basetext md:footertext text-foreground cursor-pointer opacity-70 hover:opacity-100">{sublink.label}</p>
                        ))}
                        </div>
                    </div>
                ))}
            </footer>
        </div>
    );
};

export default Footer;