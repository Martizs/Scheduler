package com.schedulerbypk2;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;

import android.os.Bundle;
import android.os.Build;
import android.app.KeyguardManager;
import android.view.WindowManager;
import android.content.Context;
import android.app.Activity;
import javax.annotation.Nullable;
import android.app.NotificationChannel;
import android.app.NotificationManager;


public class MainActivity extends ReactActivity {

  static boolean active = false;

  public static String CHANNEL_ID = "com.schedulerbypk2";

  @Override
  public void onCreate(Bundle savedInstanceState) {
    createNotificationChannel();
    // some show over lock screen functionality
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O_MR1) {
      setShowWhenLocked(true);
      setTurnScreenOn(true);
      KeyguardManager keyguardManager = (KeyguardManager) getSystemService(Context.KEYGUARD_SERVICE);
      if (keyguardManager != null)
        keyguardManager.requestDismissKeyguard(this, null);
    } else {
      getWindow().addFlags(WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD
          | WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED | WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON);
    }
    // show over lock screen functionality end

    super.onCreate(savedInstanceState);
  }

  private void createNotificationChannel() {
    // Create the NotificationChannel, but only on API 26+ because
    // the NotificationChannel class is new and not in the support library
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      int importance = NotificationManager.IMPORTANCE_HIGH;
      NotificationChannel channel = new NotificationChannel(CHANNEL_ID, "com.schedulerbypk2", importance);
      NotificationManager notificationManager = getSystemService(NotificationManager.class);
      notificationManager.createNotificationChannel(channel);
    }
  }

  @Override
  public void onStart() {
      super.onStart();
      active = true;
  }

  @Override
  public void onStop() {
      super.onStop();
      active = false;
  }

  public static class AlarmActivityDelegate extends ReactActivityDelegate {
    private static final String RNG_CODE = "rngCode";
    private static final String ERROR = "error";
    private static final String MAIN_TIME_ID = "mainTimeId";
    private static final String NOTIF_RING = "notifRing";
    private static final String ALARM = "alarm";
    private static final String REM_REP = "remWillRep";
    
    private Bundle mInitialProps = null;
    private final @Nullable Activity mActivity;

    public AlarmActivityDelegate(Activity activity, String mainComponentName) {
      super(activity, mainComponentName);
      this.mActivity = activity;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
      // bundle is where we put our alarmID with launchIntent.putExtra
      Bundle bundle = mActivity.getIntent().getExtras();
      if (bundle != null && bundle.containsKey(RNG_CODE) && bundle.containsKey(MAIN_TIME_ID)) {
        mInitialProps = new Bundle();
        // put any initialProps here
        mInitialProps.putInt(RNG_CODE, bundle.getInt(RNG_CODE));
        mInitialProps.putInt(MAIN_TIME_ID, bundle.getInt(MAIN_TIME_ID));

        if(bundle.containsKey(ERROR)){
          mInitialProps.putString(ERROR, bundle.getString(ERROR));
        }

        if(bundle.containsKey(NOTIF_RING)){
          mInitialProps.putBoolean(NOTIF_RING, bundle.getBoolean(NOTIF_RING));
        }

        if(bundle.containsKey(ALARM)){
          mInitialProps.putBoolean(ALARM, bundle.getBoolean(ALARM));
        }

        if(bundle.containsKey(REM_REP)){
          mInitialProps.putBoolean(REM_REP, bundle.getBoolean(REM_REP));
        }
      }
      super.onCreate(savedInstanceState);
    }

    @Override
    protected Bundle getLaunchOptions() {
      return mInitialProps;
    }
  };

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new AlarmActivityDelegate(this, getMainComponentName());
  }


  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "SchedulerByPK2";
  }
}
