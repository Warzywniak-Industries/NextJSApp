"use client"

import React, { useContext, useEffect, useState } from 'react'


import { auth, db } from '@/firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, User } from 'firebase/auth'
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { Weights } from './StartupsContext'
import { pre } from 'framer-motion/client'

interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  uid: string;
  accType: "StartupOwner" | "Company" | "Admin";
  prefereces: Weights;
}

interface AuthContextType {
  user: User | null;
  userDataObj: UserData | null;
  setUserDataObj: (data: UserData) => void;
  userEventTypes: any;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  loading: boolean;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  userDataObj: null,
  setUserDataObj: () => {},
  userEventTypes: {},
  signup: async () => {},
  login: async () => {},
  logout: async () => {},
  loading: false,
};

const AuthContext = React.createContext(defaultAuthContext)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider(props: { children: any }) {

  const [user, setUser] = useState<User | null>(null)
  const [userDataObj, setUserDataObj] = useState<UserData | null>(null)
  const [userEventTypes, setUserEventTypes] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)


  // AUTH HAN
  function signup(email: string, password: string, firstName: string, lastName: string) {
    let uid = '';
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const docRef = doc(db, 'users', user.uid);

        // Set user data in Firestore
        await setDoc(docRef, {
          email,
          firstName,
          lastName,
          uid: user.uid,
          accType: "StartupOwner", 
          prefereces: {
            technology: 0,
            finances: 0,
            philanthropy: 0,
            mobility: 0,
            logistics: 0,
            health: 0,
            education: 0,
            entertainment: 0,
            environment: 0,
            security: 0,
          }
        });
        console.log('User data successfully updated');
      })
      .catch((error) => {
        console.log('Error creating user:', error.code, error.message);
      });
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    setUserDataObj(null)
    setUser(null)

    return auth.signOut()
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      setUser(user);
  
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
  
          if (docSnap.exists()) {
            console.log('Found user data:', docSnap.data());
            setUserDataObj(docSnap.data() as UserData);
          } else {
            console.log('No user data found');
            setUserDataObj(null); // Handle case when no data is found
          }
        } catch (err: any) {
          console.log('Error fetching user data:', err.message);
        }
      } else {
        setUserDataObj(null);
      }
  
      setLoading(false);
    });
  
    return unsubscribe;
  }, []);
  
  useEffect(() => {
    if (user && userDataObj) {
      const fetchUserData = async () => {
        try {
          const docRef = doc(db, 'users', user.uid);
          await setDoc(docRef, userDataObj, { merge: true }); // Use { merge: true } to update only the fields specified
        } catch (err: any) {
          console.log('Error updating user data:', err.message);
        }
      };
  
      fetchUserData();
    }
  }, [user, userDataObj]);
  const value: AuthContextType = {
    user,
    userDataObj,
    setUserDataObj,
    userEventTypes,
    signup,
    login,
    logout,
    loading
  }
  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
}