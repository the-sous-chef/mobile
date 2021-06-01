import firebase from 'firebase/app';

export const useFirebase = (): void => {
    const firebaseConfig = {
        apiKey: 'AIzaSyBT5Epa7dRon4Tj2kUO28pG90KOLgUmaiU',
        authDomain: 'souschef-8f615.firebaseapp.com',
        projectId: 'souschef-8f615',
        storageBucket: 'souschef-8f615.appspot.com',
        messagingSenderId: '228954869678',
        appId: '1:228954869678:web:c191b1530d7ebab2c9823f',
        measurementId: 'G-62M0MZ4BH9',
    };
    // Initialize Firebase

    firebase.initializeApp(firebaseConfig);
    // firebase.analytics();
};
