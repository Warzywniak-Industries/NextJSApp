import { PostStates } from "@/constants/Post";

export type PostStatesType = typeof PostStates[number];

export interface PostOverview {
    slug: string;
    title: string;
    description: string;
    state: PostStatesType;
    thumbnail: string;
    followers: number;
}