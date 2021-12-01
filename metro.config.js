// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push('obj');
defaultConfig.resolver.assetExts.push('mtl');
defaultConfig.resolver.assetExts.push('vrx');

module.exports = defaultConfig;