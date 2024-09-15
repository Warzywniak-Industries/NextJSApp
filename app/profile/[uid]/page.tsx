'use client'

import ProfileForUser from "@/components/ProfileForUser";
import { useAuth } from "@/context/AuthContext";

export default function Page() {
    
    const { loading } = useAuth()
    
    if(loading)
    {
        return loading
    }
    // Implement infinite scroll
    return (
        <div>
            <ProfileForUser/>
        </div>
    );
};