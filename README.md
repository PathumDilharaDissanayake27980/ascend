# Ascend — Android build

This produces a real, installable APK with background daily notifications.
You do **not** need Android Studio, a fast laptop, or any local setup.
GitHub builds it for you, free.

---

## Get the APK in ~10 minutes

1. Go to <https://github.com/new> and create a repository. Name it
   `elite-roadmap`. Make it **Private**. Do not add a README.

2. Upload this entire folder's contents to the repo:
   - On the empty repo page, click **uploading an existing file**.
   - Drag in `settings.gradle`, `build.gradle`, `gradle.properties`,
     the `app` folder, and the `.github` folder.
   - Important: GitHub's web uploader sometimes skips folders starting with a dot.
     If `.github` does not appear, create it manually: click **Add file → Create new file**,
     type `.github/workflows/build-apk.yml` as the filename, and paste the contents
     of that file from this folder.
   - Click **Commit changes**.

3. Open the **Actions** tab. A run called **Build APK** starts automatically.
   If it doesn't, click **Build APK** in the left sidebar, then **Run workflow**.

4. Wait ~5 minutes for the green tick. Click the run, scroll to **Artifacts**,
   and download **elite-roadmap-apk**. Unzip it — inside is `app-debug.apk`.

5. Copy the APK to your phone. Open it. Android will warn about installing from
   an unknown source — allow it for your file manager, then install.
   (This warning is normal for any app not from the Play Store. It's your own build,
   from your own repo, and you can read every line of source in this folder.)

6. On first launch, allow notifications. Set your reminder time in **Settings**
   inside the app. That's it.

---

## What the app does

- Loads the full roadmap offline. No internet needed, ever.
- Saves progress in the WebView's local storage, in the app's private data
  directory. It survives closing the app and rebooting the phone.
- Schedules a **daily notification** at your chosen time via `AlarmManager`.
  It re-arms itself after reboot via `BootReceiver`.
- Notifications keep working when the app is closed. That is the whole reason
  this native wrapper exists instead of just a bookmark.

---

---

## Reminders

The app schedules **one Android alarm per timetable slot**, a week ahead, and re-arms
them automatically after a reboot or an app update. They fire with the app closed.

On first launch, allow notifications. On Android 12 and newer you may also be asked to
allow **exact alarms** — without it Android is free to fire reminders up to five minutes
late. The Settings screen shows an "Allow exact alarms" button if the permission is missing.

Battery optimisation can still delay alarms on some phones (Xiaomi, Oppo, Samsung are the
usual offenders). If reminders drift, find your phone's battery settings and set this app
to **unrestricted**.

---

## Keeping your progress safe

The app's storage is private to the app, which means **uninstalling deletes it**.
Before you uninstall or switch phones:

- Open the app, tap **Export**, and save the JSON file somewhere real
  (Drive, a private GitHub repo, email to yourself).
- On the new device, tap **Import** and pick that file.

Do this once a month. Two years of honest checkmarks is not something you
want to lose to a factory reset.

---

## Updating the roadmap later

Replace `app/src/main/assets/index.html` with a newer version, bump
`versionCode` in `app/build.gradle`, and push. Actions rebuilds the APK.
Install it over the old one — your saved progress stays, because the
package name and signing key are unchanged.

---

## If the build fails

Open the failed run in the Actions tab and read the red step. The two common causes:

- **`.github/workflows/build-apk.yml` missing** — the web uploader dropped the dot-folder.
  Create the file manually as described in step 2.
- **SDK licence errors** — re-run the workflow; the setup action usually resolves it
  on a second attempt.

The full build log is yours to read. That's the point of building it this way
rather than trusting a binary from a stranger.
