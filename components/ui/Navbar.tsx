"use client";

import React from "react";
import Link from "next/link";

import { NavLinks } from "@/constants/Navigation";

const Navbar: React.FC = () => {
    return (
        <nav className="flex flex-row justify-between w-full px-8 md:px-[11.25%] py-4">
            <p className="semiboldheader3">StartupHUB</p>
            <div className="flex flex-row gap-x-2">
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