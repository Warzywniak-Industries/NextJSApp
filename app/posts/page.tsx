"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState} from "react";

import { useAuth } from "@/context/AuthContext";
import StartupsProvider, { useStartups } from "@/context/StartupsContext";
import PostCard from "@/components/PostCard";
import { ProcessedStartup, Startup } from "@/types/Startup";
import StartupsList from "@/components/StartupsList";

export default function Page() {
    

    // Implement infinite scroll

    return (
        <StartupsProvider>
            <StartupsList/>
        </StartupsProvider>
    );
};