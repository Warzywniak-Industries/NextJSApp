'use client'
import { cn } from "@/lib/utils";
import React, { useEffect, useState} from "react";

import { useAuth } from "@/context/AuthContext";
import StartupsProvider, { useStartups } from "@/context/StartupsContext";
import PostCard from "@/components/PostCard";
import { ProcessedStartup, Startup } from "@/types/Startup";
export default function StartupsList() {
    const [loading, setLoading] = useState<boolean>(true);
    const [scrollTop, setScrollTop] = useState<number>(0);

    const [orderedStartups, setOrderedStartups] = useState<ProcessedStartup[]>()

    const { user, userDataObj } = useAuth();
    const { startups, getStartups } = useStartups();

    useEffect(() => {
        const loadInitialStartups = async () => {
            setLoading(true);
            setOrderedStartups(await getStartups(0.5));
            setLoading(false);
            console.log("Startups loaded");
            console.log(orderedStartups)
        }
        if(user && userDataObj) {
            loadInitialStartups()
        }

    }, [userDataObj]);
  return (
    <div className="flex flex-col gap-y-4 px-8 md:px-[11.25%]">
        <div className="flex flex-row justify-between items-center">
            <h2 className="text-text semiboldheader2">Browse startups</h2>
            <p className="boldbasetext brightness-60 bg-primary inline-block text-transparent bg-clip-text">Find popular startups matching your interests</p>
        </div>
        <div className="flex flex-wrap w-full mx-6 gap-6">
            {startups.map((startup, index) => (
                <PostCard 
                    key={index} 
                    post={startup} 
                    classname={cn(
                        "max-w-[350px] min-w-[250px] w-full",
                        (index%2) === 0 ? "w-[25%] flex-grow" : "w-[38%]"
                    )}
                />
            ))}
            {/* Generate an array of a few loading startupps */}
            {loading && [1,2,3,4,5,6,7,8].map((post, index) => (
                <PostCard 
                    key={index} 
                    classname={cn(
                        "max-w-[350px] min-w-[250px] w-full",
                        (index%2) === 0 ? "w-[25%] flex-grow" : "w-[38%]"
                    )}
                />
            ))}
        </div>
    </div>
  )
}
