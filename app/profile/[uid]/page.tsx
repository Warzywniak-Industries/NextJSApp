'use client'

import ProfileForUser from "@/components/ProfileForUser";
import { useAuth } from "@/context/AuthContext";

export default function Page({ params }: { params: { uid: string } }) {
    
    const { loading, user, userDataObj } = useAuth()
    
    if(loading)
    {
        return loading
    }
    // Implement infinite scroll
    return (
        <div>
            <ProfileForUser uid={params.uid}/>
        </div>
    );
};