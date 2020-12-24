package com.schedulerbypk2;

import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import android.content.Context;
import android.content.ContentValues;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;

// manage alarms implementation
import java.text.SimpleDateFormat;  
import java.util.Date;
import java.util.Calendar;
import org.json.JSONArray;
import com.facebook.react.bridge.ReadableMap;
import org.json.JSONObject;
import java.util.Random;
import java.util.Iterator;
import java.util.Arrays;
import android.database.DatabaseUtils;

public class MyDbAdapter {
    myDbHelper myhelper;

    Context dbContext;

    SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm");

    public MyDbAdapter(Context context) {
        myhelper = new myDbHelper(context);
        dbContext = context;
    }

    public HashMap<String, String> getRingRem() {
        SQLiteDatabase db = myhelper.getWritableDatabase();
        db.beginTransaction();

        HashMap<String, String> data = new HashMap<String, String>();
        try{
            String[] columns = { myDbHelper.UID, myDbHelper.RING_DATE, myDbHelper.REQ_CODE };
            Cursor cursor = db.query(myDbHelper.TABLE_NAME, columns, myDbHelper.REQ_CODE + " IS NOT NULL", null, null, null, null);

            while (cursor.moveToNext()) {
                int cid = cursor.getInt(cursor.getColumnIndex(myDbHelper.UID));
                String ring_date = cursor.getString(cursor.getColumnIndex(myDbHelper.RING_DATE));
                int req_code = cursor.getInt(cursor.getColumnIndex(myDbHelper.REQ_CODE));
                data.put("remId", cid + "");
                data.put("ringDate", ring_date);
                data.put("reqCode", req_code + "");
            }

            db.setTransactionSuccessful();
        } catch(Exception e) {
            data.put("error", e.getMessage());
        } finally {
            db.endTransaction();
            myhelper.close();
            return data;
        }
    }

    public ArrayList<ContentValues> rawQuery(String query, String[] params, ContentValues extraData) {
        SQLiteDatabase db = myhelper.getWritableDatabase();
        db.beginTransaction();

        ArrayList<ContentValues> data = new ArrayList<ContentValues>();

        try {
            Cursor cursor = db.rawQuery(query, params);

            String[] columns = cursor.getColumnNames();

            while (cursor.moveToNext()) {

                ContentValues row = new ContentValues();

                for (String column : columns) {

                    int fieldType = cursor.getType(cursor.getColumnIndex(column));

                    int colIndex = cursor.getColumnIndex(column);

                    switch(fieldType){
                        case Cursor.FIELD_TYPE_INTEGER:
                            row.put(column, cursor.getInt(colIndex));
                            break;
                        case Cursor.FIELD_TYPE_FLOAT:
                            row.put(column, cursor.getFloat(colIndex));
                            break;
                        case Cursor.FIELD_TYPE_STRING:
                            row.put(column, cursor.getString(colIndex));
                            break;
                        case Cursor.FIELD_TYPE_NULL:
                            row.putNull(column);
                            break;
                        default:
                            row.putNull(column);
                            break;
                    }
                }

                if(extraData != null){
                    row.putAll(extraData);
                }

                data.add(row);
            }
            db.setTransactionSuccessful();
        }  catch(Exception e) {
            data = new ArrayList<ContentValues>();
            ContentValues row = new ContentValues();
            row.put("error", e.getMessage());
            data.add(row);
        } finally {
            db.endTransaction();
            myhelper.close();
            return data;
        }
    }

    public ArrayList<ContentValues> rawQuery(String query, String[] params) {
        return rawQuery(query, params, null);
    }

    public Object bulkManage(Boolean insert, String whereClause, ArrayList whereVallist, 
                                String tableName, ArrayList dataList, Boolean contentVals) {
                                    
        // @insert - true if inserting, false if updating
        // @whereClause - specific where clause for bulk updating, cause not all things
        // might be updated by the id
        // @whereKeylist - a string array for bulk updating containing keys which are in the
        // passed in data, which will be used with the passed in whereClause
        // according to each data item, NOTE where keys need to be cautious of their placement
        // in the array, example if you have a where clause: 'time_id AND task_rem_id' then
        // the where Keys need to be like ['timeId', 'taskRemId'].
        // @dataList - is an array of 'Map' of {'column_name as String': 'any type of value'}
        // @fieldList - will have to be an array of objects with keys: 'name', 'valueKey' or 'value'
        // where 'name' - is the fields to be updated name as it is called in the db (STRING)
        // 'valueKey' - the key of the update value in the data array (STRING)
        // 'value' - this can be passed in instead of 'valueKey' if we want to set the same (any type)

        SQLiteDatabase db = myhelper.getWritableDatabase();
        db.beginTransaction();

        Object success;
        WritableArray insertedIds = Arguments.createArray();

        // so we only want to generate insert ids array
        // when an actual bulk insert is happening
        if(insert){
            success = insertedIds;
        } else {
            // otherwise we will just return a Boolean value for success
            success = false;
        }
        
        String test = "";

        try {

            for (int i = 0; i < dataList.size(); i++) {

                ContentValues values;

                if(contentVals){
                    values = (ContentValues) dataList.get(i);
                } else {

                    values = new ContentValues();

                    Map item = (HashMap) dataList.get(i);

                    for(Object objKey : item.keySet()){

                        String key = objKey.toString();

                        Object value = item.get(key);

                        if(value == null){
                            values.putNull(key);
                        } else {
                            switch (value.getClass().getName()) {
                                case "java.lang.Boolean":
                                    values.put(key, (Boolean) value);
                                    break;
                                case "java.lang.Double":
                                    values.put(key, (int)((double) value));
                                    break;
                                case "java.lang.Integer":
                                    values.put(key, (int) value);
                                    break;
                                case "java.lang.String":
                                    values.put(key, value.toString());
                                    break;
                                default:
                                    // so if something else happens, we push in
                                    // error, to get an error
                                    values.put("error_converting_HM_to_CV", "error converting hashmap to content values");
                                    break;
                            }
                        }
                    }
                }

                if(insert) {
                    long id = db.insertOrThrow(tableName, null, values);
                    
                    insertedIds.pushDouble((double)id);
                } else {
                    // Convert ArrayList to object array 
                    Object[] objArr = ((ArrayList) whereVallist.get(i)).toArray(); 
            
                    // convert Object array to String array 
                    String[] whereValArr = Arrays.copyOf(objArr, objArr.length, String[].class); 

                    db.update(tableName, values, whereClause, whereValArr);
                }
                
            }

            db.setTransactionSuccessful();
            success = insert ? insertedIds : true;
        } catch (Exception e) {
            success = e.getMessage();
        } finally {
            db.endTransaction();
            myhelper.close();
            
            return success;
        }
    }

    public Object bulkManage(Boolean insert, String whereClause, ArrayList whereVallist, String tableName, ArrayList dataList) {
        return bulkManage(insert, whereClause, whereVallist, tableName, dataList, false);
    }

    private String updateSchedTime(String dateString){

        String respStr = "";

        String newRemQuery = "SELECT * FROM reminders " +  
                                    "WHERE reminders.done=? AND task_done=? AND ring_date>? " + 
                                    "ORDER BY ring_date ASC LIMIT 1";

        String[] params = {"0", "0", dateString};

        ArrayList<ContentValues> newRingRem = rawQuery(newRemQuery, params);

        if(newRingRem.size() != 0){

            if(newRingRem.get(0).containsKey("error")){
                return newRingRem.get(0).get("error").toString();
            }

            String newRingDate = newRingRem.get(0).get("ring_date").toString();
           
            try {
                Date ringDate = formatter.parse(newRingDate);

                Calendar calendar = Calendar.getInstance();
                calendar.setTime(ringDate);

                int reqCode = new Random().nextInt(1000) + 1;
                int remId = (int) newRingRem.get(0).get("id");
                int year = calendar.get(Calendar.YEAR);
                int month = calendar.get(Calendar.MONTH);
                int day = calendar.get(Calendar.DAY_OF_MONTH);
                int hour = calendar.get(Calendar.HOUR_OF_DAY);
                int minute = calendar.get(Calendar.MINUTE);

                Utils.setTime(dbContext, reqCode, remId, year, month, day, hour, minute);

                // and we update the newly set timed reminder
                SQLiteDatabase db = myhelper.getWritableDatabase();
                db.beginTransaction();
                try {

                    ContentValues values = new ContentValues();
                    values.put("req_code", reqCode);

                    String[] whereValArr = {remId + ""};

                    // we null the reminders reqCode
                    db.update("reminders", values, "id=?", whereValArr);
                    db.setTransactionSuccessful();
                } catch (Exception e) {
                    respStr = "error: " + e.getMessage();
                } finally {
                    db.endTransaction();
                    myhelper.close();
                    return respStr;
                }
            } catch (Exception e) {
                respStr = "error: " + e.getMessage();
                return respStr;
            }
        }

        return respStr;
    }

    public String scheduleRing() {

        String oldRemQuery = "SELECT * FROM reminders WHERE req_code IS NOT NULL";

        String[] emptyArr = {};

        ArrayList<ContentValues> oldRingRem = rawQuery(oldRemQuery, emptyArr);

        String respStr = "";

        // we substract 4 mins from the current date
        // as we want to follow everything as in javascript
        Calendar calDate = Calendar.getInstance();
        long t= calDate.getTimeInMillis();
        Date date = new Date(t - 4*60000);
        String dateString = formatter.format(date);

        if(oldRingRem.size() != 0) {

            if(oldRingRem.get(0).containsKey("error")){
                return oldRingRem.get(0).get("error").toString();
            }

            SQLiteDatabase db = myhelper.getWritableDatabase();
            db.beginTransaction();

            try {
                ContentValues values = new ContentValues();
                values.putNull("req_code");

                String[] whereValArr = {((int) oldRingRem.get(0).get("id")) + ""};

                // we null the reminders reqCode
                db.update("reminders", values, "id=?", whereValArr);
                db.setTransactionSuccessful();

            } catch (Exception e) {
                respStr = "error: " + e.getMessage();
            } finally {
                db.endTransaction();
                myhelper.close();

                if(respStr.indexOf("error") != -1){
                    return respStr;
                }

                // Then we cancel the set time if there was any
                String timeCancel = ScheduleTime.manageCancelTime((int) oldRingRem.get(0).get("req_code"), dbContext);

                if(timeCancel.indexOf("error") != -1){
                    return timeCancel;
                }

                respStr = updateSchedTime(dateString);

                return respStr;
            }
        } else {
            respStr = updateSchedTime(dateString);
        }

        return respStr;
    }

    private String genNewRing(String currDateStr, String ringDateStr, JSONObject rep){

        String respStr = "";

        try{

            String newRingStr = ringDateStr;

            Date ringDate = formatter.parse(newRingStr);
        
            Calendar calDate = Calendar.getInstance();
            calDate.setTime(ringDate);

            Object cDateResp = changeDate(calDate, rep, true);

            if(cDateResp.getClass().getName().equals("java.lang.String")) {
                respStr = cDateResp.toString();
                return respStr;
            }

            calDate = (Calendar) cDateResp;

            newRingStr = formatter.format(calDate.getTime());

            // so here we cover the reminders triggering from the past
            while (currDateStr.compareTo(newRingStr) > 0) {

                cDateResp = changeDate(calDate, rep, true);

                if(cDateResp.getClass().getName().equals("java.lang.String")) {
                    respStr = cDateResp.toString();
                    return respStr;
                }

                calDate = (Calendar) cDateResp;

                newRingStr = formatter.format(calDate.getTime());
            }

            respStr = formatter.format(calDate.getTime());
        } catch (Exception e) {
            respStr = "error: " + e.getMessage();
        } finally {
            return respStr;
        }
    }

    // helper function to merge two json objects
    // IMPORTANT: both json objects need to have different keys
    // private JSONObject mergeJSONObjects(JSONObject json1, JSONObject json2) {
	// 	JSONObject mergedJSON = json1;
	// 	try {
	// 		mergedJSON = new JSONObject(json1, JSONObject.getNames(json1));
	// 		for (String crunchifyKey : JSONObject.getNames(json2)) {
	// 			mergedJSON.put(crunchifyKey, json2.get(crunchifyKey));
	// 		}
 
	// 	} catch (JSONException e) {
	// 		throw new RuntimeException("JSON Exception" + e);
	// 	}
	// 	return mergedJSON;
    // }
    
    // helper function to increase our date object
    // according to the repeatability passed in
    // @calDat - date to add to passed in as a calendar object
    // @rep - the repeatability json object
    private Object changeDate(Calendar calDat, JSONObject rep, Boolean add){

        Calendar calDate = Calendar.getInstance();

        calDate.setTime(calDat.getTime());

        try{
            int number = add ? rep.getInt("number") : -rep.getInt("number");

            switch(rep.getString("type")){
                case "minutes":
                    calDate.add(Calendar.MINUTE, number);
                    break;
                case "hours":
                    calDate.add(Calendar.HOUR_OF_DAY, number);
                    break;
                case "days":
                    calDate.add(Calendar.DAY_OF_MONTH, number);
                    break;
                case "weeks":
                    calDate.add(Calendar.WEEK_OF_YEAR, number);
                    break;
                case "months":
                    calDate.add(Calendar.MONTH, number);
                    break;
                case "years":
                    calDate.add(Calendar.YEAR, number);
                    break;
            }

            return calDate;
        } catch (Exception e) {

            return "error: Exception in change date: " + e.getMessage();

        }
    }

    private String addZero(int number){
        return number > 9 ? "" + number : "0" + number;
    }

    // createRepArray for createRep
    private Object createRepArray(ArrayList datToAdd, Calendar startDate, Calendar endDate, JSONObject rep, JSONObject extraData){
        ArrayList<ContentValues> dates = datToAdd;

        Object resp = "";

        try {
            // IMPORTANT: we use do while here because we want
            // the dates to be added at least once, for such
            // edge cases where there's a rep task for every two years
            // and no other tasks or app interaction is happening
            // and the task also has a reminder set, so we want to make sure
            // that they always get created, when the last rep end time has been
            // exceeded
            do {
                // this is where the adding magic happens
                ContentValues dateItem = new ContentValues();

                int year = startDate.get(Calendar.YEAR);
                // gotta add +1 when we save it to the db.
                int month = startDate.get(Calendar.MONTH) + 1;
                int day = startDate.get(Calendar.DAY_OF_MONTH);

                dateItem.put("year", addZero(year));
                dateItem.put("month", addZero(month));
                dateItem.put("day", addZero(day));

                if(extraData != null){
                    Iterator<String> extrIt = extraData.keys();
                    while(extrIt.hasNext()) {
                        String key = extrIt.next();

                        Object value = extraData.get(key);

                        switch (value.getClass().getName()) {
                            case "java.lang.Boolean":
                                dateItem.put(key, (Boolean) value);
                                break;
                            case "java.lang.Double":
                                dateItem.put(key, (double) value);
                                break;
                            case "java.lang.Integer":
                                dateItem.put(key, (int) value);
                                break;
                            case "java.lang.String":
                                dateItem.put(key, value.toString());
                                break;
                            default:
                                dateItem.putNull(key);
                                break;
                        }

                        
                    }
                    
                }

                dates.add(dateItem);

                Object cDateResp = changeDate(startDate, rep, true);

                if(cDateResp.getClass().getName().equals("java.lang.String")) {
                    throw new Exception(cDateResp.toString());
                }

                startDate = (Calendar) cDateResp;

                } while (startDate.getTime().before(endDate.getTime()));

                HashMap<String, Object> results = new HashMap<String, Object>();
                results.put("dates", dates);

                Object cDateResp = changeDate(startDate, rep, false);

                if(cDateResp.getClass().getName().equals("java.lang.String")) {
                    throw new Exception(cDateResp.toString());
                }


                String repEndTime = formatter.format(((Calendar) cDateResp).getTime());
                results.put("repEndTime", repEndTime);

                resp = results;

        } catch (Exception e) {
            resp = "error: Exception createRepArray: " + e.getMessage();
        } finally {
            return resp;
        }
    }

    // util function to adjust a passed in rem according
    // to the passed dateItem and the passed in timeID
    private Object adjustRem(ContentValues rem, ContentValues dateItem, int tHours, int tMins, int timeId){
        ContentValues newRem = new ContentValues(rem);

        try {
            Calendar ringDate = Calendar.getInstance();

            ringDate.set(Integer.parseInt(dateItem.get("year").toString()), 
            Integer.parseInt(dateItem.get("month").toString()), Integer.parseInt(dateItem.get("day").toString()));

            if ((int) rem.get("same_time") == 0) {

                ringDate.set(Calendar.HOUR_OF_DAY, tHours);
                ringDate.set(Calendar.MINUTE, tMins);

            } else if ((int) rem.get("same_time") == 1) {

                ringDate.set(Calendar.HOUR_OF_DAY, Integer.parseInt(rem.get("hours").toString()));
                ringDate.set(Calendar.MINUTE, Integer.parseInt(rem.get("minutes").toString()));

            } else {

                JSONObject before = new JSONObject(rem.get("before").toString());

                if(before.getString("type") == "minutes" || before.getString("type") == "hours") {
                    ringDate.set(Calendar.HOUR_OF_DAY, tHours);
                    ringDate.set(Calendar.MINUTE, tMins);
                } else {
                    ringDate.set(Calendar.HOUR_OF_DAY, Integer.parseInt(rem.get("hours").toString()));
                    ringDate.set(Calendar.MINUTE, Integer.parseInt(rem.get("minutes").toString()));
                }

                // substract according to the before json

                Object cDateResp = changeDate(ringDate, before, false);

                if(cDateResp.getClass().getName().equals("java.lang.String")) {
                    throw new Exception("Adjust rem change date error: " + cDateResp.toString());
                }

                ringDate = (Calendar) cDateResp;
            }

            // so we use remove and put here
            // as replace only works with api 24 lol
            // ALSO we dont use if for the removal part
            // cause if the key is not present it should 
            // just do nothing according to the docs, so no exceptions nor breaks
            newRem.remove("ring_date");
            newRem.put("ring_date", formatter.format(ringDate.getTime()));

            newRem.remove("time_id");
            newRem.put("time_id", timeId);

            newRem.remove("done");
            newRem.put("done", 0);

            newRem.remove("task_done");
            newRem.put("task_done", 0);
            
            return newRem;
        } catch (Exception e) {
            return "error: Exception adjustRem: " + e.getMessage();
        }
    }

    public String createRep(Integer year, Integer month) {

        String resp = "";

        try {
            // NOTE: month needs to be passed in as a -1 here
            Calendar endDate = Calendar.getInstance();

            endDate.set(year, month, 1, 23, 0);

            // now here we'll be checking and making sure
            // that there's always +4 months of tasks that are created
            // mainly because our reminders can be max 3months+ before
            // a certain task, so we need to make sure that we always
            // have a task created for any reminders
            endDate.add(Calendar.MONTH, 4);

            endDate.set(Calendar.DAY_OF_MONTH, endDate.getActualMaximum(Calendar.DAY_OF_MONTH));

            String datCheckStr = formatter.format(endDate.getTime());

            String taskQ = "SELECT * FROM tasks WHERE repeatability IS NOT NULL AND rep_end_time<?";

            String[] taskPar = {datCheckStr};

            ArrayList<ContentValues> tData = rawQuery(taskQ, taskPar);

            if(tData.size() != 0){

                if(tData.get(0).containsKey("error")){
                    resp = "Create rep - Getting task data error " + tData.get(0).get("error").toString();
                    return resp;
                }

                ArrayList<ContentValues> dates = new ArrayList<ContentValues>();

                ArrayList<ContentValues> baseRems = new ArrayList<ContentValues>();

                ArrayList<ArrayList<String>> wherevalList = new ArrayList<ArrayList<String>>();

                ArrayList<HashMap<String, Object>> tMetaData = new ArrayList<HashMap<String, Object>>();

                for(int i = 0; i < tData.size(); i++){

                    ContentValues task = tData.get(i);

                    String startDateStr = task.get("rep_end_time").toString();

                    JSONObject rep = new JSONObject(task.get("repeatability").toString());

                    Calendar startDate = Calendar.getInstance();

                    startDate.setTime(formatter.parse(startDateStr));

                    Object cDateResp = changeDate(startDate, rep, true);

                    if(cDateResp.getClass().getName().equals("java.lang.String")) {
                        resp = "change date error: " + cDateResp.toString();
                        return resp;
                    }

                    startDate = (Calendar) cDateResp;

                    JSONObject extraData = new JSONObject();
                    extraData.put("task_id", (int) task.get("id"));
                    extraData.put("done", 0);

                    Object createRepResp = createRepArray(dates, startDate, endDate, rep, extraData);

                    if(createRepResp.getClass().getName().equals("java.lang.String")) {
                        resp = "Create rep array error: " + createRepResp.toString();
                        return resp;
                    }

                    HashMap<String, Object> datesData = (HashMap<String, Object>) createRepResp;

                    dates = (ArrayList<ContentValues>) datesData.get("dates");

                    task.remove("rep_end_time");
                    task.put("rep_end_time", datesData.get("repEndTime").toString());

                    ArrayList<String> whereVals = new ArrayList<String>();
                    whereVals.add(task.get("id").toString());
                    wherevalList.add(whereVals);

                    // and here we gonna get the baseRems
                    // so first we get the first timeId of the task
                    String timesIdQuery = "SELECT id FROM times WHERE task_id=? ORDER BY id ASC LIMIT 1";

                    String taskId = ((int) task.get("id")) + "";

                    String[] timesIdPars = {taskId};
                    
                    ArrayList<ContentValues> timesID = rawQuery(timesIdQuery, timesIdPars);

                    if(timesID.size() == 0){
                        resp = "error timeId for task not found wat? Task id: " + taskId;
                        return resp;
                    } else {
                        
                        if(timesID.get(0).containsKey("error")){
                            resp = "Create rep - Getting first time id of task error. Task id: " + taskId + 
                            ". Error: " + timesID.get(0).get("error").toString();
                            return resp;
                        }

                        String timeId = ((int) timesID.get(0).get("id")) + "";

                        // and here we get the baseRems
                        String baseRemsQ = "SELECT * FROM reminders WHERE time_id=?";

                        String[] baseRemPars = {timeId};

                        ContentValues baseRemExtra = new ContentValues();

                        baseRemExtra.put("taskId", Integer.parseInt(taskId));

                        ArrayList<ContentValues> baseRemRes = rawQuery(baseRemsQ, baseRemPars, baseRemExtra);

                        if(baseRemRes.size() != 0){

                            if(baseRemRes.get(0).containsKey("error")){

                                resp = "Create rep - Getting base rems error. Time id: " + timeId + 
                                ". Error: " + baseRemRes.get(0).get("error").toString();

                                return resp;
                            }

                            baseRems.addAll(baseRemRes);
                        }
                    }

                    HashMap<String, Object> tMetaItem = new HashMap<String, Object>();

                    tMetaItem.put("id", task.get("id"));
                    tMetaItem.put("hours", task.get("hours"));
                    tMetaItem.put("minutes", task.get("minutes"));

                    tMetaData.add(tMetaItem);

                    task.remove("id");
                    tData.set(i,  task);
                }

                //  updating tasks
                Object bulkUpdt = bulkManage(false, "id=?", wherevalList, "tasks", tData, true);
        
                if(bulkUpdt.getClass().getName().equals("java.lang.String")){
                    resp = "Create rep - Bulk manage error for updating tasks: " + bulkUpdt.toString();
                } else {
                    // inserting times
                    // here wherevalList does not matter what it is, as we're inserting data
                    // it only matters for updating data
                    Object insTimes = bulkManage(true, "", wherevalList, "times", dates, true);

                    if(insTimes.getClass().getName().equals("java.lang.String")){
                        resp = "Create rep - Bulk manage error for inserting times: " + insTimes.toString();
                    } else {
                        WritableArray timeIds = (WritableArray) insTimes;

                        ArrayList<ContentValues> remData = new  ArrayList<ContentValues>();

                        // these variables will change with each stack of dates data
                        // as all dates are already stacked by their taskId in the initial pushing of data
                        int taskId = -1;
                        ArrayList<ContentValues> currTaskRems = new ArrayList<ContentValues>();
                        int tHours = -1;
                        int tMins = -1;
                        // note here, the amount of dates and timeIds should be
                        // the same, if they are not, then we have a problem
                        // with our timeIds generating code OR the inserting
                        // of date items
                        for(int i = 0; i < timeIds.size(); i++) {

                            // and their indexes should also align
                            // thus we can get the dateItems like this
                            int timeId = (int) timeIds.getDouble(i);

                            ContentValues dateItem = dates.get(i);

                            // since all of our dateItems are already stacked together
                            // by their taskId we don't need to get the baseRems data
                            // for each dateItem, we only need to get the baseRem data
                            // when a task_time(dates data) with a new taskId appears in the loop
                            int dateItTaskId = (int) dateItem.get("task_id");
                            if(taskId != dateItTaskId){
                                taskId = dateItTaskId;
                                currTaskRems = new ArrayList<ContentValues>();

                                // we generate taskHours and taskMInutes which will be used
                                // for our adjustRem
                                for (int j = 0; j < tMetaData.size(); j++) {
                                    HashMap<String, Object> tItem = tMetaData.get(j);

                                    int tTaskId = (int) tItem.get("id");

                                    if(tTaskId == taskId) {
                                        tHours = Integer.parseInt(tItem.get("hours").toString());
                                        tMins = Integer.parseInt(tItem.get("minutes").toString());
                                        break;
                                    }
                                }

                                // we get the baseRems of the current task
                                // and adjust them according to the current time_task(dateItem)
                                for(int j = 0; j < baseRems.size(); j++){

                                    ContentValues baseRem = baseRems.get(j);

                                    if((int) baseRem.get("taskId") == dateItTaskId){

                                        Object adjRemResp = adjustRem(baseRem, dateItem, tHours, tMins, timeId);

                                        if(adjRemResp.getClass().getName().equals("java.lang.String")) {
                                            resp = "create rep error, adjusting base reminders: " + adjRemResp.toString();
                                            return resp;
                                        }

                                        ContentValues addRem = (ContentValues) adjRemResp;

                                        addRem.remove("taskId");
                                        addRem.remove("id");
                                        addRem.remove("req_code");
                                        currTaskRems.add(addRem);
                                        remData.add(addRem);
                                    }
                                }

                            } else {
                                // we loop through the current tasks rems and adjust them
                                // according to the dateItem date and timeId
                                for(int j = 0; j < currTaskRems.size(); j++){
                                    Object adjRemResp = adjustRem(currTaskRems.get(j), dateItem, tHours, tMins, timeId);

                                    if(adjRemResp.getClass().getName().equals("java.lang.String")) {
                                        resp = "create rep error, adjusting currTaskRems reminders: " + adjRemResp.toString();
                                        return resp;
                                    }


                                    remData.add((ContentValues) adjRemResp);
                                }
                            }
                        }

                        // inserting reminders
                        // here wherevalList does not matter what it is, as we're inserting data
                        // it only matters for updating data
                        Object insRems = bulkManage(true, "", wherevalList, "reminders", remData, true);

                        if(insRems.getClass().getName().equals("java.lang.String")){
                            resp = "Create rep - Bulk manage error for inserting reminders: " + insRems.toString();
                        }
                    }
                }
            }
        } catch (Exception e){
            resp = "error: Exception caught in createRep: " + e.getMessage();
        } finally {
            if(resp.indexOf("error") == -1) {
                String schedResp = scheduleRing();

                if(schedResp.indexOf("error") != -1) {
                    resp = schedResp;
                    return resp;
                }
            }
            return resp;
        }
    }
    
    public Object manageRems(int remId){
        ArrayList<ContentValues> data = new ArrayList<ContentValues>();

        Object retStr = "";

        boolean notif = true;

        try {
            Calendar calDate = Calendar.getInstance();
            long t= calDate.getTimeInMillis();

            // adding one minute in miliseconds to the current date
            Date date = new Date(t + 60000);

            String dateString = formatter.format(date);

            date = new Date(t - 2*60000);

            String dateStrFCount = formatter.format(date);

            String remQuery = "SELECT *, reminders.id as rem_id, reminders.repeatability as rem_rep, " + 
            "reminders.hours as rem_hours, reminders.minutes as rem_minutes, " +
            "tasks.hours as task_hours, tasks.minutes as task_minutes " +
            "FROM reminders LEFT JOIN times ON (reminders.time_id = times.id) " + 
            "LEFT JOIN tasks ON (times.task_id = tasks.id) " +
            "WHERE (rem_id=? OR (reminders.done=? AND reminders.task_done=? AND reminders.ring_date<? )) " + 
            "ORDER BY ring_date";

            String[] remParams = {remId + "", "0", "0", dateString};

            data = rawQuery(remQuery, remParams);

            if(data.size() != 0){

                if(data.get(0).containsKey("error")){
                    retStr = data.get(0).get("error").toString();
                    return retStr;
                }

                ArrayList<ContentValues> updtData = new ArrayList<ContentValues>();

                ArrayList<ArrayList<String>> wherevalList = new ArrayList<ArrayList<String>>();

                ArrayList<HashMap<String, Object>> timeIds = new ArrayList<HashMap<String, Object>>();

                SQLiteDatabase db = myhelper.getWritableDatabase();
                db.beginTransaction();

                try {

                    for(int i = 0; i < data.size(); i++){

                        ContentValues reminder = data.get(i);
    
                        JSONObject rep = new JSONObject();
    
                        String ringDateStr = reminder.get("ring_date").toString();
    
                        int done = 1;
    
                        boolean remRepeatability = false;
    
                        if(reminder.get("rem_rep") != null){
    
                            rep = new JSONObject(reminder.get("rem_rep").toString());
    
                            if(!rep.isNull("type") && !rep.isNull("number")){
    
                                remRepeatability = true;
    
                                ringDateStr = genNewRing(dateString, ringDateStr, rep);
    
                                if(ringDateStr.indexOf("error") != -1){
                                    retStr = ringDateStr;
                                    return retStr;
                                }
    
                                done = 0;
                            }
                        }
                        
                        ContentValues newRem = new ContentValues();
    
                        newRem.put("done", done);
                        newRem.put("ring_date", ringDateStr);
    
                        updtData.add(newRem);

                        // here we also check if the reminder is an alarm or notification
                        // and if at least one of the reminders is an alarm
                        // we issue an alarm ringing for the whole stack
                        if(notif && ((int) reminder.get("notif")) == 0){
                            notif = false;
                        }
    
                        // before pushing the time_id we also have to check
                        // if its not already there
                        boolean put = true;
    
                        int timeId = (int) reminder.get("time_id");
    
                        for (int j = 0; j < timeIds.size(); j++) {
    
                            HashMap<String, Object> timeData = timeIds.get(j);
    
                            if(((int) timeData.get("timeId")) == timeId){
                                put = false;
    
                                if(!((boolean) timeData.get("remRepeatability")) && remRepeatability) {
                                    timeData.remove("remRepeatability");
                                    timeData.put("remRepeatability", remRepeatability);
                                }

                                if(((boolean) timeData.get("notif")) && !notif) {
                                    timeData.remove("notif");
                                    timeData.put("notif", notif);
                                }
    
                                timeIds.remove(j);
                                timeIds.add(timeData);
    
                                break;
                            }
                        }
    
                        if(put){
                            HashMap<String, Object> timeData = new HashMap<String, Object>();
                            timeData.put("timeId", timeId);
                            timeData.put("remRepeatability", remRepeatability);
                            timeData.put("notif", notif);
    
                            String countWhere = "time_id=? AND ring_date>?";
    
                            // so we gonna check for reminders with the current time id
                            // and we'll check for any reminders that are set to ring
                            // in the future, for that time task day, this query
                            // will also include the currently found rem for this
                            // time task
                            String[] whereArgs = {timeId + "", dateStrFCount};
    
                            long remCount = DatabaseUtils.queryNumEntries(db, "reminders", countWhere, whereArgs);
    
                            timeData.put("remCount", (int) remCount);
    
                            timeData.put("taskTitle", reminder.get("title").toString());
                                
                            timeData.put("taskDesc", reminder.get("desc"));
    
                            Object tHours = reminder.get("task_hours");
                            Object tMinutes = reminder.get("task_minutes");
                            String taskYear = reminder.get("year").toString();
                            String taskMonth = reminder.get("month").toString();
                            String taskDay = reminder.get("day").toString();
    
                            String taskDate = Utils.formatNamedDate(taskYear, taskMonth, taskDay, true);
    
                            if(tHours != null && reminder.get("task_hours").toString().length() > 0 && 
                                reminder.get("task_minutes").toString().length() > 0 && tMinutes != null) {

                                taskDate += " at " + tHours + ":" + tMinutes;

                            }
    
                            timeData.put("time", taskDate);

                            timeIds.add(timeData);
                        }
    
                        ArrayList<String> whereVals = new ArrayList<String>();
                        whereVals.add(reminder.get("rem_id").toString());
                        wherevalList.add(whereVals);
    
                    }
                    db.setTransactionSuccessful();
                } catch (Exception e) {
                    db.endTransaction();
                    myhelper.close();
                    retStr = "exception error looping through reminders " + e.getMessage();
                    return retStr;
                }

                db.endTransaction();
                myhelper.close();
                
                

                try {
                    Object resp = bulkManage(false, "id=?", wherevalList, "reminders", updtData, true);
        
                    if(resp.getClass().getName().equals("java.lang.String")){
                        retStr = "Bulk manage error: " + resp.toString();
                    } else {

                        if((Boolean) resp){

                            String repResp = createRep(calDate.get(Calendar.YEAR), calDate.get(Calendar.MONTH));

                            if(repResp.indexOf("error") != -1){
                                retStr = repResp;
                                return retStr;
                            }

                            retStr = timeIds;

                        } else {
                            retStr = "error: Db transaction for update was not successful";
                        }

                    }
                } catch(Exception e) {
                    retStr = "error: so this catch happens " + e.getMessage();
                    return retStr;
                }
            } else {
                retStr = "error: No rems found in manageRems";
            }

        } catch (Exception e) {
            retStr = "manage rems error happens: " + e.getMessage();
        } finally {
            return retStr;
        }
        
    }

    public String dontRepRem(int mainTimeId){

        String resp = "";

        SQLiteDatabase db = myhelper.getWritableDatabase();
        db.beginTransaction();

        try {
            ContentValues values = new ContentValues();
            values.put("done", 1);

            String[] whereValArr = {mainTimeId + ""};
            db.update("reminders", values, "time_id=?", whereValArr);

            db.setTransactionSuccessful();
        } catch (Exception e) {
            resp = "dontRepRem exception error: " + e.getMessage();
        } finally {
            db.endTransaction();
            myhelper.close();
            scheduleRing();
            return resp;
        }
    }

    static class myDbHelper extends SQLiteOpenHelper {
        // TODO: sync this database name with javascript part
        private static final String DATABASE_NAME = "TestDatabase.db"; // Database Name
        private static final String TABLE_NAME = "reminders"; // Table Name
        private static final int DATABASE_Version = 1; // Database Version

        // columns
        private static final String UID = "id"; // Column 1 (Primary Key)
        // private static final String BEFORE = "before"; // Column 2
        // private static final String NOTIF = "notif"; // Column 3
        // private static final String REP = "repeatability"; // Column 4
        // private static final String HOURS = "hours"; // Column 5
        // private static final String MINS = "minutes"; // Column 6
        private static final String RING_DATE = "ring_date"; // Column 7
        // private static final String SAME_TIME = "same_time"; // Column 8
        // private static final String DONE = "done"; // Column 9
        private static final String REQ_CODE = "req_code"; // Column 10
        // private static final String TASK_REM_ID = "task_rem_id"; // Column 11
        // private static final String TASK_DONE = "task_done"; // Column 12
        // private static final String TIME_ID = "time_id"; // Column 12
        private static final String NOTIF = "notif";

        private Context context;

        public myDbHelper(Context context) {
            super(context, DATABASE_NAME, null, DATABASE_Version);
            this.context = context;
        }

        @Override
        public void onCreate(SQLiteDatabase db) {
            // try {
            //     db.execSQL(CREATE_TABLE);
            // } catch (Exception e) {
            //     Log.d("Create Error", e.getMessage());
            // }
        }

        @Override
        public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
            // try {
            //     Log.d("upgrade", "OnUpgrade");
            //     db.execSQL(DROP_TABLE);
            //     onCreate(db);
            // } catch (Exception e) {
            //     Log.d("Upgrade Error", e.getMessage());
            // }
        }

        // OPTION
        @Override
        public void onConfigure(SQLiteDatabase db){
            // key so this is a safety precaution
            // cause sometimes we'll execute to db transactions
            // on the same time for two seperate components working at the same time
            // so thats why we gonna yield for one second, seems alright right now
            if(db.inTransaction()){
                db.yieldIfContendedSafely(100);
            }
            // and this is another option of maybe achieving the same locked
            // db issue work around, BUUUT this will work only when 
            // a db is locked because of reading and when you want to write
            // or read into it, so above option is better
            // if(db.isDbLockedByCurrentThread()){
                // db.enableWriteAheadLogging();
            // }
        }
    }
}