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
            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div className="mb-4">
                <button
                    onClick={handleUpdateDescription}
                    className="px-4 py-2 bg-indigo-500 text-white rounded-md shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Generate Description
                </button>
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <textarea
                    id="description"
                    value={description}
                    readOnly
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
        </div>
    );
};