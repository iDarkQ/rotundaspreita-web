# ROTUNDÁSPREITA

![ROTUNDÁSPREITA HOME PAGE](docs/website-preview.png "ROTUNDÁSPREITA HOME PAGE")

## 🚗 About

**ROTUNDÁSPREITA** is a web application built for learners in **Portugal** preparing to become **driving instructors** or **driving school directors**. The platform helps users get ready for official exams by offering a premium subscription to a large, verified question bank and powerful learning tools.

Users with a subscription get access to:

- ✅ **1000+ verified questions** tailored for instructor/director exams. Ideal for efficient exam preparation
- 📊 **Advanced analytics** to track strengths, weaknesses, and performance trends
- 🧠 **Clean, distraction-free test interface** designed for deep focus and realistic practice
- 🔄 **Unlimited mock test attempts** for boosted confidence

Learn more at 🔗 [https://rotundaspreita.com](https://rotundaspreita.com)

---

## 📸 Screenshots

### 📋 Panel / Dashboard

![ROTUNDÁSPREITA PROFILE PAGE](docs/profile.png "ROTUNDÁSPREITA PROFILE PAGE")

### 📃 Test Interface

![ROTUNDÁSPREITA TEST PAGE](docs/test.png "ROTUNDÁSPREITA TEST PAGE")

### ✅ Finished Test Interface

![ROTUNDÁSPREITA TEST PAGE](docs/test-finished.png "ROTUNDÁSPREITA TEST PAGE")

### 📚 Library Interface

![ROTUNDÁSPREITA LIBRARY PAGE](docs/library.png "ROTUNDÁSPREITA LIBRARY PAGE")

---

## 🛠 Technologies

ROTUNDÁSPREITA is built using modern web technologies to ensure strong performance, scalability, and excellent user experience:

- **Next.js** – Full-stack React framework
- **React** – UI library
- **Tailwind CSS** – Utility-first styling
- **TypeScript** – Type safety
- **Prisma** – ORM for database access
- **PostgreSQL** – Relational database
- **HeadlessUI** – Accessible UI components
- **JWT** – Authentication
- **Stripe** – Payments/subscriptions

## End-to-end and visual regression tests

Playwright protects key screens with strict desktop and mobile screenshots and checks login, registration, question management, exam navigation/results, and the subscription checkout handoff. The payment flow uses a test-only mocked Stripe Checkout page and never creates a real charge. The suite seeds fixed test users and studies into a dedicated PostgreSQL test database; it will refuse to seed a database unless its name contains a separate `test` segment.

For local runs, start a PostgreSQL database reserved for these tests, then set `PLAYWRIGHT_DATABASE_URL` to its connection string. For example, in PowerShell:

```powershell
docker run --detach --name rotundaspreita-e2e-db --publish 5434:5432 --env POSTGRES_USER=playwright --env POSTGRES_PASSWORD=playwright --env POSTGRES_DB=rotundaspreita_e2e_test postgres:15
$env:PLAYWRIGHT_DATABASE_URL = "postgresql://playwright:playwright@127.0.0.1:5434/rotundaspreita_e2e_test"
yarn playwright install chromium
yarn test:e2e
```

Remove the temporary database container when you no longer need it:

```powershell
docker rm --force rotundaspreita-e2e-db
```

The test run pushes the Prisma schema and seeds only its fixed test users/studies in that database. It starts its own Next.js server with test-only authentication and Stripe settings and does not reuse an existing server. Visual baselines are platform-specific, so the pull-request workflow uses Windows Chromium, matching the committed baselines. To intentionally approve a visual change, run `yarn test:e2e:update` on Windows, review the changed snapshots, and commit them with the UI change. The GitHub Actions end-to-end workflow runs this suite for pull requests.

## Push reminders

Push reminders require these values in `.env.production` before building the
production image:

- `NEXT_PUBLIC_VAPID_PUBLIC_KEY` — the public VAPID key (embedded in the client
  bundle).
- `VAPID_PRIVATE_KEY` — the private VAPID key; keep it secret.
- `VAPID_SUBJECT` — a contact URI such as `mailto:contact@example.com`.

Generate a VAPID key pair with `yarn web-push generate-vapid-keys`. Configure a
separate strong random `REMINDER_WORKER_TOKEN` in the Compose `.env` file. The
production deployment starts a dedicated worker container that polls the
protected reminder endpoint once per minute; Compose requires the token before
starting the services. The app's database migration is applied by the existing
`migrate` service.

### Test reminders locally

Use a local development database and a separate VAPID key pair; do not point
the local app at the production database or reuse production VAPID keys. A
public/private key mismatch can cause cryptographic signing errors (including
errors mentioning a digest).

1. Generate a local key pair:

   ```powershell
   yarn web-push generate-vapid-keys
   ```

2. Put the generated values in `.env.local` (keep this file out of Git), along
   with a local-only worker token and the connection string for your local
   database:

   ```dotenv
   NEXT_PUBLIC_VAPID_PUBLIC_KEY=<generated public key>
   VAPID_PRIVATE_KEY=<matching generated private key>
   VAPID_SUBJECT=mailto:local@example.invalid
   REMINDER_WORKER_TOKEN=local-reminder-test-token
   DATABASE_URL=<local development database connection string>
   ```

   Keep both VAPID keys from the same generated pair. Restart the dev server
   after changing these values so the public key is included in the client.

3. Start the app with `yarn dev`, sign in locally, and open `/notifications`.
   Allow notifications in the browser, enable push notifications, and select
   today's weekday. Set the reminder time to the next minute, save the
   preferences, and invoke the endpoint as soon as that minute arrives. The
   dispatcher checks the scheduled time for up to two minutes after it occurs.

4. Within that two-minute window, invoke the local worker endpoint from
   PowerShell, using the same local-only token configured above:

   ```powershell
   Invoke-RestMethod -Method Post `
     -Uri http://localhost:3000/api/internal/reminders `
     -Headers @{ Authorization = "Bearer local-reminder-test-token" }
   ```

   A successful send returns a `sent` count. The reminder is unique per user
   and local date, so use a different local test user or clear that user's
   local delivery record before testing again on the same day.

If the response reports a failure, inspect the matching
`ReminderDelivery.lastError` in the local database, using a database client
whose connection is explicitly pointed at that local database. Confirm the
local public key matches its private key and the browser subscription was
created after setting that public key. Never paste private VAPID keys or worker
tokens into issue reports.
