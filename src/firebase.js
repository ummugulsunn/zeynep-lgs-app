// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, setDoc } from "firebase/firestore";

// Kullanıcının Firebase projesinden alınan yapılandırma bilgileri
const firebaseConfig = {
  apiKey: "AIzaSyDkvqAfnw4uaDM8Ek6_YLAzy_eYTi0jY_w",
  authDomain: "zeynom-lgs-takip.firebaseapp.com",
  projectId: "zeynom-lgs-takip",
  storageBucket: "zeynom-lgs-takip.firebasestorage.app",
  messagingSenderId: "958655480047",
  appId: "1:958655480047:web:7ba4ad119fc29f5a029b1a",
  measurementId: "G-PT2KB3P64J"
};

let app, db;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error) {
  console.warn("Firebase henüz yapılandırılmadı. Lütfen firebaseConfig bilgilerini girin.", error);
}

// Zeynep'in verilerini senkronize etmek için basit bir fonksiyon
export const subscribeToProgress = (callback) => {
  if (!db) {
    // Firebase yoksa localStorage fallback
    const localData = localStorage.getItem('zeynep-progress');
    if (localData) callback(JSON.parse(localData));
    return () => {}; // dummy unsubscribe
  }
  
  // 'users' koleksiyonunda 'zeynep' dökümanı
  const docRef = doc(db, "users", "zeynep");
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data());
    } else {
      callback(null);
    }
  });
};

export const saveProgress = async (state) => {
  // Her zaman localStorage'a da yedekleyelim
  localStorage.setItem('zeynep-progress', JSON.stringify(state));
  
  if (!db) return;
  
  try {
    const docRef = doc(db, "users", "zeynep");
    await setDoc(docRef, state, { merge: true });
  } catch (error) {
    console.error("Firebase'e kaydedilirken hata oluştu:", error);
  }
};
