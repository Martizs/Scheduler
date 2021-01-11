package com.schedulerbypk2.debug;

import android.content.BroadcastReceiver;
import android.content.Intent;
import android.content.Context;

public class NotRemovedRec extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {

        try {
            int notificationId = intent.getExtras().getInt("notificationId");
            Utils.stopMedia(context);
            Utils.cancelPendings(context, notificationId);
        } catch(Exception e) {
            Utils.onError(context, -1, -1, "NotRemovedRec error: " + e.getMessage());
        }
    }
}