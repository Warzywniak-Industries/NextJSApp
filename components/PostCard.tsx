"use client";

import React, { useEffect, useState} from "react";
import { Startup } from "@/types/Startup";
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface PostCardProps {
    classname?: string;
    post?: Startup;
    index?: number;
}

const PostCard: React.FC<PostCardProps> = (props: PostCardProps) => {
    if (!props.post || props.post == null){
        return (
            <Card className={`${props.classname} max-w-[350px]`}>
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
        <Card className={props.classname}>
            <CardHeader>
                <img src={props.post.logo}/>
                <CardTitle>{props.post.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-text opacity-70 basetext">{props.post.description}</p>
            </CardContent>
            <CardFooter>
                <p className="text-text opacity-50 footertext">{props.post.followers}</p>
            </CardFooter>
        </Card>
    );
};

export default PostCard;