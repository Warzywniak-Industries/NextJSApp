import React, { useEffect, useState } from 'react';
import { useAuth, UserData } from '@/context/AuthContext';
import Avatar from 'boring-avatars';
import { useParams } from 'next/navigation';
import { db } from '@/firebase';
import { collection, doc, getDoc } from 'firebase/firestore';

const ProfileForUser = () => {
    const { uid } = useParams();  // Get the user ID from the URL params
    const { userDataObj } = useAuth();  // Get the current user's data from context
    const [data, setData] = useState<UserData | null>(null);

    useEffect(() => {
        const fetchUserDataById = async (userId: string) => {
            try {
                const userDoc = await getDoc(doc(collection(db, 'users'), userId));
                if (userDoc.exists()) {
                    return userDoc.data() as UserData;
                } else {
                    console.log('No such document!');
                    return null;
                }
            } catch (error) {
                console.error('Error getting document:', error);
                return null;
            }
        };

        if (uid) {
            fetchUserDataById(uid.toString()).then(fetchedData => {
                setData(fetchedData || userDataObj);
            });
        } else {
            setData(userDataObj);
        }
    }, [uid, userDataObj]);

    if (data === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <Avatar name={data.firstName + data.lastName} size={120} variant="marble"/>
            <p className='p-4 font-extralight text-2xl'>{data.firstName} {data.lastName}</p>
        </div>
    );
};

export default ProfileForUser;
