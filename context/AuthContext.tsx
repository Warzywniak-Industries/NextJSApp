"use client"

import React, { useContext, useEffect, useState } from 'react'


import { auth, db } from '@/firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, User } from 'firebase/auth'
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'

interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  uid: string;
  accType: "StartupOwner" | "Company" | "Admin"
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
      .then((userCredential) => {
        const user = userCredential.user;
        const docRef = doc(db, 'users', user.uid);
  
        uid = user.uid;
        return setDoc(docRef, {
          email,
          firstName,
          lastName,
          uid: user.uid,
        });
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
      try {
        setLoading(true);
        setUser(user);
        if (!user) {
          console.log('User is not logged in');
          return;
        }
  
        // if user is logged in, get user data from Firestore
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        let firebaseData = {};
        if (docSnap.exists()) {
          console.log('Found user data:');
          const data = docSnap.data();
        }
        setUserDataObj(firebaseData as UserData);
        console.log(userDataObj);

        setUserEventTypes(userEventTypes);
      } catch (err: any) {
        console.log(err.message);
      } finally {
        setLoading(false);
        console.log('Loading done');
        console.log(userDataObj);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log('User data changed:', userDataObj);
    const fetchUserData = async () => {
      try {
        if (!user) {
          return
        }
        const docRef = doc(db, 'users', user.uid)
        setDoc(docRef, userDataObj)
      }
      catch (err: any) {
        console.log(err.message)
      }
    }
    fetchUserData()
  }, [userDataObj])
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