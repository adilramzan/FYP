const { withAndroidManifest } = require('@expo/config-plugins');

module.exports = function withSmsRetriever(config) {
  return withAndroidManifest(config, async (config) => {
    const androidManifest = config.modResults;
    
    // Ensure that the permissions are being added correctly
    if (!androidManifest.manifest['uses-permission']) {
      androidManifest.manifest['uses-permission'] = [];
    }
    
    // Add required permissions
    androidManifest.manifest['uses-permission'].push(
      { $: { 'android:name': 'android.permission.RECEIVE_SMS' } },
      { $: { 'android:name': 'android.permission.READ_SMS' } }
    );

    return config;
  });
};
