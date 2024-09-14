"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { NavLinks } from "@/constants/Navigation";
import { Menu, Close } from "@/img";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <nav className="flex flex-row justify-between w-full px-8 md:px-[11.25%] py-4 bg-[#96c1e9]/30 shadow-text drop-shadow-lg">
            <p className="semiboldheader2">Startup<span className="text-accent">HUB</span></p>
            <div className="hidden md:flex flex-row gap-x-10">
                {NavLinks.map((link, index) => (
                <Link key={index} href={link.path} className="semiboldheader4 cursor-pointer opacity-70 hover:opacity-100">
                    {link.label}
                </Link>
                ))}
            </div>
            <div className="flex md:hidden flex-col bottom-8 top-12 justify-end items-center align-middle">
                <Image src={isOpen? Close : Menu} alt="Menu icon image" onClick={() => setIsOpen(!isOpen)} className="w-[28px] h-[28px] object-contain cursor-pointer"/>
                {isOpen && (
                <div className="flex flex-col absolute top-10 right-0 gap-y-4 bg-primary m-8 p-4 rounded-md">
                    {NavLinks.map((link, index) => (
                    <Link key={index} href={link.path} className="semiboldheader3 cursor-pointer opacity-70 hover:opacity-100">
                        {link.label}
                    </Link>
                    ))}
                </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;