"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
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
                    {posts.length===0 && [1,2,3,4,5].map((_, index) => (
                    <CarouselItem key={index} className="max-w-[350px]">
                        <Card>
                            <CardHeader>
                                <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                                <Skeleton className="h-4 w-[250px]" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-4 w-[250px]" />
                            </CardContent>
                            <CardFooter>
                                <Skeleton className="h-2 w-[250px]" />
                            </CardFooter>
                        </Card>
                    </CarouselItem>
                    ))}
                    {/* {!(posts.length===0) && posts.map((post, index) => (
                    <CarouselItem key={index} className="max-w-[350px]">
                        <Card>
                            <CardHeader>
                                <img src={post.thumbnail}/>
                                <CardTitle>{post.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-text opacity-70 basetext">{post.description}</p>
                            </CardContent>
                            <CardFooter>
                                <p className="text-text opacity-50 footertext">{post.date}</p>
                            </CardFooter>
                        </Card>
                    </CarouselItem>
                    ))} */}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
                </Carousel>
            </div>
        </div>
    );
};