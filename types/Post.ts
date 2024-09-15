import { PostStates } from "@/constants/Post";

export type PostStatesType = typeof PostStates[number];

export interface Post {
    slug: string;
    thumbnail: string;
    title: string;
    description: string;
    content: string;
    state: PostStatesType;
    date: string;
}

export interface PostOverview {
    slug: string;
    title: string;
    description: string;
    state: PostStatesType;
}