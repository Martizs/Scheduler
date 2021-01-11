package com.schedulerbypk2.debug;

import android.content.BroadcastReceiver;
import android.content.Intent;
import android.content.Context;
import androidx.core.app.NotificationManagerCompat;
import java.util.Arrays;
import java.util.ArrayList;

public class DontRemReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {

        try {
            // NOTE: here the notification ID is also the MAIN time_task id
            // of the notification
            int notificationId = intent.getExtras().getInt("notificationId");

            MyDbAdapter dbAdapter = new MyDbAdapter(context);

            String resp = dbAdapter.dontRepRem(notificationId);

            if(resp.indexOf("error") != -1) {
                Utils.onError(context, -1, -1, "DontRemReceiver db update error: " + resp);
            }

            Utils.stopMedia(context);
            Utils.cancelPendings(context, notificationId);

            NotificationManagerCompat notificationManager = NotificationManagerCompat.from(context);
                
            notificationManager.cancel(notificationId);
        } catch(Exception e) {
            Utils.onError(context, -1, -1, "DontRemReceiver error: " + e.getMessage());
        }
    }
}