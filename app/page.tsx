"use client";




import HeroBanner from "@/components/HeroBanner";
import LadingPageTimeline from "@/components/Timeline";
import PostCarousel from "@/components/PostCarousel";
import { db } from "@/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, User } from 'firebase/auth'
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { Creators } from "@/components/Creators";
import FaqSection from "@/components/FaqSection";
import Avatar from 'boring-avatars';

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
    <div className="flex flex-col gap-y-12 overflow-x-hidden w-full">
      <HeroBanner/>
      <LadingPageTimeline/>
      <PostCarousel/>
      <FaqSection/>
      <Creators/>
    </div>
  );
}
