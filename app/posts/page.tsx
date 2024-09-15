"use client";

import React from "react";
import StartupsProvider from "@/context/StartupsContext";
import StartupsList from "@/components/StartupsList";

export default function Page() {
    

    // Implement infinite scroll

    return (
        <StartupsProvider>
            <StartupsList/>
        </StartupsProvider>
    );
};