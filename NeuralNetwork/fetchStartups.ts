
import { db } from "@/firebase";
import { ProcessedStartup, Startup, Weights } from "@/types/Startup";
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


export async function fetchStartups(userWeights: Weights): Promise<ProcessedStartup[]> {
    const startupsCollection = collection(db, 'startups') as CollectionReference<DocumentData>;
    console.log("Triggered")
    const userMagnitude = magnitude(userWeights);

    try {
        const startupsSnapshot = await getDocs(startupsCollection);
        const startups: ProcessedStartup[] = startupsSnapshot.docs.map(doc => {
            const data = doc.data() as ProcessedStartup;
            if (data.weights == null || userWeights ==  null) return data;

            data.similarity = cosineSimilarity(userWeights, data.weights, userMagnitude)
            return data
        });

        // Sort startups by similarity in descending order
        startups.sort((a, b) => (b.similarity ?? 0) - (a.similarity ?? 0));

        return startups;
    } catch (error) {
        console.error('Error fetching WeightedStartups:', error);
        return [];
    }
}
