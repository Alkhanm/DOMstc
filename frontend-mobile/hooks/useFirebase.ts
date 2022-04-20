import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadString } from "firebase/storage";

export default function useFirebase() {
    // https://firebase.google.com/docs/web/setup#available-libraries
    const firebaseConfig = {
        apiKey: "AIzaSyDO7eu3qjh3o_E0UjPlorvmf3xWbCGUfzc",
        authDomain: "domstc-814e0.firebaseapp.com",
        projectId: "domstc-814e0",
        storageBucket: "domstc-814e0.appspot.com",
        messagingSenderId: "576242318273",
        appId: "1:576242318273:web:5f731b4f447dc62b21cd40",
        measurementId: "G-CNNDQKJJCZ"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    return app;
}

export function useStorage() {
    const imgURL = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fsun%2F&psig=AOvVaw1YtCdg9siWaAlsOANIOV3G&ust=1641848952761000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCOjR4Y7KpfUCFQAAAAAdAAAAABAD"
    const storage = getStorage(useFirebase())
    const storageRef = ref(storage, "/imagens/")
    const uploadTask = uploadString(storageRef, imgURL)
    uploadTask.then(({metadata}) => {
        console.log(metadata)
    })
    return uploadTask;
}