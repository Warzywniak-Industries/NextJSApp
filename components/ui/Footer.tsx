import React from "react";

import { FooterLinks } from "@/constants/Navigation";

const Footer: React.FC = () => {
    return (
        <footer className="flex flex-row justify-between w-full px-8 md:px-[11.25%] bg-[#96c1e9]/30 shadow-text drop-shadow-lg py-4 mt-auto">
            <div className="flex flex-col gap-y-2">
                <h2 className="semiboldheader3">Startup<span className="text-accent">HUB</span></h2>
                <p className="footertext">Copyright Warzywniak Games @2024</p>
            </div> 
            {FooterLinks.map((link, index) => (
                <div key={index} className="flex flex-col gap-y-3">
                    <h2 className="semiboldheader3 text-foreground">{link.label}</h2>
                    {link.links.map((sublink, subindex) => (
                        <p key={subindex} className="footertext text-foreground cursor-pointer opacity-70 hover:opacity-100">{sublink.label}</p>
                    ))}
                </div>
            ))}
        </footer>
    );
};

export default Footer;