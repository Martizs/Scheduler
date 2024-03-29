package com.schedulerbypk2.debug;

import android.content.BroadcastReceiver;
import android.content.Intent;
import android.content.Context;
import java.util.HashMap;
import java.text.SimpleDateFormat;  
import java.util.Date;
import java.util.Calendar;

public class BootReceiver extends BroadcastReceiver
{  
    MyDbAdapter dbAdapter;
    
   public void onReceive(Context context, Intent intent)
   {

       if(intent.getAction() != null && (intent.getAction().equals(Intent.ACTION_BOOT_COMPLETED) || intent.getAction().equals(Intent.ACTION_LOCKED_BOOT_COMPLETED))) {
           try{
               dbAdapter = new MyDbAdapter(context);

               HashMap<String, String> data = dbAdapter.getRingRem();

               if (data.containsKey("error")){

                   Utils.onError(context, -1, -1, "getRingRem error: " + data.get("error"));

               } else if(data.containsKey("reqCode")){
                   int reqCode = Integer.parseInt(data.get("reqCode"));
                   int remId = Integer.parseInt(data.get("remId"));

                   String ringDate = data.get("ringDate");

                   Date date = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm").parse(ringDate);

                   Calendar cal = Calendar.getInstance();

                   cal.setTime(date);


                   int year = cal.get(Calendar.YEAR);
                   // IMPORTANT!! This starts from 0!!!!
                   int month = cal.get(Calendar.MONTH);
                   int day = cal.get(Calendar.DAY_OF_MONTH);
                   int hour = cal.get(Calendar.HOUR_OF_DAY);
                   int minute = cal.get(Calendar.MINUTE);

                   Utils.setTime(context, reqCode, remId, year, month, day, hour, minute);
               }
           } catch (Exception e) {
               Utils.onError(context, -1, -1, "Boot receiver error: " + e.getMessage());
           }
       }
   }    
}