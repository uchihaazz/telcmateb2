import { db } from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export async function testFirebaseConnection() {
  try {
    // Test writing to Firestore
    const testCollection = collection(db, 'test');
    const testDoc = await addDoc(testCollection, {
      message: 'Test connection',
      timestamp: new Date().toISOString()
    });
    console.log('Successfully wrote test document:', testDoc.id);

    // Test reading from Firestore
    const querySnapshot = await getDocs(testCollection);
    console.log('Successfully read documents:', querySnapshot.size);

    return {
      success: true,
      message: 'Firebase connection successful',
      testDocId: testDoc.id
    };
  } catch (error) {
    console.error('Firebase connection test failed:', error);
    return {
      success: false,
      message: 'Firebase connection failed',
      error: error
    };
  }
} 