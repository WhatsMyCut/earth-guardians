# Earth Guardians Mobile (earth-guardians)

Expo React-Native development IDE for EarthGuardians.org

## Software Requirements

For development, it is recommended you have [Node/NPM](https://www.npmjs.com/), [Yarn](https://yarnpkg.com/en/), [XCode](https://developer.apple.com/xcode/) and [Android Studio](https://developer.android.com/studio) for  for iOS andAndroid development, respectively.

## Quick Start

Install the Expo.io CLI tools globally:

```
npm install -g expo-cli
```

Download this repo, then execute the following commands:

```
cd earth-guardians
yarn install # installs base NPM packages for Expo
cd mobile/
yarn install # installs NPM packages for the project
yarn start
```

This will start the development server on [http://localhost:19002/](http://localhost:19002/). Add `-c` to clear cache.

From the web browser interface, in the left navigation area, click "Run on IOS Simulator" or "Run on Android device/emulator" or "Publish or republish project" to publish to a free Expo.io account.

## Framework

This app was build using the [Expo.io framework](http://expo.io/) to generate both iOS and Android phone apps for [EarthGuardians.org](http://earthguardians.org).

Expo offers "managed" and "ejected" versions of React-Native software. The `earth-guardians` app uses the "managed" solution. "Ejected" solutions are platform specfic and remove the power of Expo to generate cross-platform apps. It is 'not recommended' to "eject" this project.

## Graph QL

The backend of the app uses GraphQL and Prisma

### Production Environment URL

The Production Prisma DB is located at [https://eg-production-879cf73477.herokuapp.com/](https://eg-production-879cf73477.herokuapp.com/)

## AWS S3

The Profile Picuture feature in the app utilized [Amazon Web Services S3](https://s3.console.aws.amazon.com/s3/)

### Production Environment URL

The buckets used are located at [https://s3.console.aws.amazon.com/s3/buckets/eg-profile-pics-production/uploads/](https://s3.console.aws.amazon.com/s3/buckets/eg-profile-pics-production/uploads/?region=us-east-1&tab=overview)


## Developer Notes

### Impact and Profile (GreyCard) Screens

#### Modals

Modals must live on the App level, but the AppNavigator component will not allow properties to be passed early. To solve this the app uses the PubSub-JS package to handle internal messaging

### Errors you may encounter

#### Error: `Audio.playThroughEarpieceAndroid`

See [this solution](https://github.com/expo/videoplayer/pull/38/files/ce44a1abc7addf350f8a4fab7672f52bb3d4e1f8) for more information.
