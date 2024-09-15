"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const searchParams = useSearchParams();
    const slug = searchParams.get('slug');

    useEffect(() => {
        if (slug) {
            // TODO: Fetch post data using the slug
        }
    }, [slug]);

    const generateDescription = async (title: string) => {
        const response = await fetch('https://ethics-lopez-determination-jade.trycloudflare.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: `{"messages": [{"role": "user", "content": "${title}"}]}`,
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data.choices[0].message.content);
        return data.choices[0].message.content;
    };

    const handleUpdateDescription = async () => {
        const desc = await generateDescription(title);
        setDescription(desc);
    };

    return (
        <div className="p-4">
        </div>
    );
};