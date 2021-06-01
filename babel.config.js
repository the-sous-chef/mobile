module.exports = (api) => {
    api.cache(true);

    return {
        presets: ['babel-preset-expo'],
        plugins: [
            ['module:react-native-dotenv', {
                safe: true,
                allowUndefined: true,
            }],
            ['module-resolver', {
                root: ['.'],
                alias: {
                    assets: './assets',
                    js: './src/js',
                },
                extensions: [
                    '.js',
                    '.jsx',
                    '.json',
                    '.ts',
                    '.tsx',
                ],
            }],
        ],
    };
};
