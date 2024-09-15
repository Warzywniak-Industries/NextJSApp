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

export interface Startup {
  uid: string
  name: string
  description: string
  logo: string
  thumbails: string[]
  tags: string[]
  website: string
  followers: number
  weights?: Weights
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
}