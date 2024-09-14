import { PostStates } from "@/constants/Post";

export type PostStatesType = typeof PostStates[number];

export interface Post {
    slug: string;
    title: string;
    description: string;
    content: string;
    state: PostStatesType;
}

export interface PostOverview {
    slug: string;
    title: string;
    description: string;
    state: PostStatesType;
}