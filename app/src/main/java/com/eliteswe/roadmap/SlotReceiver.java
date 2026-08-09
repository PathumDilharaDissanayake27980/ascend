package com.eliteswe.roadmap;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class SlotReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context ctx, Intent intent) {
        Notifier.createChannel(ctx);
        String title = intent.getStringExtra("title");
        String body = intent.getStringExtra("body");
        Notifier.show(ctx,
                title == null ? "Next block" : title,
                body == null ? "" : body);
    }
}
