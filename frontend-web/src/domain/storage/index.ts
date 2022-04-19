
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDO7eu3qjh3o_E0UjPlorvmf3xWbCGUfzc",
  authDomain: "domstc-814e0.firebaseapp.com",
  projectId: "domstc-814e0",
  storageBucket: "domstc-814e0.appspot.com",
  messagingSenderId: "576242318273",
  appId: "1:576242318273:web:d5c1438da7f1099a21cd40",
  measurementId: "G-JVME5QT3S9"
};

const firebaseApp = initializeApp(firebaseConfig);

const Storage = getStorage(firebaseApp)
const getRef = (path: string) => {
    return ref(Storage, path);
}

export {
Storage,
getRef
};
