package com.jobittrending;

import android.app.Application;
import android.content.Intent;
import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;

import com.airbnb.android.react.lottie.LottiePackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.imagepicker.ImagePickerPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.microsoft.codepush.react.CodePush;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;

import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;
import java.util.Arrays;
import java.util.List;
import io.invertase.firebase.RNFirebasePackage;
// optional packages - add/remove as appropriate
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage; // Firebase Firestore
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage; // Firebase Cloud Messaging
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
//import com.facebook.CallbackManager;
//import com.facebook.FacebookSdk;
//import com.facebook.reactnative.androidsdk.FBSDKPackage;
//import com.facebook.appevents.AppEventsLogger;


public class MainApplication extends NavigationApplication {
//   private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

//  protected static CallbackManager getCallbackManager() {
//    return mCallbackManager;
//  }
 @Override
  protected ReactGateway createReactGateway() {
    ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
    @Override
    protected String getJSMainModuleName() {
      return "index";
      }
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }
    @Override
    protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
    }
    };
    return new ReactGateway(this, isDebug(), host);
  }

    @Override
    public boolean isDebug() {
        // Make sure you are using BuildConfig from your own application
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new RNFirebasePackage(),
          new RNFirebaseFirestorePackage(),
          new RNFirebaseMessagingPackage(),
          new ImagePickerPackage(),
          new RNI18nPackage(),
          new VectorIconsPackage(),
          new RNDeviceInfo(),
          new ReactNativeConfigPackage(),
//          new FBSDKPackage(mCallbackManager),
          new LinearGradientPackage(),
          new LottiePackage(),
          new CodePush(BuildConfig.CODEPUSH_KEY, MainApplication.this, BuildConfig.DEBUG)
      );
    }
  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }
  @Override
  public void onCreate() {
    super.onCreate();
    Fabric.with(this, new Crashlytics());
//    SoLoader.init(this, /* native exopackage */ false);
  }


}
