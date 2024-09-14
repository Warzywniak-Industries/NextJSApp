"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Page() {
    const router = useRouter();
    const { slug } = router.query;

    const [post, setPost] = useState(null);

    useEffect(() => {
        // TODO: Fetch post data
    }, [post]);
    
    return(
        <div>
            elo
        </div>
    );
};