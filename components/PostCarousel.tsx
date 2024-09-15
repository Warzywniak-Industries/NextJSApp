"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import PostCard from "@/components/PostCard";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function PostCarousel() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch posts from API
        console.log(posts);
    }, []);

    return (
        <div className="flex flex-col px-8 md:px-[11.25%] gap-y-6 w-full">
            <div className="flex flex-row justify-between">
                <h2 className="boldheader3">Browse sucessfull startups</h2>
                <Button className="text-text boldbasetext cursor-pointer opacity-70 hover:opacity-100">
                    <Link href="/browse">View all</Link>
                </Button>
            </div>
            <div className="flex flex-row justify-center">
                <Carousel className="w-[75%]">
                <CarouselContent className="w-full">
                    {posts.length===0 && [1,2,3,4,5,6,7].map((_, index) => (
                    <CarouselItem key={index} className="max-w-[350px]">
                        <PostCard />
                    </CarouselItem>
                    ))}
                    {!(posts.length===0) && posts.map((post, index) => (
                    <CarouselItem key={index} className="max-w-[350px]">
                        <PostCard post={post} />
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
                </Carousel>
            </div>
        </div>
    );
};