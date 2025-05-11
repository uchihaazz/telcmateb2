import { db } from './firebase';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where
} from 'firebase/firestore';

export interface Exercise {
  id: string;
  type: 'reading' | 'listening' | 'grammar' | 'writing';
  part: string;
  title: string;
  description: string;
  timeLimit: number;
  texts?: Array<{
    content: string;
    correctTitle?: string;
  }>;
  titles?: string[];
  questions?: string[];
  options?: string[][];
  correctAnswers?: number[];
  audioUrl?: string;
  transcript?: string;
  textWithBlanks?: Array<{
    type: 'text' | 'blank';
    content: string;
  }>;
  blanks?: Array<{
    options: string[];
  }>;
  wordBank?: string[];
  grammarSentences?: string[];
  correctSentences?: string[];
  errorTypes?: string[];
  correctTransformations?: string[];
  prompt?: string;
  evaluationCriteria?: string[];
}

const EXERCISES_COLLECTION = 'exercises';

// Get all exercises
export async function getAllExercises(): Promise<Exercise[]> {
  const querySnapshot = await getDocs(collection(db, EXERCISES_COLLECTION));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Exercise[];
}

// Get exercises by type
export async function getExercisesByType(type: Exercise['type']): Promise<Exercise[]> {
  const q = query(collection(db, EXERCISES_COLLECTION), where('type', '==', type));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Exercise[];
}

// Get exercises by type and part
export async function getExercisesByTypeAndPart(type: Exercise['type'], part: string): Promise<Exercise[]> {
  const q = query(
    collection(db, EXERCISES_COLLECTION),
    where('type', '==', type),
    where('part', '==', part)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Exercise[];
}

// Get exercise by ID
export async function getExerciseById(id: string): Promise<Exercise | null> {
  const docRef = doc(db, EXERCISES_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data()
    } as Exercise;
  }
  return null;
}

// Add a new exercise
export async function addExercise(exercise: Omit<Exercise, 'id'>): Promise<Exercise> {
  const docRef = await addDoc(collection(db, EXERCISES_COLLECTION), exercise);
  return {
    id: docRef.id,
    ...exercise
  } as Exercise;
}

// Update an existing exercise
export async function updateExercise(id: string, updatedExercise: Partial<Exercise>): Promise<Exercise> {
  const docRef = doc(db, EXERCISES_COLLECTION, id);
  await updateDoc(docRef, updatedExercise);
  return {
    id,
    ...updatedExercise
  } as Exercise;
}

// Delete an exercise
export async function deleteExercise(id: string): Promise<boolean> {
  const docRef = doc(db, EXERCISES_COLLECTION, id);
  await deleteDoc(docRef);
  return true;
} 