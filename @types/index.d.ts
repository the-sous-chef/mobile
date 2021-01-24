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

    /**
 * Generate a set of string literal types with the given default record `T` and
 * override record `U`.
 *
 * If the property value was `true`, the property key will be added to the
 * string union.
 *
 * @internal
 */
    export type OverridableStringUnion<T, U = {}> = GenerateStringUnion<Overwrite<T, U>>;

    /**
     * Like `T & U`, but using the value types from `U` where their properties overlap.
     *
     * @internal
     */
    export type Overwrite<T, U> = Omit<T, keyof U> & U;

    type GenerateStringUnion<T> = Extract<
    {
        [Key in keyof T]: true extends T[Key] ? Key : never;
    }[keyof T],
    string
    >;
}
