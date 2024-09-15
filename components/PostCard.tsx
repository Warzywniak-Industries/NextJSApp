"use client";

import React from "react";
import { ProcessedStartup, Startup } from "@/types/Startup";
import { Skeleton } from "@/components/ui/skeleton";
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
    if (!props.post || props.post == null) {
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
    }

    const backgroundStyle = props.post.logo
        ? { backgroundImage: `url(${props.post.logo})`, backgroundSize: "cover", backgroundPosition: "center" }
        : {};

    return (
        <Card className={`${props.classname} relative`} style={backgroundStyle}>
            <div className={`${props.post.logo ? "bg-black bg-opacity-50 p-4" : ""} w-full h-full flex flex-col justify-between`}>
                <CardHeader>
                    {!props.post.logo && <img src={props.post.logo} alt={props.post.name} className="h-[125px] w-full object-cover rounded-xl" />}
                    <Link href={props.post.uid ? `/posts/${props.post.uid}` : ""}>
                        <CardTitle className="text-white">{props.post.name}</CardTitle>
                    </Link>
                </CardHeader>
                <CardContent>
                    <p className="text-white opacity-70 basetext">{props.post.description}</p>
                </CardContent>
                <CardFooter className="flex flex-row gap-x-2 text-white">
                    <FontAwesomeIcon icon={faUsers} />
                    <p className="text-white opacity-50 footertext">{props.post.followers}</p>
                </CardFooter>
            </div>
        </Card>
    );
};

export default PostCard;
