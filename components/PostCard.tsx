"use client";

import React, { useEffect, useState} from "react";
import { ProcessedStartup, Startup } from "@/types/Startup";
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import "../fontawesome";

interface PostCardProps {
    classname?: string;
    post?: Startup | ProcessedStartup;
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
                <Link href={props.post.uid? `/posts/${props.post.uid}` : ""}><CardTitle>{props.post.name}</CardTitle></Link>
            </CardHeader>
            <CardContent>
                <p className="text-text opacity-70 max-w-full basetext truncate">{props.post.description}</p>
            </CardContent>
            <CardFooter className="flex flex-row gap-x-2">
                <FontAwesomeIcon icon={faUsers} />
                <p className="text-text opacity-50 footertext">{props.post.followers}</p>
            </CardFooter>
        </Card>
    );
};

export default PostCard;