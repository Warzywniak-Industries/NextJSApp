"use client";

import { db } from "@/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, User } from 'firebase/auth'
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
export default function Home() {


// Test connection by reading a document

async function testFirestoreConnection() {

  try {

    const docRef = doc(db, 'users', 'users');



    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {

      console.log('Firestore connection successful!');

      console.log('Document data:', docSnapshot.data());

    } else {

      console.log('Document does not exist.');

    }

  } catch (error) {

    console.error('Error connecting to Firestore:', error);

  }

}


testFirestoreConnection();

  return (
    <div className="">
      elo
    </div>
  );
}
