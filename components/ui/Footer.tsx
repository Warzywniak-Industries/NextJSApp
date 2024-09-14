import React from "react";

import { FooterLinks } from "@/constants/Navigation";

const Footer: React.FC = () => {
    return (
        <footer className="flex flex-row justify-between w-full px-8 md:px-[11.25%] bg-foreground_secondary py-4 mt-auto">
            <div className="flex flex-col gap-y-2">
                <h2 className="semiboldheader3">Startup<span className="text-primary">HUB</span></h2>
                <p className="footertext">Copyright Warzywniak Games @2024</p>
            </div> 
            {FooterLinks.map((link, index) => (
                <div className="flex flex-col gap-y-3">
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