package com.schedulerbypk2;

// bridge imports
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableArray;

// java/android imports
import java.util.ArrayList;

// test imports for notification
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.widget.RemoteViews;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import android.provider.Settings;
import android.content.Intent;
import android.net.Uri;
import android.app.PendingIntent;
import android.widget.RemoteViews;
import android.media.RingtoneManager;
import android.app.KeyguardManager;
import android.content.Context;

public class Database extends ReactContextBaseJavaModule {

    MyDbAdapter dbAdapter;
    ReactApplicationContext reactContext;

    Database(ReactApplicationContext context) {
        super(context);
        reactContext = context;
        dbAdapter = new MyDbAdapter(context);
    }

    @Override
    public String getName() {
        return "Database";
    }

    @ReactMethod
    public void bulkManage(Boolean insert, String whereClause, ReadableArray whereVallist, String tableName, 
                ReadableArray data, Callback successCallback, Callback errorCallback) {

        // @insert - true if inserting, false if updating
        // @whereClause - specific where clause for bulk updating, cause not all things
        // might be updated by the id
        // @whereVallist - an array of arrays containing string array for bulk updating containing whereClauses values
        // for each data item
        // @data - is an array of 'Map' of {'column_name as String': 'any type of value'}

        ArrayList<Object> dataList = data.toArrayList();
        ArrayList<Object> whereList = whereVallist.toArrayList();

        try {
            Object resp = dbAdapter.bulkManage(insert, whereClause, whereList, tableName, dataList);

            if(resp.getClass().getName().equals("java.lang.String")){
                errorCallback.invoke(resp.toString());
            } else {
                if(insert){
                    successCallback.invoke((WritableArray) resp);
                } else if((Boolean) resp){
                    successCallback.invoke(true);
                } else {
                    errorCallback.invoke("Db transaction for update was not successful");
                }
            }
        } catch(Exception e) {
            errorCallback.invoke("so this catch happens " + e.getMessage());
        }
    }

    @ReactMethod
    public void scheduleRing(Callback callBack) {
        try {
            String schedResp = dbAdapter.scheduleRing();

            if(schedResp.indexOf("error") != -1){
                Utils.onError(reactContext, 1, 1, schedResp);
            }

        } catch(Exception e) {
            Utils.onError(reactContext, 1, 1, "Scheduling error: " + e.getMessage());
        } finally {
            callBack.invoke("scheduleRing done");
        }
    }

    @ReactMethod
    public void createRep(Integer year, Integer month, Callback callBack) {
        try {
            String repResp = dbAdapter.createRep(year, month);

            if(repResp.indexOf("error") != -1){
                Utils.onError(reactContext, 1, 1, repResp);
            }

        } catch(Exception e) {
            Utils.onError(reactContext, 1, 1, "Create rep error: " + e.getMessage());
        } finally {
            callBack.invoke("createRep done");
        }
    }

    @ReactMethod
    public void formatNamedDate(String year, String month, String day, Callback successCallback, Callback errorCallback) {
        try {
            successCallback.invoke(Utils.formatNamedDate(year, month, day));
        } catch(Exception e) {
            errorCallback.invoke("Error naming date" + e.getMessage());
        }
    }

    @ReactMethod
    public void dontRepRem(int timeId, Callback successCallback, Callback errorCallback) {
        try {
            String resp = dbAdapter.dontRepRem(timeId);

            if(resp.indexOf("error") != -1) {
                errorCallback.invoke("dontRepRem db update error: " + resp);
            } else {
                successCallback.invoke("Reminders updated");
            }

        } catch(Exception e) {
            errorCallback.invoke("dontRepRem exception error: " + e.getMessage());
        }
    }

    @ReactMethod
    public void reqCodeNotNull(Callback callBack) {

        String[] emptyArr = {};

        WritableArray notNullRems = Utils.arrListToMap(dbAdapter.rawQuery("SELECT * FROM reminders WHERE req_code IS NOT NULL", emptyArr));

        WritableArray allRemData = Utils.arrListToMap(dbAdapter.rawQuery("SELECT * FROM reminders", emptyArr));

        WritableArray nullRems = Utils.arrListToMap(dbAdapter.rawQuery("SELECT * FROM reminders WHERE req_code IS NULL", emptyArr));

        callBack.invoke("notNullRems", notNullRems, "allRemData", allRemData, "nullRems", nullRems);

    }

    // @ReactMethod
    // public void rawQuery(String query, ReadableArray params, Callback successCallback, Callback errorCallback) {

    //     try{
    //         ArrayList<Object> paramArr = params.toArrayList();

    //         String[] strParams = new String [paramArr.size()];

    //         for(int i=0; i < paramArr.size(); i++) {

    //             Object param = paramArr.get(i);

    //             switch (param.getClass().getName()) {
    //                 case "java.lang.Boolean":
    //                     strParams[i] = (Boolean) param ? "1" : "0";
    //                     break;
    //                 case "java.lang.Double":
    //                     strParams[i] = (int)((double) param) + "";
    //                     break;
    //                 case "java.lang.String":
    //                     strParams[i] = param.toString();
    //                     break;
    //                 default:
    //                     strParams[i] = "''";
    //                     break;
    //             }

    //         }

    //         WritableArray data = dbAdapter.rawQuery(query, strParams);

    //         if(data.getMap(0).hasKey("error")){
    //             errorCallback.invoke("Error in rawQuery Database method" + data.getMap(0).getString("error"));
    //         } else {
    //             successCallback.invoke(data);
    //         }
    //     } catch (Exception e) {
    //         errorCallback.invoke("Error in rawQuery ReactMethod" + e.getMessage());
    //     }
    // }
}