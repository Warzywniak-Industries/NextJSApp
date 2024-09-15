import { Weights, WeightedStartup } from "@/context/StartupsContext";
import { db } from "@/firebase";
import { collection, getDocs, CollectionReference, DocumentData, query, where, getDoc } from "firebase/firestore";

function dotProduct(A: Weights, B: Weights): number {
    if (Object.keys(A).length === 0 || A == null) return 0;
    return Object.keys(A).reduce((sum, key) => sum + (A[key as keyof Weights] * B[key as keyof Weights]), 0);
}

function magnitude(vector: Weights): number {
    if (vector == null || Object.keys(vector).length === 0) return 0;
    return Math.sqrt(Object.keys(vector).reduce((sum, key) => sum + Math.pow(vector[key as keyof Weights], 2), 0));
}

function cosineSimilarity(A: Weights, B: Weights, userMagnitude: number): number {
    const dotProd = dotProduct(A, B);
    const magnitudeB = magnitude(B);
    return dotProd / (userMagnitude * magnitudeB);
}


export async function fetchStartups(userWeights: Weights): Promise<WeightedStartup[]> {
    const startupsCollection = collection(db, 'weightedStartups') as CollectionReference<DocumentData>;
    const userMagnitude = magnitude(userWeights);

    try {
        const startupsSnapshot = await getDocs(startupsCollection);
        const startups: WeightedStartup[] = startupsSnapshot.docs.map(doc => {
            const data = doc.data() as Weights;
            
            const startupWeights: Weights = {
                technology: data.technology ?? 0,
                finances: data.finances ?? 0,
                philanthropy: data.philanthropy ?? 0,
                mobility: data.mobility ?? 0,
                logistics: data.logistics ?? 0,
                health: data.health ?? 0,
                education: data.education ?? 0,
                entertainment: data.entertainment ?? 0,
                environment: data.environment ?? 0,
                security: data.security ?? 0,
            };
        
            return {
                name: "", // Add the missing properties
                technology: startupWeights.technology,
                finances: startupWeights.finances,
                philanthropy: startupWeights.philanthropy,
                mobility: startupWeights.mobility,
                logistics: startupWeights.logistics,
                health: startupWeights.health,
                education: startupWeights.education,
                entertainment: startupWeights.entertainment,
                environment: startupWeights.environment,
                security: startupWeights.security,
                uid: doc.id,
                weights: startupWeights,
                similarity: cosineSimilarity(userWeights, startupWeights, userMagnitude)
            };
        });

        // Sort startups by similarity in descending order
        startups.sort((a, b) => (b.similarity ?? 0) - (a.similarity ?? 0));

        return startups;
    } catch (error) {
        console.error('Error fetching WeightedStartups:', error);
        return [];
    }
}
