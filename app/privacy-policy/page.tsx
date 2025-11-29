import { Markdown } from "@/app/_components/markdown";
import { Section } from "@/app/_components/section";
import { Text } from "@/app/_components/text";

export default async function PrivacyPolicy() {
  return (
    <Section className="*:w-full!">
      <Text as="h1" center>Privacy Policy</Text>
      <Markdown>{markdown}</Markdown>
    </Section>
  );
}

const markdown = `

Thank you for using ROTUNDASPREITA. This Privacy Policy explains what information we collect, how we use it, who we share it with, how long we keep it, and the choices you have. Please read it carefully. If you have questions or want to exercise your rights, contact us at **rotundaspreita@gmail.com**.

----------

## 1. Controller / Who we are

ROTUNDASPREITA (the “Service”, “we”, “our”, or “us”) operates the website and services under the name **ROTUNDASPREITA**. For the purposes of applicable privacy laws we are the data controller for personal data collected through this website.  
**Contact:** rotundaspreita@gmail.com

----------

## 2. Information we collect

We collect personal information only when you create an account or otherwise provide it voluntarily. We collect **only what is necessary** to provide and improve the Service.

**Account and user-provided data**

-   Email address.
    
-   Account related metadata (account creation date, google account id).
    
-   Subscription details (plan, billing status, purchase date).
    
-   Test data and test results you submit or generate through the Service (used for functionality, analytics, and improvement of the Service).
    

**Automatically collected data**

-   Usage and analytics data (e.g., pages visited, features used, timestamps, device/browser information). This data is collected to analyze and improve the Service.
    
-   Cookies and similar technologies (see “Cookies & Tracking” below).
    

We do **not** sell your personal data.

----------

## 3. How we use your information

We use the information we collect for the following purposes:

-   To provide and operate the Service and maintain your account.
    
-   To process subscriptions, billing, and payment confirmation.
    
-   To store and display test results and related analytics to you.
    
-   To analyze usage and performance for product improvements and internal analytics.
    
-   To communicate with you about your account, changes to the Service, support requests, and transactional messages.
    
-   To prevent fraud, abuse, and to comply with legal obligations.
    

----------

## 4. Subscriptions & refunds

-   Subscription purchases and billing information are used to manage your subscription and access to the Service.
    
-   **Subscriptions are non-refundable.** By purchasing a subscription you agree that we will not provide refunds except as required by law.
    
-   Payment processing is handled by third-party payment processor Stripe. We do not store full payment card details on our servers.
    

----------


## 5. Cookies & tracking

We use cookies and similar technologies to operate the Service and collect usage data. Types of cookies we may use:

-   Essential cookies (required for core functionality).
    
-   Performance/analytics cookies (to understand use and improve the Service).
    
-   Functional cookies (to remember preferences).
    

You can manage or block cookies through your browser settings, but doing so may degrade your experience.

----------


## 6. Security

We take commercially reasonable technical and organizational measures to protect personal data against unauthorized access, alteration, disclosure or destruction. These measures include encryption, access controls, and secure hosting. However, no method of transmission or storage is 100% secure — we cannot guarantee absolute security.

----------


## 8. Your rights

Depending on where you live, you may have certain rights regarding your personal data, including:

-   The right to access the personal data we hold about you.
    
-   The right to correct or update inaccurate personal data.
    
-   The right to request deletion of your personal data.
    
-   The right to object to or restrict certain processing (e.g., direct marketing).
    
-   The right to receive a copy of certain personal data in a portable format.
    
-   The right to withdraw consent where processing is based on consent.
    

To exercise these rights, contact us at **rotundaspreita@gmail.com**. We will verify requests as required and respond within a reasonable time (commonly within 30 days where required by law). We may need to retain certain information as required by law or for legitimate business purposes.

----------

## 9. Children’s privacy

The Service is not directed to children under 13 (or the minimum age in applicable jurisdiction). We do not knowingly collect personal data from children under that age. If you believe we have collected personal data from a child, contact us and we will take steps to delete it.

----------

## 10. Contact us

For questions, privacy requests, or other matters related to this policy, contact:  
**Email:** rotundaspreita@gmail.com
`;