package com.eliteswe.roadmap;

import android.Manifest;
import android.app.Activity;
import android.app.AlarmManager;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import java.util.regex.Pattern;
import android.provider.Settings;
import android.view.KeyEvent;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {

    private WebView web;

    /**
     * ShiftWise opens ascend://import?sw=<plan> (the timetable) or ?link=<connection> (cloud wiring).
     * Only base64url payloads are accepted. Returns {"sw"|"link", payload} or null.
     */
    private static final Pattern PAYLOAD = Pattern.compile("[A-Za-z0-9_-]{1,60000}");

    private static String[] payloadFrom(Intent intent) {
        if (intent == null) return null;
        Uri u = intent.getData();
        if (u == null || !"ascend".equals(u.getScheme()) || !"import".equals(u.getHost())) return null;
        for (String key : new String[]{"sw", "link"}) {
            String p = u.getQueryParameter(key);
            if (p != null && PAYLOAD.matcher(p).matches()) return new String[]{key, p};
        }
        return null;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Notifier.createChannel(this);
        requestNotificationPermission();

        web = new WebView(this);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setAllowFileAccess(true);
        s.setCacheMode(WebSettings.LOAD_DEFAULT);

        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView v, String url) {
                // reference links open in the real browser, not inside the app
                if (url != null && (url.startsWith("http://") || url.startsWith("https://"))) {
                    try {
                        startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url)));
                        return true;
                    } catch (Exception ignored) { }
                }
                return false;
            }
        });
        web.addJavascriptInterface(new Bridge(), "AndroidBridge");
        String[] in = payloadFrom(getIntent());
        web.loadUrl("file:///android_asset/index.html" + (in != null ? "#" + in[0] + "=" + in[1] : ""));

        setContentView(web);
    }

    private void requestNotificationPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS)
                    != PackageManager.PERMISSION_GRANTED) {
                requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS}, 101);
            }
        }
    }

    private class Bridge {
        /** Full list of upcoming slot reminders, as JSON [{at,title,body}]. */
        @JavascriptInterface
        public void syncSchedule(String json) {
            Scheduler.sync(MainActivity.this, json);
        }

        @JavascriptInterface
        public void requestPermission() {
            runOnUiThread(new Runnable() {
                public void run() {
                    requestNotificationPermission();
                    askExactAlarms();
                }
            });
        }

        @JavascriptInterface
        public void notifyNow(String title, String body) {
            Notifier.show(MainActivity.this, title, body);
        }

        @JavascriptInterface
        public boolean canExact() {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                AlarmManager am = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
                try { return am != null && am.canScheduleExactAlarms(); } catch (Exception e) { return false; }
            }
            return true;
        }

        @JavascriptInterface
        public void openExactSettings() {
            runOnUiThread(new Runnable() { public void run() { askExactAlarms(); } });
        }


        /** Second copy of the app state, outside the WebView, so it survives
         *  the system clearing WebView storage. */
        @JavascriptInterface
        public void store(String key, String value) {
            getSharedPreferences("roadmap_state", Context.MODE_PRIVATE)
                    .edit().putString(key, value).apply();
        }

        @JavascriptInterface
        public String load(String key) {
            return getSharedPreferences("roadmap_state", Context.MODE_PRIVATE)
                    .getString(key, null);
        }

        @JavascriptInterface
        public boolean isNative() { return true; }
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        String[] in = payloadFrom(intent);
        if (in != null && web != null) {
            // payload is [A-Za-z0-9_-] only, so it is safe inside a JS string literal
            String fn = "sw".equals(in[0]) ? "ascendReceive" : "ascendLink";
            web.evaluateJavascript("window." + fn + " && window." + fn + "('" + in[1] + "')", null);
        }
    }

    /** On Android 12+, minute-accurate alarms need the user to grant the permission. */
    private void askExactAlarms() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) return;
        AlarmManager am = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
        if (am == null) return;
        try {
            if (!am.canScheduleExactAlarms()) {
                Intent i = new Intent(Settings.ACTION_REQUEST_SCHEDULE_EXACT_ALARM);
                i.setData(Uri.parse("package:" + getPackageName()));
                startActivity(i);
            }
        } catch (Exception ignored) { }
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK && web != null && web.canGoBack()) {
            web.goBack();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }
}
