"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();
    const slug = searchParams.get('slug');

    useEffect(() => {
        if (slug) {
            // TODO: Fetch post data using the slug
        }
    }, [slug]);

    return (
        <div className="p-4">
        </div>
    );
};