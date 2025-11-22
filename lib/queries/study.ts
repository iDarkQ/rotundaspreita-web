"use server";

import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";

export const createStudyQuery = async (data: Prisma.StudyCreateInput) =>
    prisma.study.create({ data })

export const updateStudyQuery = async (
    where: Prisma.StudyWhereUniqueInput,
    data: Prisma.StudyUpdateInput
) =>
    prisma.study.update({ where, data });

export const fetchStudiesQuery = async (where?: Prisma.StudyWhereInput) => prisma.study.findMany({ where });

export const fetchFirstStudyQuery = async (where?: Prisma.StudyWhereInput) => prisma.study.findFirst({ where });

export const fetchStudyQuery = async (where: Prisma.StudyWhereUniqueInput) => prisma.study.findUnique({ where }); export const fetchStudyWithQuestionsQuery = async (
    where: Prisma.StudyWhereUniqueInput,
    whereQuestion?: Prisma.QuestionWhereInput,
) => {
    return prisma.study.findUnique({
        where,
        include: {
            questions: whereQuestion
                ? { where: whereQuestion }
                : true,
        },
    });
};