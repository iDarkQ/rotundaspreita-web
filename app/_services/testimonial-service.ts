"use server";

import { createTestimonial, fetchTestimonial } from "@/app/_lib/queries/testimonial";
import { verifySession, verifySessionSubscription } from "@/app/_services/user-service";

export const writeTestimonial = async (message: string, anonymous: boolean = false) => {
    const session = await verifySessionSubscription();

    if (!session) return;

    const testimonial = await fetchTestimonial({ userId: session.id })

    // Allowing only one testimonial per user
    if (testimonial) return;

    return await createTestimonial({
        message,
        anonymous,
        users: {
            connect: { id: session.id },
        }
    })
}

export const fetchUserTestimonial = async () => {
    const session = await verifySession();

    const testimonial = await fetchTestimonial({ userId: session.id })

    return testimonial;
}