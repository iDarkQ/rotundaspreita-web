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

Playwright protects key screens with strict desktop and mobile screenshots and checks the login, test-taking, and question-management flows. The suite seeds an administrator and sample study into a dedicated PostgreSQL test database; it will refuse to seed a database unless its name contains a separate `test` segment.

For local runs, start a PostgreSQL database reserved for these tests, then set `PLAYWRIGHT_DATABASE_URL` to its connection string. For example, in PowerShell:

```powershell
docker run --detach --name rotundaspreita-e2e-db --publish 5434:5432 --env POSTGRES_USER=playwright --env POSTGRES_PASSWORD=playwright --env POSTGRES_DB=rotundaspreita_e2e_test postgres:15
$env:PLAYWRIGHT_DATABASE_URL = "postgresql://playwright:playwright@127.0.0.1:5434/rotundaspreita_e2e_test"
npx playwright install chromium
npm run test:e2e
```

Remove the temporary database container when you no longer need it:

```powershell
docker rm --force rotundaspreita-e2e-db
```

The test run pushes the Prisma schema and seeds only its fixed test user/study records in that database. It starts its own Next.js server with a test-only JWT secret and does not reuse an existing server. Visual baselines are platform-specific, so the pull-request workflow uses Windows Chromium, matching the committed baselines. To intentionally approve a visual change, run `npm run test:e2e:update` on Windows, review the changed snapshots, and commit them with the UI change. The GitHub Actions end-to-end workflow runs this suite for pull requests.
