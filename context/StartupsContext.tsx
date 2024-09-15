import { fetchStartups } from '@/NeuralNetwork/fetchStartups'
import React from 'react'
import { useAuth } from './AuthContext'
import { db } from '@/firebase'
import { collection, CollectionReference, DocumentData, doc, setDoc } from 'firebase/firestore'
import { get } from 'http'

export interface Weights
{
    technology: number
    finances: number
    philanthropy: number
    mobility: number
    logistics: number
    health: number
    education: number
    entertainment: number
    environment: number
    security: number
}

export interface WeightedStartup extends Weights {
  uid: string;
  name: string;
  similarity?: number;
}
export interface Startup {
  uid: string
  name: string
  description: string
  logo: string
  website: string
  followers: number
}

interface StartupsContextType {
  startups: Startup[]
  getStartups: (tolerance: number) => Promise<void>
}

const defaultStartupsContext: StartupsContextType = {
  startups: [],
  getStartups: async () => {}
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

  getStartups(0.1)
  return (
    <StartupsContext.Provider value={defaultStartupsContext}>
      {props.children}
    </StartupsContext.Provider>
  )
}
