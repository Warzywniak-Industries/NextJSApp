"use client";

import React from "react";
import { Timeline, TimelineEntry } from "@/components/ui/timeline";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LadingPageTimeline() {
    const [email, setEmail] = useState<string>("");
    
    const TimeLineContent: TimelineEntry[] = [
        {
            title: "Create an account",
            content: (
                <div className="flex flex-col gap-y-2 max-w-96 float-left rounded-xl bg-white p-6">
                    <h3 className="semiboldheader4 text-text opacity-70">Register for an account to get started</h3>
                    <div className="flex flex-row gap-x-3">
                        <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                        <Button asChild>
                            <Link href={{ pathname: "/login", query: {email: email}}} className="text-text">Register</Link>
                        </Button>
                    </div>
                </div>
            ),
        },
        {
            title: "Accelerate innovation",
            content: (
                <div className="flex flex-col items-center rounded-xl bg-white p-6">
                    <h3 className="semiboldheader4 opacity-70 max-w-96">Our AI-powered platform increases the efficiency and accuracy of your innovation process, allowing you to stay ahead of the competition.</h3>
                </div>
            ),
        },
        {
            title: "Engage in Conversations",
            content: (
                <div className="flex flex-col max-w-[28rem] opacity-70 float-right rounded-xl bg-white p-6">
                    <h3 className="semiboldheader4">As investors start responding and answer questions or provide additional information about your project</h3>
                </div>),
        }
    ]

    return (
        <div className="flex flex-col w-full justify-center px-8 md:px-[11.25%] mb-12">
            <Timeline data={TimeLineContent}/>
        </div>
    );
};