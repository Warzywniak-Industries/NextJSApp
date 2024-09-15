"use client";

import React from "react";
import { ProcessedStartup, Startup } from "@/types/Startup";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
        <a href={props.post.uid ? `/posts/${props.post.uid}` : ""}>
        <Card className={`${props.classname} relative group h-full`} style={backgroundStyle}>
            <div className={`${props.post.logo ? "bg-black bg-opacity-50 group-hover:bg-opacity-90 p-4 transition duration-300 ease-in-out h-48" : ""} w-full h-full flex flex-col justify-between rounded-xl`}>

                {/* Title and followers hidden by default, shown on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex flex-col items-stretch h-full">
                    <CardHeader>
                        <CardTitle className="text-white">{props.post.name}</CardTitle>
                        
                            
                        
                    </CardHeader>
                    <CardFooter className="flex flex-row gap-x-2 text-white bottom-0">
                        <FontAwesomeIcon icon={faUsers} />
                        <p className="text-white opacity-50 footertext">{props.post.followers}</p>
                    </CardFooter>
                </div>
            </div>
        </Card>
        </a>
    );
};

export default PostCard;
