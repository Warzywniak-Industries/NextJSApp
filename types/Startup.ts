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
export interface StartupGoal
{
  uid: string
  title: string
  raised: string
  rewards: string[]
}
export interface Startup {
  uid: string
  name: string
  description: string
  logo: string
  location: string
  created: Date
  thumbails: string[]
  tags: string[]
  website: string
  followers: number
  weights?: Weights
  target: number
  raised: number
  authors: string[]
  goals: StartupGoal[]
}

export interface ProcessedStartup extends Startup
{
  similarity: number
}

export interface IncompleteStartup {
  name: string
  description: string
  images: File[]
  tags: string[]
  website: string
  followers: number
  location: string
}