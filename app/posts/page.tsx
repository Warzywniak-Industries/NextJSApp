"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState} from "react";

import StartupsProvider from "@/context/StartupsContext";
import PostCard from "@/components/PostCard";

export default function Page() {
    return (
        <StartupsProvider>
        <div className="flex flex-col gap-y-4 px-8 md:px-[11.25%]">
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-text semiboldheader2">Browse startups</h2>
                <p className="boldbasetext brightness-60 bg-primary inline-block text-transparent bg-clip-text">Find popular startups matching your interests</p>
            </div>
            <div className="flex flex-wrap w-full mx-6 gap-6 justify-center">
                {[1,2,3,4,5,6,7,8].map((post, index) => (
                    <PostCard 
                        key={index} 
                        classname={cn(
                            "max-w-[350px] min-w-[250px] w-full",
                            (index%2) === 0 ? "w-[25%]" : "w-[38%]"
                        )}
                    />
                ))}
            </div>
        </div>
        </StartupsProvider>
    );
};