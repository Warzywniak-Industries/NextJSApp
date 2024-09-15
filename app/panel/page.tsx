"use client"

import StartupsProvider from "@/context/StartupsContext";

export default function Page() {
    return (
        <StartupsProvider>
            <div>
                <h1>Page</h1>
            </div>
        </StartupsProvider>
    );
};