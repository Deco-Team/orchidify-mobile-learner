export default {
  name: 'Orchidify',
  slug: 'orchidify-mobile-learner',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/logo.png',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff'
    },
    package: 'com.sukute1712.orchidifymobilelearner',
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON
  },
  plugins: [
    'expo-router',
    'expo-font',
    'expo-image-picker',
    'expo-av',
    '@react-native-firebase/app',
    '@react-native-firebase/auth',
    '@react-native-firebase/messaging'
  ],
  experiments: {
    typedRoutes: true
  },
  extra: {
    router: {
      origin: false
    },
    eas: {
      projectId: '75d3dc90-36ee-4b24-94ad-674d619198a0'
    }
  },
  owner: 'sukute1712'
}
