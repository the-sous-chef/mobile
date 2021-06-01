declare namespace App {
    export type AllowedEnvironments = 'production' | 'development';
    export interface Config {
        appName: string;
        defaultCulture: string;
        services: {
            recipes: App.ServiceConfig;
        }
        environment: App.AllowedEnvironments;
        deployment: string;
    }

    export interface DefaultConfig {
        [key: string]: string | number | boolean;
    }

    export interface ServiceConfig {
        baseURL: string;
    }

    export type Theme = Record<string, string>;
}
