declare namespace App {
    export type AllowedEnvironments = 'production' | 'development';
    export type Config = App.DefaultConfig & {
        appName: string;
        defaultCulture: string;
        environment: App.AllowedEnvironments;
        deployment: string;
        firebase: App.FirebaseConfig;
        services: {
            recipes: App.ServiceConfig;
        }
    }

    export type Credentials = import('react-native-auth0').Credentials & {
        firebaseCredentials?: import('@firebase/auth-types').OAuthCredential;
    };
    export interface DefaultConfig {
        [key: string]: string | number | boolean;
    }

    export type FirebaseConfig = {
        apiKey: string;
        authDomain: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
        measurementId: string;
    };

    export type ServiceConfig = import('ky').Options & {
        prefixUrl: string;
    }

    export type Theme = Record<string, string>;
}
