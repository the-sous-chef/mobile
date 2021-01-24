export default function capitalize(str: string): string {
    if (typeof str !== 'string') {
        throw new Error('Material-UI: `capitalize(string)` expects a string argument.');
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
}
