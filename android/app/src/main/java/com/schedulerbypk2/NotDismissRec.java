package com.schedulerbypk2;

import android.content.BroadcastReceiver;
import android.content.Intent;
import android.content.Context;
import androidx.core.app.NotificationManagerCompat;

public class NotDismissRec extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {

        try {
            // NOTE: here the notification ID is also the MAIN time_task id
            // of the notification
            int notificationId = intent.getExtras().getInt("notificationId");

            Utils.stopMedia(context);
            NotificationManagerCompat notificationManager = NotificationManagerCompat.from(context);

            Utils.cancelPendings(context, notificationId);
                
            notificationManager.cancel(notificationId);
        } catch(Exception e) {
            Utils.onError(context, -1, -1, "DontRemReceiver error: " + e.getMessage());
        }
    }
}