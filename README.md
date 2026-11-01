# VOLT FITNESS CLUB — Production Web Application

VOLT Fitness Club is a production-ready, client-deliverable Gym & Fitness Center web application engineered for premium athletic institutions serving customers in India and internationally.

---

## 1. Visual Identity & Brand System

- **Brand Name**: VOLT FITNESS CLUB
- **Logo**: Custom vector SVG crest pairing a high-voltage athletic thunderbolt with an interlocking barbell shield, accompanied by clean modern wordmark and submark typography.
- **Color Palette**:
  - Deep Charcoal: `#101114` (Primary canvas & dark backgrounds)
  - Graphite: `#1C1F24` (Cards, surfaces, secondary layers)
  - Electric Lime: `#C7FF3D` (Primary athletic accent & calls to action)
  - Vibrant Orange: `#FF6B35` (High-intensity conditioning highlights & badges)
  - Clean White: `#FFFFFF` (Headings & high-contrast labels)
  - Cool Gray: `#A7ADB7` (Secondary explanatory copy & metadata)
  - Off-White: `#F5F6F2` (Light forms & comparison highlights)
- **Typography**: Google Fonts *Outfit* (impactful athletic display headings) paired with *Plus Jakarta Sans* (readable body) and *JetBrains Mono* (tabular figures, telemetry, & pricing).

---

## 2. Mandatory Header Navigation Contract (One Horizontal Line)

The desktop navigation strictly conforms to Section 2 of the project brief:

- **Single Line Layout**:
  `[VOLT LOGO]  Home  About Us  Facilities  Classes  Personal Training  Memberships  Trainers  Contact  [Join Now]`
- **CSS Implementation**:
  - `display: flex`, `align-items: center`, `flex-wrap: nowrap`
  - Every individual navigation link is marked with `whitespace-nowrap shrink-0`
  - Labels such as "About Us", "Personal Training", and "Memberships" are guaranteed to never break or wrap into multiple lines.
- **Responsive Switch**:
  - At viewports below `xl` (1200px), navigation switches cleanly to an accessible slide-out mobile drawer, preventing any layout collisions or awkward multi-line wrapping.
  - Tested across 1280px, 1366px, 1440px, and 1920px viewports without horizontal overflow.

---

## 3. Implemented Routes & Page Architecture

1. **Home (`/`)**: Dynamic editorial hero, location picker (Bengaluru, Mumbai, Gurugram, Dubai), KPI statistics strip, facilities preview, popular classes, membership tier highlights, beginner onboarding pathway, authentic testimonials (demo marked), branch hours, interactive map view, and newsletter.
2. **About Us (`/about`)**: Brand story, 4 pillars of athletic longevity, competition equipment standards (Eleiko, Hammer Strength, Woodway), and certified coaching standards.
3. **Facilities (`/facilities`)**: Comprehensive zones: Olympic Platforms, Functional Sprint Turf, Biometric Cardio Lab, Contrast Recovery Sauna/Plunge Suite, and Executive Locker Rooms with air exchange and parking details.
4. **Classes & Group Training (`/classes`)**: Category & intensity filters, class cards with calorie expenditure estimates, detailed overview modal, and instant slot reservation workflow.
5. **Personal Training (`/personal-training`)**: Goal-specific coaching tracks, Foundation / Accelerator / Athlete packages, and interactive coaching consultation scheduler.
6. **Trainers Directory (`/trainers`)**: Searchable roster by coach name and specialty (Powerlifting, HIIT, Mobility, Yoga), bios, credentials, and booking actions.
7. **Trainer Profile Detail (`/trainers/:slug`)**: In-depth coach biography, certifications, philosophy, weekly studio schedule, and 1-on-1 appointment modal.
8. **Membership Plans (`/membership`)**: STARTER (₹999/mo), FIT (₹1,999/mo), ELITE (₹3,499/mo), and ANNUAL (₹19,999/yr). Features comparison matrix, 20% annual discount toggle, and direct checkout linking.
9. **Free Trial Pass (`/free-trial`)**: Conversion funnel with branch selection, date/time slot picker, fitness goal, and instant digital VIP Pass generator with pass ID (`VOLT-PASS-XXXX`) and QR code simulator.
10. **Live Schedule (`/schedule`)**: Day-of-week interactive timetable (Monday–Sunday), format & trainer filters, seat capacity tracking, waitlist joining, and duplicate booking prevention.
11. **Contact & Locations (`/contact`)**: Multi-branch directory, operating hours, phone/email, emergency trauma protocol notes, directions link, and validated concierge message form.
12. **Customer Auth (`/login`, `/register`, `/forgot-password`)**: Session management, quick-fill demo buttons for Aryan Verma (Member) and Kavita Roy (Staff Admin), and password recovery flow.
13. **Customer Dashboard (`/account`)**: Active membership status, renewal countdown, booked upcoming classes with cancel option, billing history with printable GST tax invoices, and personal lifting records (PRs).
14. **Checkout & Payments (`/checkout`)**: Plan selection, 18% GST calculation, discount promo codes (`VOLTSTART` for 20% off, `EARLYBIRD` for ₹500 off), Razorpay UPI / Stripe Card sandbox simulator, and order activation.
15. **Payment Confirmation (`/payment/success`, `/payment/cancelled`)**: Official tax receipt breakdown and membership status confirmation.
16. **Fitness Resources & Blog (`/fitness-resources`, `/fitness-resources/:slug`)**: Educational articles on progressive overload, Zone 2 vs HIIT, and sauna recovery protocols with medical disclaimer.
17. **FAQ (`/faq`)**: Searchable accordion categorized by memberships, trial passes, facilities, personal training, and cancellation rules.
18. **Admin Dashboard (`/admin`)**: Restricted staff command center with real-time KPI metrics, plan price editor, schedule capacity manager, trial lead tracker, and timestamped audit log.
19. **Legal Policies (`/privacy-policy`, `/terms-and-conditions`, `/membership-terms`, `/cancellation-policy`, `/refund-policy`, `/cookie-policy`)**: DPDP-compliant fitness privacy notice, 7-day refund guarantee terms, and cancellation policies.

---

## 4. Deploying to Netlify

This website is fully configured and ready for 1-click deployment on **Netlify**. Both `netlify.toml` and `public/_redirects` are included to handle client-side routing, asset caching, and security headers automatically.

### Option A: Deploy via GitHub (Recommended)
1. Push this repository to your GitHub account (or GitLab/Bitbucket).
2. Go to **[Netlify Dashboard](https://app.netlify.com/)** and click **"Add new site" > "Import an existing project"**.
3. Choose **GitHub** and select this repository.
4. Netlify will automatically detect the settings from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** `20`
5. Click **"Deploy site"**. Your site will be live on a secure `*.netlify.app` domain with free SSL in less than a minute! Any future commits to your `main` branch will automatically trigger instant deploys.

### Option B: Deploy via Netlify Drag & Drop (No Git required)
1. In your local terminal, build the project:
   ```bash
   npm run build
   ```
2. Go to **[app.netlify.com/drop](https://app.netlify.com/drop)**.
3. Drag and drop the generated `dist/` folder directly into the Netlify Drop browser window.
4. Your website will be deployed immediately with a live URL!

### Option C: Deploy via Netlify CLI
1. Install Netlify CLI globally:
   ```bash
   npm install -g netlify-cli
   ```
2. Log in and deploy:
   ```bash
   netlify login
   npm run build
   netlify deploy --prod --dir=dist
   ```

---

## 5. Local Development & Scripts

### Quick Start
```bash
# Install dependencies
npm install

# Start local development server (port 3000)
npm run dev

# Run TypeScript compilation check
npm run lint

# Build production bundle for Netlify
npm run build
```

---

## 5. External Provider Setup & Configuration

To transition from the current client-persistent architecture to live production services:

1. **Database (Supabase / PostgreSQL)**:
   - Run the provided DDL script in `src/db/schema.sql` inside your Supabase SQL editor.
   - Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in your environment.
2. **Payments (Razorpay / Stripe)**:
   - Obtain Razorpay API keys from dashboard.razorpay.com and configure webhook endpoint `/api/webhooks/razorpay` to listen for `payment.captured` events.
   - For international card processing, obtain Stripe keys from dashboard.stripe.com.
3. **Transactional Notifications (Resend / SendGrid)**:
   - Configure `RESEND_API_KEY` to automate immediate email dispatch of booking confirmation QR codes and official GST PDF invoices.
