# Welcome to your Expo App 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).  
Use this README to quickly get set up, run in development mode, and build your app for Android/iOS.

---

## 📦 Install Dependencies

1. Clone or download this repository.
2. Navigate to the project directory in your terminal.
3. Run:
   npm install

---

## 🚀 Run in Development Mode

1. Start the Expo development server:
   npx expo start
2. In the terminal output, choose how you want to open the app:
   - Android emulator
   - iOS simulator
   - Physical device via QR code (using Expo Go)
   - [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
   - [Expo Go](https://expo.dev/go)

You can begin editing files in the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction/) by default.

---

## 🏗 Building for Production

### Android
To create a standalone Android APK or AAB, use one of the following:

- **Legacy Expo Build (if supported)**:
  expo build:android
- **EAS Build (recommended)**:
  eas build -p android

**Note**: You may need to configure your project with EAS by running eas build:configure.

### iOS
To create a standalone iOS build, use one of the following:

- **Legacy Expo Build (if supported)**:
  expo build:ios
- **EAS Build (recommended)**:
  eas build -p ios

**Note**: Building for iOS typically requires an Apple Developer account and additional configuration.

---

## 🔄 Resetting the Project

To get a fresh starting point while preserving the original example, run:

npm run reset-project

This will:
- Move the current starter code to an **app-example** directory.
- Create a new blank **app** directory to start developing from scratch.

---

## 🔎 Learn More

For additional documentation and resources, check out:

- **[Expo Documentation](https://docs.expo.dev/)**: In-depth guides, tutorials, and more.
- **[Learn Expo Tutorial](https://docs.expo.dev/tutorial/introduction/)**: Step-by-step instructions on building cross-platform apps.

---

## 💬 Community

Connect with the Expo community:

- **[Expo on GitHub](https://github.com/expo/expo)**
- **[Expo Discord](https://chat.expo.dev)**
