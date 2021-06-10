const { getDefaultConfig } = require('@expo/metro-config');
const MetroConfig = require('@ui-kitten/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.transformer.minifierPath = 'metro-minify-terser';
defaultConfig.transformer.minifierConfig = {
    // Terser options...
};

const evaConfig = {
    evaPackage: '@eva-design/eva',
    // Optional, but may be useful when using mapping customization feature.
    // customMappingPath: './custom-mapping.json',
};

module.exports = MetroConfig.create(evaConfig, {
    ...defaultConfig,
});
