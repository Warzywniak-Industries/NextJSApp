"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ImageSpacer2 } from "@/img";
import Avatar from "boring-avatars";

const Navbar: React.FC = () => {
    const { user, userDataObj } = useAuth()

    const UserLogged = () => {
        if(!userDataObj) return
        return (
            <div className="flex h-12 items-center">
            <span className="pr-3 text-base whitespace-nowrap">Hi {userDataObj.firstName}</span>
            <div>
                <Avatar name={userDataObj.firstName + userDataObj.lastName} size={40} variant="marble"/>
            </div>
            </div>
        )
        
    }

    return (
        <div className="flex flex-col w-full overflow-x-hidden">
            <nav className="w-full py-2 bg-[#d2e7fa] items-center">
                <div className="flex justify-between w-[80%] mx-auto items-center">
                    <div className="flex gap-6 items-center">
                        <a href="/" className="mr-4 font-extrabold text-2xl">StartupHub</a>
                    </div>
                    <div className="flex gap-6 items-center">
                        <a href="/posts" className="border-2 p-2 rounded-none hover:bg-cyan-100 hover:rounded-xl transition-all ease-in-out duration-1000">
                            <h1>BROWSE</h1>
                        </a>
                        { user ? <UserLogged/> : <a href="/login"  className="font-extralight">Login / Sign Up</a>}
                    </div>
                </div>
            </nav>
            <div className="relative w-[105%] h-16 align-left mt-[-5px]">
                <div 
                className="absolute bottom-0 top-0 w-full h-full object-cover animate-wave1 delay-0 z-[-1] bg-repeat-x"
                style={{backgroundImage: `url(${ImageSpacer2.src})`}}
                >
                </div>
                <div
                className="absolute bottom-0 top-0 w-full h-full object-cover animate-wave2 delay-[-5s] z-[-1] opacity-50 bg-repeat-x"
                style={{backgroundImage: `url(${ImageSpacer2.src})`}}
                >    
                </div>
            </div>
        </div>
    );
};

export default Navbar;