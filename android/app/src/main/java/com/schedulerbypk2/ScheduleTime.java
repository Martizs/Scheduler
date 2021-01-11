package com.schedulerbypk2.debug;

// bridge imports
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

// java/android imports
import android.app.AlarmManager;
import android.content.Intent;
import android.app.PendingIntent;
import android.content.Context;

// general imports
import java.util.Map;
import java.util.HashMap;

// test
import 	android.util.Log;

public class ScheduleTime extends ReactContextBaseJavaModule {
    public ReactApplicationContext reactContext;

    ScheduleTime(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
    }

    @Override
    public String getName() {
        return "ScheduleTime";
    }

    // dont need it no more for JS part, leaving it here just in case
    // @ReactMethod
    // public void setTime(Integer reqCode, Integer remId, Integer year, Integer month, Integer day, Integer hour, Integer minute, Callback successCallback) {
    //     Utils.setTime(reactContext, reqCode, remId, year, month, day, hour, minute);
    //     successCallback.invoke(
    //                 "Set dateTime: " + year + '-' + month + '-' + day + ' ' + hour + ":" + minute + ". Request code" + reqCode);
    // }

    public static String manageCancelTime(Integer reqCode, Context rContext) {
        String respStr = "";

        try {
            AlarmManager am = (AlarmManager) rContext.getSystemService(Context.ALARM_SERVICE);
            Intent intent = new Intent(rContext, TimeReceiver.class);
            PendingIntent sender = PendingIntent.getBroadcast(rContext, reqCode, intent, PendingIntent.FLAG_ONE_SHOT);
            am.cancel(sender);
            respStr = "scheduled time canceled" + ". Request code" + reqCode;
        } catch (Exception e) {
            respStr = "scheduled time cancel error: " + e.getMessage();
        } finally {
            return respStr;
        }
    }

    @ReactMethod
    public void cancelSetTime(Integer reqCode, Callback successCallback, Callback errorCallback) {
        String resp = manageCancelTime(reqCode, reactContext);
        if(resp.indexOf("error") != -1){
            errorCallback.invoke(resp);
        } else {
            successCallback.invoke(resp);
        }
    }

    @ReactMethod
    public void testLogging() {
        Log.i("testLogging", "successfull");
    }

    // stops the media player from playing if it is already playing
    // so mainly if the media palye
    @ReactMethod
    public void stopMedia() {

        try{
            Utils.stopMedia(reactContext);
        } catch (Exception e) {
            Utils.onError(reactContext, -1, -1, "stopMedia Error" + e.getMessage());
        }
        
    }

    @ReactMethod
    public void isMediaPlaying(Callback successCallback, Callback errCallBack) {
        try{
            if(TimeReceiver.alarmPlayer != null && !TimeReceiver.playerRel && TimeReceiver.alarmPlayer.isPlaying()){
                successCallback.invoke(true);
            } else {
                successCallback.invoke(false);
            }
        } catch (Exception e) {
            errCallBack.invoke("Error checking if media is playing: " + e.getMessage());
        }
        
    }

    @ReactMethod
    public void cancelPendings(int notificationId) {
        Utils.cancelPendings(reactContext, notificationId);
    }


    @ReactMethod
    public void openApp() {
        String packageName = reactContext.getApplicationContext().getPackageName();
        Intent launchIntent = reactContext.getPackageManager().getLaunchIntentForPackage(packageName);

        launchIntent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);

        // i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        reactContext.startActivity(launchIntent);
    }
}