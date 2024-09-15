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
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { Startup } from "@/context/StartupsContext";
import { PostOverview } from "@/types/Post";

export default function PostCarousel() {
    const [posts, setPosts] = useState<PostOverview[]>([]);

    const startupsCollection = collection(db, 'startups') 
    
    const getPosts = async () => {
        try {
            // Fetch data from Firestore
            const q = query(startupsCollection, orderBy("followers"), limit(6));
            const response = await getDocs(q); // Execute the query
            
            const data = response.docs.map((doc) => doc.data() as Startup).map((item) => {
                const post: PostOverview = {
                    title: item.name || "Untitled",  // Fallback for missing fields
                    description: item.description || "No description available",
                    followers: item.followers || 0,  // Fallback if followers is missing
                    slug: "",
                    state: "Draft",
                    thumbnail: ""
                };
                return post;
            });
            
            // Set the fetched posts in state
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="flex flex-col px-8 md:px-[11.25%] gap-y-6 w-full">
            <div className="flex flex-row justify-between">
                <h2 className="boldheader3">Browse sucessfull startups</h2>
                <Button className="text-text boldbasetext cursor-pointer opacity-70 hover:opacity-100">
                    <Link href="/posts">View all</Link>
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