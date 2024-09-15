"use client";

import React, { useEffect, useState} from "react";
import { PostOverview } from "@/types/Post";
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface PostCardProps {
    post?: PostOverview;
    index?: number;
}

const PostCard: React.FC<PostCardProps> = (props: PostCardProps) => {
    if (!props.post || props.post == null){
        return (
            <Card className={`${props.className} max-w-[350px]`}>
                <CardHeader >
                    <Skeleton className="h-[125px] w-full rounded-xl" />
                    <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-4 w-full" />
                </CardContent>
                <CardFooter>
                    <Skeleton className="h-2 w-full" />
                </CardFooter>
            </Card>
        );
    };

    return (
        <Card className={props.className}>
            <CardHeader>
                <img src={props.post.thumbnail}/>
                <CardTitle>{props.post.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-text opacity-70 basetext">{props.post.description}</p>
            </CardContent>
            <CardFooter>
                <p className="text-text opacity-50 footertext">cxzxcz</p>
            </CardFooter>
        </Card>
    );
};

export default PostCard;