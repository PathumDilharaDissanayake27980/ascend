package com.eliteswe.roadmap;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class BootReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context ctx, Intent intent) {
        String a = intent.getAction();
        if (Intent.ACTION_BOOT_COMPLETED.equals(a)
                || "android.intent.action.MY_PACKAGE_REPLACED".equals(a)) {
            Scheduler.rearm(ctx);
        }
    }
}
