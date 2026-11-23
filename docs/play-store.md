# Publishing భగవద్గీత on Google Play

Checklist for taking the app from GitHub Releases to the Play Store with a **personal** developer account.
Google's rules below were checked on 2026-11-23 against the Play Console help pages; re-check before relying on
numbers, they change.

## 0. Before you start

- [ ] **Rights to the commentary.** The Telugu translation and commentary belong to Swami Mukundananda / JKYog.
      The API we use says "free for non-monetised apps". Play Store distribution is a bigger audience and
      rights holders can file IP takedowns there. Email JKYog for written permission before step 4. Keep the
      app free, no ads, no in-app purchases.
- [ ] Decide **personal vs organisation** account. Personal: 25 USD, ID check, and the 12-tester / 14-day closed
      test below. Organisation: needs a registered business with a D-U-N-S number but skips the testing gate.
      For this app, personal.
- [ ] Use the same Google account as Expo (krishnakousthubha@gmail.com) so EAS credentials stay in one place.
- [ ] Have ready: government photo ID and a credit card in the same legal name, an Android phone signed in to
      that Google account, 12 or more friends with Android phones and Gmail addresses.

## 1. Create the developer account (1–3 days, mostly waiting)

1. Go to https://play.google.com/console/signup, choose **Personal**.
2. Pay the one-time 25 USD fee.
3. Identity verification: upload ID, confirm card. Google emails when approved.
4. Install the **Play Console** app on your Android phone and complete **device verification** (required for
   personal accounts before publishing).
5. Account details: developer name (shown on the store), contact email (shown publicly on the listing),
   phone (verified, not shown). Pick a Gmail alias or dedicated address if you don't want your main one public.

## 2. Create the app in Play Console (30 min)

1. **Create app** → name `భగవద్గీత`, default language Telugu (te-IN), type App, Free.
2. Fill the **Dashboard → Set up your app** tasks. All are mandatory before any release:
   - Privacy policy URL. The app stores reading progress on-device only and sends nothing anywhere.
     Host a short policy at `docs/privacy-policy.md` in this repo and use its GitHub URL.
   - App access: "All functionality is available without special access".
   - Ads: No.
   - Content rating questionnaire: Reference / Books category → will come out "Everyone".
   - Target audience: 18 and over (simplest; avoids the Families policy). Not designed for children.
   - News app: No. COVID app: No. Data safety: "Does not collect or share user data".
   - Government app: No. Financial features: No. Health: No.
3. **Store listing** (Main store listing):
   - Short description (max 80 chars) and full description (max 4000) in Telugu, optional English localisation.
   - App icon 512×512 PNG (export from `assets/images/icon.png`).
   - Feature graphic 1024×500 PNG (make one from a chapter painting + title).
   - Phone screenshots: 2–8, between 320 and 3840 px, 16:9 or 9:16. The originals behind `docs/screenshots/`
     (about 776×1430) qualify; capture at full phone resolution for best results.
   - Category: Books & Reference. Tags: religion, Hinduism, offline.
   - Contact email (public). Website: the GitHub repo.

## 3. Build and upload the first bundle (1 hour)

Play requires an **.aab**, not the APK we ship on GitHub. `eas.json` already has a `production` profile that
builds an app bundle with auto-incrementing versionCode.

```bash
npm run data                                              # data must be present locally
npx eas-cli build --platform android --profile production # produces .aab, EAS manages the upload keystore
```

The **first upload must be manual**: download the .aab from expo.dev and drag it into
Play Console → Testing → **Internal testing** → Create new release. Accept **Play App Signing** when asked;
EAS's keystore becomes the upload key, Google holds the app signing key.

Internal testing has no review and is instant. Add yourself as a tester, install from the opt-in link,
confirm the Play build works.

### Automate later uploads

1. Google Cloud Console → create a **service account**, download its JSON key.
2. Play Console → Users and permissions → invite that service-account email with
   "Release to testing tracks" (and later "Release to production") on this app.
3. Store the key outside git, e.g. `~/.config/gita/play-service-account.json` (already matched by nothing in
   the repo; `*.json` keys are never committed).
4. Add to `eas.json`:
   ```json
   "submit": { "production": { "android": {
     "serviceAccountKeyPath": "/Users/<you>/.config/gita/play-service-account.json",
     "track": "internal", "releaseStatus": "draft" } } }
   ```
5. Then `npx eas-cli build --platform android --profile production --auto-submit` uploads each build.

## 4. Closed test: 12 testers, 14 consecutive days

This is the gate Google puts on personal accounts created after 13 Nov 2023. Production is locked until it's done.

1. Testing → **Closed testing** → create a track (name "Beta"). Promote the internal build into it.
2. Testers: create a **Google Group** (e.g. gita-beta@googlegroups.com) and add it as the tester list. Adding
   people later is then one click. Each tester needs a Gmail address and an Android phone.
3. Submit the closed-test release for **review**. First closed-test review can take several days.
4. When live, send testers the opt-in link. They must: open the link, tap "Become a tester", install from Play,
   and **stay opted in and installed for 14 consecutive days**. If someone leaves and rejoins, their clock
   restarts. Aim for 15+ people so dropouts don't cost you the window.
5. Ask them to actually use it; Google's questionnaire asks about engagement. Collect feedback in a GitHub
   Discussion or a WhatsApp group.
6. Ship fixes during the window by promoting new builds to the same track. That does not reset anything.

## 5. Apply for production access (about 7 days review)

1. After 14 days, Dashboard shows **Apply for production**. Answer the three sections honestly:
   how testers were recruited and what they used, what the app is and who it's for, what changed from feedback.
2. Google replies by email within roughly a week. If denied, fix what they cite and reapply.

## 6. Production release

1. Production → Create new release → pick the tested build (or a newer one) → release notes in Telugu and English.
2. Review of a first production release commonly takes 1–7 days.
3. Roll out to 100% or staged. The store listing goes live when the release is approved.
4. Keep publishing GitHub Releases too; `scripts/release.sh` is unchanged by any of this.

## Timeline

| Step | Elapsed |
|---|---|
| Account, ID and device verification | days 0–3 |
| App setup, listing, first .aab, internal test | day 3–4 |
| Closed-test review | day 4–8 |
| 14-day tester window | day 8–22 |
| Production access review | day 22–29 |
| Production release review | day 29–33 |

Plan on **about five weeks** from account creation to a public listing.
