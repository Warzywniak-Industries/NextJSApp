"use client"

import React,{ useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Startup } from "@/types/Startup";
import { useAuth } from "@/context/AuthContext";
import PostCard from "@/components/PostCard";


export default function Page() {
    const [startups, setStartups] = useState<Startup[]>([]);
    const router = useRouter();

    const { userDataObj, fetchUserStartups } = useAuth();

    if(userDataObj) {
        fetchUserStartups(userDataObj).then((data: Startup[]) => {
            setStartups(data);
        });
    }
    else {
        router.push('/login');
    }

    return (
        <div className="flex flex-col">
            {startups.map((startup, index) => (
                <PostCard key={index} post={startup} />
            ))}
        </div>
    );
};