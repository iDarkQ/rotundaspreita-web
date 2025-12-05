"use client";

import { initializeApp } from "firebase/app";
import { EventNameString, EventParams, getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app);

export type CustomEventName = EventNameString | (string & {});

export const logWebEvent = (eventName: CustomEventName, eventParams?: {
    coupon?: EventParams['coupon'];
    currency?: EventParams['currency'];
    items?: EventParams['items'];
    payment_type?: EventParams['payment_type'];
    value?: EventParams['value'];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}) => {
    logEvent(analytics, eventName, eventParams);
}