const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);
const workletsEntry = require.resolve("react-native-worklets/lib/module/index.js");

config.resolver.resolveRequest = (context, moduleName, platform) => {
  return context.resolveRequest(
    context,
    moduleName === "react-native-worklets" ? workletsEntry : moduleName,
    platform
  );
};

module.exports = config;
