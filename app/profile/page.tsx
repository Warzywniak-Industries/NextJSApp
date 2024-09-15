'use client'

import ProfileForUser from "@/components/ProfileForUser";

export default function Page({ params }: { params: { slug: string } }) {
    

    console.log(params)
    // Implement infinite scroll

    return (
        <div>
            <ProfileForUser/>
        </div>
    );
};