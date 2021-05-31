declare namespace App {
    export type AllowedEnvironments = 'production' | 'development';

    export interface Config {
        appName: string;
        defaultCulture: string;
        services: {
            recipes: App.ServiceConfig;
        };
        ENVIRONMENT: App.AllowedEnvironments;
        DEPLOYMENT: string;
    }

    export interface ServiceConfig {
        baseURL: string;
    }

    export type Theme = Record<string, string>;
}
