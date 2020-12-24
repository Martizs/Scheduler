package com.schedulerbypk2;

/* React native */
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.Arguments;

/* android/java*/
import android.content.BroadcastReceiver;
import android.content.Intent;
import android.content.Context;
import android.os.Bundle;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import android.content.pm.PackageManager;
import android.content.pm.ApplicationInfo;
import android.app.PendingIntent;
import android.widget.RemoteViews;
import android.media.MediaPlayer;
import android.media.RingtoneManager;
import android.net.Uri;
import android.media.MediaPlayer;
import android.os.Vibrator;
import android.os.VibrationEffect;
import android.os.Build;
import android.media.AudioManager;
import android.media.AudioAttributes;
import java.util.Timer;
import java.util.TimerTask;
import android.app.KeyguardManager;
import com.facebook.react.ReactApplication;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Random;
import com.facebook.react.bridge.WritableArray;

public class TimeReceiver extends BroadcastReceiver {

    MyDbAdapter helper;

    // we stop the media player
    public static MediaPlayer alarmPlayer;

    public static boolean playerRel = true;

    public static Timer mpTimer;

    @Override
    public void onReceive(Context context, Intent intent) {

        int remId = intent.getExtras().getInt("remId");

        helper = new MyDbAdapter(context);
        
        try{
            Object timeIds = helper.manageRems(remId);

            if(timeIds.getClass().getName().equals("java.lang.String")){

                Utils.onError(context, -1, -1, "manageRems resp error: " + timeIds);

            } else {

                String packageName = context.getApplicationContext().getPackageName();

                ArrayList<HashMap<String, Object>> timeIdsArr = (ArrayList<HashMap<String, Object>>) timeIds;

                boolean notifRing = true;

                // variable for testing notifications
                WritableArray mainTimIds = Arguments.createArray();

                for (int i = 0; i < timeIdsArr.size(); i++){

                    HashMap<String, Object> timeData = timeIdsArr.get(i);

                    String taskDate = timeData.get("time").toString();
                    String taskTitle = timeData.get("taskTitle").toString();

                    String taskDesc = timeData.get("taskDesc") == null ? "" : timeData.get("taskDesc").toString();

                    boolean mainTimeRep = false;

                    int mainTimeId = (int) timeData.get("timeId");
                    boolean remRep = (boolean) timeData.get("remRepeatability");
                    int remCount = (int) timeData.get("remCount");

                    if(remRep || remCount > 1) {
                        mainTimeRep = true;
                    }

                    if(notifRing) {
                        notifRing = (boolean) timeData.get("notif");
                    }

                    mainTimIds.pushInt(mainTimeId);

                    // we cancel previous pendings just to have everything clean
                    // nothing will be canceled if the pendings have been already done
                    Utils.cancelPendings(context, mainTimeId);

                    // alarm action set up
                    Intent alarmIntent = context.getPackageManager().getLaunchIntentForPackage(packageName);
                    alarmIntent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
                    // The put extra key needs to be the same as set up in AlarmActivityDelegate

                    // So in order for our alarm screen to be alarm screen
                    // and our app screen to be app screen and switch properly
                    // on the same activity, each notification needs to pass in a unique
                    // code to our app, so that it would now if it should show the alarm screen
                    // or app screen, now we dont use reqCode for this, because there might be several
                    // time task notifications fired at the same time, and they'd all have the same reqCode
                    // meaning only one would show an actual alarm screen, AAAAND we dont use the 
                    // mainTimeId because if someone opened the alarm screen and after another
                    // notif for the same task would appear their would be redirected to the App screen,
                    // so for desired behaviour we go with rng codes
                    int rngCode = new Random().nextInt(100000) + 1;
                    alarmIntent.putExtra("rngCode", rngCode);

                    alarmIntent.putExtra("mainTimeId", mainTimeId);
                    // TODO: do we still need this with the new flow?
                    alarmIntent.putExtra("notifRing", (boolean) timeData.get("notif"));
                    alarmIntent.putExtra("alarm", true);
                    alarmIntent.putExtra("remWillRep", mainTimeRep);

                    PendingIntent alarmScreen = PendingIntent.getActivity(context, mainTimeId, alarmIntent, PendingIntent.FLAG_ONE_SHOT);

                    // Okay, i think i know whats happening, soo if one of the bellow broadcasts happen
                    // others are counted as done as well, and the above getActivity is a different thing

                    // cancel(dismiss) action set up
                    Intent cancelIntent = new Intent(context, NotDismissRec.class);
                    cancelIntent.putExtra("notificationId", mainTimeId);
                    PendingIntent cancelPendIntent = PendingIntent.getBroadcast(context, mainTimeId, cancelIntent, PendingIntent.FLAG_ONE_SHOT);

                    // dont remind again action setup
                    Intent dontRemInt = new Intent(context, DontRemReceiver.class);
                    dontRemInt.putExtra("notificationId", mainTimeId);
                    PendingIntent dontRemPend = PendingIntent.getBroadcast(context, mainTimeId, dontRemInt, PendingIntent.FLAG_ONE_SHOT);

                    // On notification cancel via any other method
                    Intent removeIntent = new Intent(context, NotRemovedRec.class);
                    removeIntent.putExtra("notificationId", mainTimeId);
                    PendingIntent remPendInt = PendingIntent.getBroadcast(context, mainTimeId, removeIntent, PendingIntent.FLAG_ONE_SHOT);

                    ApplicationInfo ai = context.getPackageManager()
                        .getApplicationInfo(packageName, PackageManager.GET_META_DATA);
                    Bundle bundle = ai.metaData;
                    int resourceID = bundle.getInt("com.schedulerbypk2.ic_launcher_round");

                    int notifLayout = bundle.getInt("com.schedulerbypk2.notification");

                    RemoteViews notificationLayout = new RemoteViews(packageName, notifLayout);

                    // here we set the texts for the notification
                    notificationLayout.setTextViewText(R.id.notif_time, taskDate);
                    notificationLayout.setTextViewText(R.id.notif_title, taskTitle);

                    if(taskDesc.length() > 0){
                        notificationLayout.setTextViewText(R.id.notif_desc, taskDesc);
                    }
                
                    // Build the notification
                    NotificationCompat.Builder builder = new NotificationCompat.Builder(context, MainActivity.CHANNEL_ID)
                        .setSmallIcon(resourceID)
                        .setStyle(new NotificationCompat.DecoratedCustomViewStyle())
                        .setCustomContentView(notificationLayout)
                        .setPriority(NotificationCompat.PRIORITY_MAX)
                        .setCategory(NotificationCompat.CATEGORY_ALARM)
                        .setAutoCancel(true)
                        .setFullScreenIntent(alarmScreen, true)
                        .setDeleteIntent(remPendInt)
                        .addAction(resourceID, "dismiss", cancelPendIntent);
                    
                    if(mainTimeRep) {
                        builder.addAction(resourceID, "don't remind again", dontRemPend);
                    }


                    // and finally we notify
                    NotificationManagerCompat notificationManager = NotificationManagerCompat.from(context);
                    // notificationId is a unique int for each notification that you must define
                    notificationManager.notify(mainTimeId, builder.build());
                }

                if(playerRel || !alarmPlayer.isPlaying()) {
                    // setting up and starting sound
                    Uri soundUri = RingtoneManager.getDefaultUri(notifRing ? RingtoneManager.TYPE_NOTIFICATION : RingtoneManager.TYPE_ALARM);
                    alarmPlayer = new MediaPlayer();
    
                    // Checking if phone is API-26+ and using an appropriate
                    // audio stream manipulation
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
    
                        alarmPlayer.setAudioAttributes(new AudioAttributes.Builder()
                        .setUsage(notifRing ? AudioAttributes.USAGE_NOTIFICATION_EVENT : AudioAttributes.USAGE_ALARM).build());
    
                    } else {
                        alarmPlayer.setAudioStreamType(notifRing ? AudioManager.STREAM_NOTIFICATION : AudioManager.STREAM_ALARM);
                    }
                    
                    alarmPlayer.setLooping(!notifRing);
                    alarmPlayer.setDataSource(context.getApplicationContext(), soundUri);
                    alarmPlayer.prepare();
                    alarmPlayer.start();
    
                    // setting up and starting vibration
                    Vibrator vibe = (Vibrator) context.getSystemService(Context.VIBRATOR_SERVICE);
                    
                    if(vibe.hasVibrator()){
                        int repeat = notifRing ? -1 : 0;
                        long[] pattern = new long[notifRing ? 4 : 2];
    
                        if(notifRing){
                            pattern[0] = 500;
                            pattern[1] = 500;
                            pattern[2] = 500;
                            pattern[3] = 500;
                        } else {
                            pattern[0] = 1000;
                            pattern[1] = 1000;
                        }
    
                        // Checking if phone is API-26+ and using an appropriate
                        // vibrate call
                        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                            VibrationEffect effect = VibrationEffect.createWaveform(pattern, repeat);
                            vibe.vibrate(effect);
                        } else {
                            vibe.vibrate(pattern, repeat);
                        }
                    }
    
                    playerRel = false;
                }
    
                if(mpTimer != null){
                    mpTimer.cancel();
                }
    
                // context - is the context you get from broadcastreceivers onReceive
                ReactApplication rnApp = (ReactApplication) context.getApplicationContext();

                // here we also add a timer for the livelihood
                // of the sound ringing
                mpTimer = new Timer();
                mpTimer.schedule(new TimerTask() {          
                    @Override
                    public void run() {
                        Utils.stopMedia(context);
    
                        if(MainActivity.active){
                            
                            rnApp.getReactNativeHost().getReactInstanceManager()
                                .getCurrentReactContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                .emit("ringStop", Arguments.createMap());
                        }
                    
                    }
                // this code will be executed after 5 minutes
                }, 300000);

                rnApp.getReactNativeHost().getReactInstanceManager()
                                .getCurrentReactContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                                .emit("notifOpened", mainTimIds);
            }

        } catch (Exception e){
            Utils.onError(context, -1, -1, "TimeReceiver eror: " + e.getMessage());
        }
    }

}