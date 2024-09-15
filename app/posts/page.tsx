"use client";

import React, { useEffect, useState} from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

import { Post } from "@/types/Post";

export default function Page() {
    const [posts, setPosts] = useState<Post[]>([]);

    return (
        <div className="flex flex-col gap-y-4 px-8 md:px-[11.25%]">
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-text semiboldheader2">Browse startups</h2>
                <p className="boldbasetext brightness-60 bg-primary inline-block text-transparent bg-clip-text">Find popular startups matching your interests</p>
            </div>
            <BentoGrid>
                {posts.map((post, index) => (
                    <BentoGridItem key={index}>
                    </BentoGridItem>
                ))}
            </BentoGrid>
        </div>
    );
};