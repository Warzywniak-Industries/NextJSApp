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
  thumbails: string[]
  website: string
  followers: number
}
export interface IncompleteStartup {
  name: string
  description: string
  logo: File
  thumbails: File[]
  website: string
  followers: number
}