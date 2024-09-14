"use client";

import React from "react";
import Link from "next/link";

import { NavLinks } from "@/constants/Navigation";

const Navbar: React.FC = () => {
    return (
        <nav className="flex flex-row justify-between w-full px-8 md:px-[11.25%] py-4 bg-[#96c1e9]/30 shadow-text drop-shadow-lg">
            <p className="semiboldheader2">Startup<span className="text-accent">HUB</span></p>
            <div className="flex flex-row gap-x-10">
                {NavLinks.map((link, index) => (
                <Link key={index} href={link.path} className="semiboldheader4 cursor-pointer opacity-70 hover:opacity-100">
                    {link.label}
                </Link>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;