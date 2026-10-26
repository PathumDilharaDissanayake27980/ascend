# Ascend

Your study plan for the six-track engineering career guide (Foundations → Software → Database → Cloud → Security → ML → AI), with portfolio projects, certifications and the original curriculum mixed in. Every lesson comes with a hands-on task.

- **Web app:** https://pathumdilharadissanayake27980.github.io/ascend/
- **Android app:** https://github.com/PathumDilharaDissanayake27980/ascend/releases/latest
- **Linked app:** [ShiftWise](https://pathumdilharadissanayake27980.github.io/Shiftwise/) plans your week around your shift roster and tells Ascend when you are free.

---

## How the two apps work together

```
ShiftWise (shifts, sleep, balance)                     Ascend (what to study)
  roster → planner → study blocks ──"Open in Ascend"──▶  lessons placed in exactly those blocks
  log & insights ◀──"Send progress"── completed sessions
```

1. In **ShiftWise**, keep your roster up to date. Its planner fits about 10 hours a week of career work (4h lessons, 4h project, 1.5h exam prep) into the free time your shifts leave. It protects sleep and meals, gives you a recharge day, and always leaves part of every day free.
2. Tap **Open in Ascend** (on Today, in the sidebar, or the top-bar icon). On an Android phone with the app installed, Ascend opens directly; otherwise the web version opens. Ascend fills the next 14 days with lessons at exactly those times.
3. Study, and tick blocks off in Ascend.
4. Tap **Send progress** (Settings or the sidebar). ShiftWise opens and offers to add the finished sessions to your log, so they count in its insights.

Do this whenever your roster changes, and at least once a week. Days that ShiftWise hasn't planned yet use a fallback week of about 10 hours, with nothing scheduled after 9:30 PM.

Everything travels inside the link (the part after `#`), which browsers never send to a server.

## What gets scheduled

| ShiftWise block | Becomes in Ascend |
|---|---|
| Lessons | 6 in 10 from the six-track guide (the first unfinished track, plus the next one once the guide reaches its month), 4 in 10 from the original curriculum: DSA, review, and a rotating deep-dive (Software Engineering, Java, Data, AI/ML, Career) |
| Project | Portfolio projects from the guide (F-1 → SD-1 → … → Capstone), each in five steps: plan, core, prove, ship, stretch. Every fourth block is from the original Projects track. |
| Exam prep | The certification whose prep window is open (GH-900 first, then GH-200, AWS SAA, Terraform, Security+, …). Six steps per exam, from the exam guide to booking. With no exam due, the block is review. |

**Guide month.** The guide assumes about 17 hours a week. Ascend scales its month counter by your real weekly hours from ShiftWise, so the timeline stays honest, and the next phase starts only when you get there.

**Hands-on tasks.** Each lesson shows one concrete task, such as "In your F-1 repo, use type hints in real code and add a pytest test", or "Solve two NeetCode problems with sliding window". A block is done when the task is done.

## Installing the Android app

1. Open the [latest release](https://github.com/PathumDilharaDissanayake27980/ascend/releases/latest) on your phone and download `ascend.apk`.
2. Open it and allow installing from your browser when Android asks.
3. On first launch, allow notifications (and exact alarms on Android 12+).

**Upgrading from a version before 2.0:** older builds were signed with a temporary key that changed on every build, so Android refuses to install over them. Once only: open the old app, tap **Export backup**, uninstall it, install the new APK, then **Import backup**. From 2.0 on, every update installs over the previous one and keeps your progress.

## Reminders

The Android app schedules one alarm per study block a week ahead. Alarms fire with the app closed and re-arm after a reboot. If they drift, set the app's battery usage to **Unrestricted**. ShiftWise separately sends shift, sleep and daily-brief alerts to your phone.

## Keeping your progress safe

Progress is stored on the device. Tap **Export backup** once a month and keep the file somewhere safe.

## Building

Everything builds on GitHub Actions; you don't need Android Studio.

| Workflow | When it runs | What it does |
|---|---|---|
| `build-apk.yml` | Push to `main` | Builds the release APK, signed with the permanent key from the `ASCEND_KEYSTORE_B64` and `ASCEND_KEYSTORE_PASSWORD` secrets, and publishes it as the latest release |
| `deploy-pages.yml` | Push that changes `app/src/main/assets/` | Publishes the web version to GitHub Pages |

The app itself is `app/src/main/assets/index.html` (UI and scheduling) plus `guide.js` (the six-track curriculum, projects, certifications and hands-on tasks). The Java code wraps it in a WebView and adds alarms and the `ascend://import` link that ShiftWise opens.

**The signing key** is backed up outside this repo, in `E:\SE ROADMAP\ascend-signing\`. Keep that folder private. If the key is lost, future APKs can't install over the current app.
