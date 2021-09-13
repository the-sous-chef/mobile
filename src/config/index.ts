import Config from 'react-native-config';

export const config = {
    deployment: Config.DEPLOYMENT,
    environment: Config.ENVIRONMENT,
    firebase: {
        apiKey: Config.FIREBASE_API_KEY,
        authDomain: Config.FIREBASE_AUTH_DOMAIN,
        projectId: Config.FIREBASE_PROJECT_ID,
        storageBucket: Config.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID,
        appId: Config.FIREBASE_APP_ID,
        measurementId: Config.FIREBASE_MEASUREMENT_ID,
    },
} as App.Config;
