"use server";

import prisma from "@/app/_lib/prisma";
import { Prisma } from "@/app/generated/prisma/browser";

export const createTestimonial = async (data: Prisma.TestimonialCreateInput) => prisma.testimonial.create({ data });

export const fetchTestimonial = async (where: Prisma.TestimonialWhereInput) => prisma.testimonial.findFirst({ where });