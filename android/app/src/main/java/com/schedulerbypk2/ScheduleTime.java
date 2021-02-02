package com.schedulerbypk2.debug;

// bridge imports
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

// java/android imports
import androidx.core.app.NotificationManagerCompat;
import android.app.AlarmManager;
import android.content.Intent;
import android.app.PendingIntent;
import android.content.Context;
import java.util.Calendar;
import java.text.SimpleDateFormat; 
import 	java.util.Locale;
import 	java.util.TimeZone;

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
        if(resp.contains("error")){
            errorCallback.invoke(resp);
        } else {
            successCallback.invoke(resp);
        }
    }

    @ReactMethod
    public void testLogging(int firstAdd, int secondAdd, Callback successCallback) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm");
        Calendar testDate = Calendar.getInstance();
        testDate.setFirstDayOfWeek(Calendar.MONDAY);
        WritableMap writMap = Arguments.createMap();

        testDate.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
        writMap.putInt("used week number with date one", firstAdd);
        writMap.putString("date one", formatter.format(testDate.getTime()));
        testDate.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
        writMap.putInt("used week number with date two", secondAdd);
        writMap.putString("date two", formatter.format(testDate.getTime()));
        successCallback.invoke(writMap);
        // Log.i("testLogging", "successfull");
    }

    // simply will cancel a current notification,
    // mainly used for alarm screen which opened over locked screen
    // so that a button press would also remove the notification from the background
    @ReactMethod
    public void cancelNotif(int mainTimeId) {
        try{
            NotificationManagerCompat notificationManager = NotificationManagerCompat.from(reactContext);
                
            notificationManager.cancel(mainTimeId);
        } catch (Exception e) {
            Utils.onError(reactContext, -1, -1, "cancelNotif Error" + e.getMessage());
        }
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
    public void showInApp() {
        String packageName = reactContext.getApplicationContext().getPackageName();
        Intent launchIntent = reactContext.getPackageManager().getLaunchIntentForPackage(packageName);

        launchIntent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);

        // i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        reactContext.startActivity(launchIntent);
    }
}