'use client'

import { fetchStartups } from '@/NeuralNetwork/fetchStartups'
import React from 'react'
import { useAuth } from './AuthContext'
import { Startup, Weights, IncompleteStartup, ProcessedStartup } from '@/types/Startup'
import { db, storage } from '@/firebase'
import { collection, CollectionReference, DocumentData, doc, setDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface StartupsContextType {
  startups: ProcessedStartup[]
  getStartups: (tolerance: number) => Promise<ProcessedStartup[]>
  postStartup: (startup: IncompleteStartup) => Promise<any>
}

const defaultStartupsContext: StartupsContextType = {
  startups: [],
  getStartups: async () => [],
  postStartup: async () => {},
}

const StartupsContext = React.createContext(defaultStartupsContext)

const defaultPrefereces: Weights = {

  technology: 0.9,
  finances: 0.65,
  philanthropy: 0,
  mobility: 0,
  logistics: 0,
  health: 0,
  education: 0.3,
  entertainment: 0,
  environment: 0,
  security: 0,
}

export function useStartups() {
  return React.useContext(StartupsContext);
};

export default function StartupsProvider(props: { children: any }) {
  const [startups, setStartups] = React.useState<ProcessedStartup[]>([])

  const { user, userDataObj } = useAuth()

// Call the function to populate the startups in Firestore
  async function getStartups(tolerance: number): Promise<ProcessedStartup[]> {
    let prefs;
    if(userDataObj)
    {
      prefs = userDataObj.prefereces
    }
    else{
      prefs = defaultPrefereces
    }
    // Fetch startups from database
    const data = await fetchStartups(prefs)

    console.log(data)

    setStartups(data)
    return data;
  }
  async function postStartup(startup: IncompleteStartup) {
    console.log("TEST")
    function generateSlug(title: string): string {
      return title
          .toLowerCase() // Convert to lowercase
          .trim() // Remove leading and trailing whitespace
          .replace(/[\s\W-]+/g, '-') // Replace spaces and non-word characters with hyphens
          .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
    }

    async function fetchWeights(title:string, description:string, tags: string[]): Promise<Response> {
      return await fetch(`${process.env.NEXT_PUBLIC_OPENAI_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: `{`+
          `"max_tokens": 90,` +
          `"temperature": 0.7,` +
          `"messages": [{"role": "user", "content": "Your role is to asign weights to a given startup: '${title}' with description: '${description}'. The weights have be in the range of 0 to 10. return a json response with the weights for each category. Output should look like this: {technology: 0, finances: 0, philanthropy: 0, mobility: 0, logistics: 0, health: 0, education: 0, entertainment: 0, environment: 0, security: 0}. You have 20 points to distribute between the categories."}]}`,
      });
    }


    async function generateWeights(title:string, description:string, tags: string[]): Promise<Weights> {
      let response = await fetchWeights(title, description, tags);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data2 = await response.json();
      const text = data2.choices[0].message.content;
      const expectedJson = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
      try {
        const parsedJson = JSON.parse(expectedJson);
        return parsedJson;
      } catch (error) {
        console.error('Invalid JSON, retrying...');
        return generateWeights(title, description, tags);
      }
    }
    async function uploadImage(file: File, uid: string): Promise<string> {
      // Check if the file is provided
      if (!file) {
        throw new Error("No file provided");
      }

      // Create a reference to the image file in Cloud Storage
      const storageRef = ref(storage, `startups/${uid}/thumbnails/${generateSlug(file.name)}`);

      // Upload file
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    }

    if (!userDataObj || !user) {
      throw new Error("User not logged in");
    }

    let new_startup: Startup = {
      uid: '',
      name: startup.name,
      description: startup.description,
      logo: '',
      thumbails: [],
      location: startup.location,
      created: new Date(),
      tags: startup.tags,
      website: startup.website,
      followers: startup.followers,
      weights: await generateWeights(startup.name, startup.description, startup.tags),
      target: 0,
      raised: 0,
      authors: [],
      goals: []
    }

    // Generate unique ID for the startup
    new_startup.uid = generateSlug(startup.name);

    // Upload images
    new_startup.logo = await uploadImage(startup.images[0], new_startup.uid);
    for (let i = 1; i < startup.images.length; i++) {
      new_startup.thumbails.push(await uploadImage(startup.images[i], new_startup.uid));
    }

    setDoc(doc(db, 'startups', new_startup.uid), new_startup)
    .then(() => {
      // Update the user's StartupIds
      const updatedUser = { ...userDataObj };
      updatedUser.startupIds.push(new_startup.uid);
      setDoc(doc(db, 'users', user.uid), updatedUser);
    })
    .catch((error) => {
      // Create a new document if it doesn't exist
      if (error.code === 'not-found') {
      setDoc(doc(db, 'startups', new_startup.uid), startup)
      .then(() => {
        // Update the user's StartupIds
        const updatedUser = { ...userDataObj };
        updatedUser.startupIds.push(new_startup.uid);
        setDoc(doc(db, 'users', user.uid), updatedUser);
      })
      .catch((error) => {
        console.error('Error creating new document:', error);
      });
      } else {
      console.error('Error updating document:', error);
      }
    });
  }

  const value: StartupsContextType = {
    startups,
    getStartups,
    postStartup,
  };
  return (
    <StartupsContext.Provider value={value}>
      {props.children}
    </StartupsContext.Provider>
  )
}
