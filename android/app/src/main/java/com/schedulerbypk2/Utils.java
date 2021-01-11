package com.schedulerbypk2.debug;

import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.Arguments;

// java/android imports
import android.app.AlarmManager;
import android.content.Context;
import java.util.Calendar;
import android.content.Intent;
import android.app.PendingIntent;
import android.os.Build;
import java.util.HashMap;
import java.util.Objects;
import java.util.ArrayList;
import java.util.Map;
import android.content.ContentValues;
import java.util.Date;
import java.util.Calendar;
import java.util.Locale;
import android.os.Vibrator;

interface Utils {

    public static void setTime(Context context, Integer reqCode, Integer remId, 
                Integer year, Integer month, Integer day, Integer hour, Integer minute, Integer test) {

        AlarmManager am = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.YEAR, year);
        // IMPORTANT!! This starts from 0!!!!
        calendar.set(Calendar.MONTH, month);
        calendar.set(Calendar.DAY_OF_MONTH, day);
        calendar.set(Calendar.HOUR_OF_DAY, hour);
        calendar.set(Calendar.MINUTE, minute);
        // calendar.set(Calendar.SECOND, 0);

        Intent intent = new Intent(context, TimeReceiver.class);
        // we pass in the reminder id to this receiver
        intent.putExtra("remId", remId);
        intent.putExtra("test", test);
        PendingIntent sender = PendingIntent.getBroadcast(context, reqCode, intent, PendingIntent.FLAG_ONE_SHOT);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            am.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), sender);
        } else {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
                am.setExact(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), sender);
            } else {
                am.set(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), sender);
            }
        }
    }

    public static void setTime(Context context, Integer reqCode, Integer remId, 
            Integer year, Integer month, Integer day, Integer hour, Integer minute) {

            setTime(context, reqCode, remId, year, month, day, hour, minute, 0);
    }

    public static void onError(Context context, Integer mainTimeId, int rngCode, String error){
        // TODO: Turn this into logging when releasing the app

        // and here if the passing of data doesn't happen, most likely the activity is closed
        // so we then start a new activity and pass the data as initial props
        String packageName = context.getApplicationContext().getPackageName();
        Intent launchIntent = context.getPackageManager().getLaunchIntentForPackage(packageName);

        launchIntent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
        // The put extra key needs to be the same as set up in AlarmActivityDelegate
        launchIntent.putExtra("rngCode", rngCode);
        launchIntent.putExtra("error", error);
        launchIntent.putExtra("mainTimeId", mainTimeId);
        launchIntent.putExtra("alarm", true);

        // i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(launchIntent);
    }

    public static void startActivity(Context context, int mainTimeId, int rngCode){
        // and here if the passing of data doesn't happen, most likely the activity is closed
        // so we then start a new activity and pass the data as initial props
        String packageName = context.getApplicationContext().getPackageName();
        Intent launchIntent = context.getPackageManager().getLaunchIntentForPackage(packageName);

        launchIntent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
        // The put extra key needs to be the same as set up in AlarmActivityDelegate
        launchIntent.putExtra("rngCode", rngCode);
        launchIntent.putExtra("mainTimeId", mainTimeId);
        launchIntent.putExtra("alarm", true);

        // i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(launchIntent);
    }

    // helper function to convert arraylist with hashmap<String, Object>
    // to a writable array, the hashmaps of the arraylist cannot contain
    // any deeper maps
    public static WritableArray arrListToMap(ArrayList data){
        WritableArray writArr = Arguments.createArray();

        for(int i = 0; i < data.size(); i++){
            ContentValues item = (ContentValues) data.get(i);

            WritableMap writMap = Arguments.createMap();

            for(String key : item.keySet()){
                Object value = item.get(key);

                if(value == null){
                    writMap.putNull(key);
                } else {
                    switch (value.getClass().getName()) {
                        case "java.lang.Boolean":
                            writMap.putBoolean(key, (Boolean) value);
                            break;
                        case "java.lang.Double":
                            writMap.putDouble(key, (double) value);
                            break;
                        case "java.lang.Integer":
                            writMap.putInt(key, (int) value);
                            break;
                        case "java.lang.String":
                            writMap.putString(key, value.toString());
                            break;
                        default:
                            // so if something else happens, we push in
                            // the classname of the object
                            writMap.putString(key, value.getClass().getName());
                            break;
                    }
                }
            }

            writArr.pushMap(writMap);
        }

        return writArr;
    }

    String[] weekDays = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};

    // NOTE month needs to be passed in as is
    public static String formatNamedDate(String year, String month, String day, boolean tommorow) {

        Calendar calDateTocheck = Calendar.getInstance();
        calDateTocheck.setFirstDayOfWeek(Calendar.MONDAY);
        calDateTocheck.set(Integer.parseInt(year), Integer.parseInt(month) - 1, Integer.parseInt(day));

        Calendar currCalDate = Calendar.getInstance();
        currCalDate.setFirstDayOfWeek(Calendar.MONDAY);

        Calendar afterCalDate = Calendar.getInstance();
        afterCalDate.setFirstDayOfWeek(Calendar.MONDAY);
        afterCalDate.add(Calendar.WEEK_OF_YEAR, 1);

        Calendar befCalDate = Calendar.getInstance();
        befCalDate.setFirstDayOfWeek(Calendar.MONDAY);
        befCalDate.add(Calendar.WEEK_OF_YEAR, -1);
    
        // checking if date is of current week
        if (calDateTocheck.get(Calendar.WEEK_OF_YEAR) == currCalDate.get(Calendar.WEEK_OF_YEAR) && 
            calDateTocheck.get(Calendar.YEAR) == currCalDate.get(Calendar.YEAR)) {

            if (calDateTocheck.get(Calendar.DAY_OF_MONTH) == currCalDate.get(Calendar.DAY_OF_MONTH)) {
                return "Today";
            }

            if(tommorow){

                Calendar tomCalDate = Calendar.getInstance();
                tomCalDate.add(Calendar.DAY_OF_MONTH, 1);

                if (calDateTocheck.get(Calendar.DAY_OF_MONTH) == tomCalDate.get(Calendar.DAY_OF_MONTH)) {
                    return "Tomorrow";
                }
            }

            return weekDays[calDateTocheck.get(Calendar.DAY_OF_WEEK) - 1];

        }
    
        // checking if date is of next week
        if (calDateTocheck.get(Calendar.WEEK_OF_YEAR) == afterCalDate.get(Calendar.WEEK_OF_YEAR) && 
            calDateTocheck.get(Calendar.YEAR) == afterCalDate.get(Calendar.YEAR)) {
            return "Next " + weekDays[calDateTocheck.get(Calendar.DAY_OF_WEEK) - 1];
        }
    
        // checking if date is of previous week
        if (calDateTocheck.get(Calendar.WEEK_OF_YEAR) == befCalDate.get(Calendar.WEEK_OF_YEAR) && 
            calDateTocheck.get(Calendar.YEAR) == befCalDate.get(Calendar.YEAR)) {
            return "Previous " + weekDays[calDateTocheck.get(Calendar.DAY_OF_WEEK) - 1];
        }
    
        return year + " " + calDateTocheck.getDisplayName(Calendar.MONTH, Calendar.LONG, new Locale("US")) + " " + day;
    }

    public static String formatNamedDate(String year, String month, String day) {
        return formatNamedDate(year, month, day, false);
    }

    public static void stopMedia(Context context){
        Vibrator vibe = (Vibrator) context.getSystemService(Context.VIBRATOR_SERVICE);

        if(vibe.hasVibrator()){
            vibe.cancel();
        }

        if(TimeReceiver.alarmPlayer != null && !TimeReceiver.playerRel && TimeReceiver.alarmPlayer.isPlaying()){
            TimeReceiver.alarmPlayer.stop();
            TimeReceiver.alarmPlayer.release();
            TimeReceiver.playerRel = true;
            TimeReceiver.mpTimer.cancel();
        }
    }

    // cancels all pending intents issued in TimeReceiver for notification functionality
    // NOTE: So technically according to PendingIntent docs, the put extra supplied 
    // or NOT supplied should not trigger 'PendingIntent not being equal' to these created
    // AND ALSO: according to docs if we wanna retrieve and modify the flag_one_shot issued intents
    // we gotta use it with FLAG_NO_CREATE
    public static void cancelPendings(Context context, int mainTimeId) {

        String packageName = context.getApplicationContext().getPackageName();

        // alarm action set up
        Intent alarmIntent = context.getPackageManager().getLaunchIntentForPackage(packageName);
        alarmIntent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
        PendingIntent alarmScreen = PendingIntent.getActivity(context, mainTimeId, alarmIntent, PendingIntent.FLAG_ONE_SHOT | PendingIntent.FLAG_NO_CREATE);

        if(alarmScreen != null){
            alarmScreen.cancel();
        }

        // Okay, i think i know whats happening, soo if one of the bellow broadcasts happen
        // others are counted as done as well, and the above getActivity is a different thing

        // cancel(dismiss) action set up
        Intent cancelIntent = new Intent(context, NotDismissRec.class);
        PendingIntent cancPend = PendingIntent.getBroadcast(context, mainTimeId, cancelIntent, PendingIntent.FLAG_ONE_SHOT | PendingIntent.FLAG_NO_CREATE);

        if(cancPend != null){
            cancPend.cancel();
        }

        // dont remind again action setup
        Intent dontRemInt = new Intent(context, DontRemReceiver.class);
        PendingIntent dontRemPend = PendingIntent.getBroadcast(context, mainTimeId, dontRemInt, PendingIntent.FLAG_ONE_SHOT | PendingIntent.FLAG_NO_CREATE);

        if(dontRemPend != null){
            dontRemPend.cancel();
        }

        // On notification cancel via any other method
        Intent removeIntent = new Intent(context, NotRemovedRec.class);
        PendingIntent notRemPend = PendingIntent.getBroadcast(context, mainTimeId, removeIntent, PendingIntent.FLAG_ONE_SHOT | PendingIntent.FLAG_NO_CREATE);

        if(notRemPend != null){
            notRemPend.cancel();
        }
    }
}