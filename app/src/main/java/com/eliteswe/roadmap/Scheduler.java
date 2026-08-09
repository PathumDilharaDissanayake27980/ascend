package com.eliteswe.roadmap;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;

import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Schedules one notification per timetable slot.
 * The web app hands us a JSON array of {at, title, body}; we set an alarm for each.
 * The list is persisted so BootReceiver can re-arm everything after a restart.
 */
public class Scheduler {

    private static final String PREFS = "roadmap_prefs";
    private static final String KEY_JSON = "slot_schedule";
    private static final int BASE_CODE = 1000;
    private static final int MAX_ALARMS = 120;

    public static void save(Context ctx, String json) {
        ctx.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
           .edit().putString(KEY_JSON, json).apply();
    }

    public static String saved(Context ctx) {
        return ctx.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
                  .getString(KEY_JSON, "[]");
    }

    /** Replace every scheduled reminder with the supplied list. */
    public static void sync(Context ctx, String json) {
        save(ctx, json);
        cancelAll(ctx);

        AlarmManager am = (AlarmManager) ctx.getSystemService(Context.ALARM_SERVICE);
        if (am == null) return;

        try {
            JSONArray arr = new JSONArray(json);
            long now = System.currentTimeMillis();
            int code = BASE_CODE;

            for (int i = 0; i < arr.length() && code - BASE_CODE < MAX_ALARMS; i++) {
                JSONObject o = arr.getJSONObject(i);
                long at = o.getLong("at");
                if (at <= now) continue;

                Intent in = new Intent(ctx, SlotReceiver.class);
                in.putExtra("title", o.optString("title", "Next block"));
                in.putExtra("body", o.optString("body", ""));
                in.setData(android.net.Uri.parse("slot://" + code));

                int flags = PendingIntent.FLAG_UPDATE_CURRENT;
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                    flags |= PendingIntent.FLAG_IMMUTABLE;
                }
                PendingIntent pi = PendingIntent.getBroadcast(ctx, code, in, flags);

                if (canExact(am)) {
                    am.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at, pi);
                } else {
                    // No exact-alarm permission: fire within a 5 minute window instead.
                    am.setWindow(AlarmManager.RTC_WAKEUP, at, 5 * 60 * 1000L, pi);
                }
                code++;
            }
        } catch (Exception ignored) { }
    }

    private static boolean canExact(AlarmManager am) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            try { return am.canScheduleExactAlarms(); } catch (Exception e) { return false; }
        }
        return true;
    }

    public static void cancelAll(Context ctx) {
        AlarmManager am = (AlarmManager) ctx.getSystemService(Context.ALARM_SERVICE);
        if (am == null) return;
        for (int i = 0; i < MAX_ALARMS; i++) {
            int code = BASE_CODE + i;
            Intent in = new Intent(ctx, SlotReceiver.class);
            in.setData(android.net.Uri.parse("slot://" + code));
            int flags = PendingIntent.FLAG_NO_CREATE;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                flags |= PendingIntent.FLAG_IMMUTABLE;
            }
            PendingIntent pi = PendingIntent.getBroadcast(ctx, code, in, flags);
            if (pi != null) { am.cancel(pi); pi.cancel(); }
        }
    }

    /** Re-arm from the persisted list (after a reboot). */
    public static void rearm(Context ctx) {
        sync(ctx, saved(ctx));
    }
}
