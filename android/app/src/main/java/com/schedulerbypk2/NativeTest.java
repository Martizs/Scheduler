package com.schedulerbypk2;

// bridge imports
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

// java/android imports
import android.content.Intent;
import android.app.PendingIntent;
import android.content.Context;
import androidx.core.app.NotificationManagerCompat;

public class NativeTest extends ReactContextBaseJavaModule {
    public ReactApplicationContext reactContext;

    NativeTest(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
    }

    @Override
    public String getName() {
        return "NativeTest";
    }

    @ReactMethod
    public void isNotifOpen(int mainTimeId, Callback successCallback) {
        try {
            String packageName = reactContext.getApplicationContext().getPackageName();
            Intent alarmIntent = reactContext.getPackageManager().getLaunchIntentForPackage(packageName);
            alarmIntent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
            PendingIntent alarmScreen = PendingIntent.getActivity(reactContext, mainTimeId, alarmIntent, PendingIntent.FLAG_ONE_SHOT | PendingIntent.FLAG_NO_CREATE);
            if(alarmScreen != null) {
                successCallback.invoke(true);
            } else {
                successCallback.invoke(false);
            }
        } catch (Exception e) {
            Utils.onError(reactContext, -1, -1, "isNotifOpen Error" + e.getMessage());
        }
    }

    @ReactMethod
    public void dismissNotif(int mainTimeId, Callback successCallback) {
        try {

            Utils.stopMedia(reactContext);
            NotificationManagerCompat notificationManager = NotificationManagerCompat.from(reactContext);

            Utils.cancelPendings(reactContext, mainTimeId);
            notificationManager.cancel(mainTimeId);
            successCallback.invoke("Notif canceled");

        } catch(Exception e) {
            Utils.onError(reactContext, -1, -1, "dismissNotif error: " + e.getMessage());
        }
    }

}