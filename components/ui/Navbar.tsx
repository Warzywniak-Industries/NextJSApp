"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { NavLinks } from "@/constants/Navigation";
import { Menu, Close } from "@/img";
import { useAuth } from "@/context/AuthContext";
import Avatar from "boring-avatars";


const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { user, userDataObj } = useAuth()

    const UserLogged = () => {
        if(!userDataObj) return
        return (
            <div className="flex h-12 items-center">
                <h1 className="pr-3">Hi {userDataObj.firstName}</h1>
                <Avatar name={userDataObj.firstName} className="h-[70%]"/>
            </div>
        )
        
    }

    return (
        <nav className="w-full py-4 bg-[#96c1e9]/30 shadow-text drop-shadow-lg items-center">
            <div className="flex justify-between w-[80%] mx-auto items-center">
                <div className="flex gap-6 items-center">
                    <a href="/" className="mr-4 font-extrabold text-xl">StartupHub</a>
                </div>
                <div className="flex gap-6 items-center">
                    <a href="/posts" className="border-2 p-2 rounded-none hover:bg-cyan-100 hover:rounded-xl transition-all ease-in-out duration-1000">
                        <h1>BROWSE</h1>
                    </a>
                    
                    { user ? <UserLogged/> : <a href="/login"  className="font-extralight">Login / Sign Up</a>}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;