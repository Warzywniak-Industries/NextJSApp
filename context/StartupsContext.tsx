import { fetchStartups } from '@/NeuralNetwork/fetchStartups'
import React from 'react'
import { useAuth } from './AuthContext'
import { Startup, Weights, IncompleteStartup } from '@/types/Startup'
import { db, storage } from '@/firebase'
import { collection, CollectionReference, DocumentData, doc, setDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface StartupsContextType {
  startups: Startup[]
  getStartups: (tolerance: number) => Promise<void>
  postStartup: (startup: IncompleteStartup) => Promise<any>
}

const defaultStartupsContext: StartupsContextType = {
  startups: [],
  getStartups: async () => {},
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


export default function StartupsProvider(props: { children: any }) {
  const [startups, setStartups] = React.useState<Startup[]>([])

  const { user, userDataObj } = useAuth()

// Call the function to populate the startups in Firestore
  async function getStartups(tolerance: number) {
    if (!userDataObj) {
      return
    }
    // Fetch startups from database
    const data = await fetchStartups(userDataObj.prefereces || defaultPrefereces)

    console.log(data)


    //setStartups(data)
  }
  async function postStartup(startup: IncompleteStartup) {
    function generateSlug(title: string): string {
      return title
          .toLowerCase() // Convert to lowercase
          .trim() // Remove leading and trailing whitespace
          .replace(/[\s\W-]+/g, '-') // Replace spaces and non-word characters with hyphens
          .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
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
      website: startup.website,
      followers: startup.followers,
    }

    // Generate unique ID for the startup
    new_startup.uid = generateSlug(startup.name);

    // Upload images
    new_startup.logo = await uploadImage(startup.logo, new_startup.uid);

    setDoc(doc(db, 'startups', new_startup.uid), startup)
    .then(() => {
      // Update the user's StartupIds
      const updatedUser = { ...userDataObj };
      updatedUser.startupIds.push(new_startup.uid);
      setDoc(doc(db, 'users', user.uid), updatedUser);
    });
  }

  getStartups(0.1);
  return (
    <StartupsContext.Provider value={defaultStartupsContext}>
      {props.children}
    </StartupsContext.Provider>
  )
}
