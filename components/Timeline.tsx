"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { useState } from "react";
import { TimelineContentType } from "@/types/Timeline"; 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LadingPageTimeline() {
    const [email, setEmail] = useState<string>("");
    
    const TimeLineContent: TimelineContentType = [
        {
            title: "Create an acoount",
            content: (
                <div className="flex flex-col gap-y-2 max-w-72">
                    <h3 className="boldbasetext text-text opacity-70">"Register for an account to get started"</h3>
                    <div className="flex flex-row gap-x-3">
                        <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                        <Button asChild>
                            <Link href={{ pathname: "/login", query: {email: email}}} className="text-text">Register</Link>
                        </Button>
                    </div>
                </div>
            )
        },
        {
            title: "Accelerate innovation",
            content: (
                <div className="flex flex-col">
                    <h3 className="boldbasetext opacity-70">Our AI-powered platform increases the ...</h3>
                </div>
            )
        },
        {
            title: "Engage in Conversations",
            content: (
                <div className="flex flex-col max-w-96 opacity-70">
                    <h3 className="boldbasetext">As investors start responding, engage in direct messaging within the app and answer questions and provide additional information as needed</h3>
                </div>
            )
        }
    ]

    return (
        <div className="flex flex-col w-full justify-center px-8 md:px-[11.25%]">
            <Timeline data={TimeLineContent}/>
        </div>
    );
};