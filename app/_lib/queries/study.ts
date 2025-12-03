"use server";

import { Prisma } from "@/app/generated/prisma/client";
import prisma from "@/app/_lib/prisma";

export const createStudyQuery = async (data: Prisma.StudyCreateInput) =>
  prisma.study.create({ data });

export const updateStudyQuery = async (
  where: Prisma.StudyWhereUniqueInput,
  data: Prisma.StudyUpdateInput,
) => prisma.study.update({ where, data });

export const deleteStudyQuery = async (where: Prisma.StudyWhereUniqueInput) =>
  prisma.study.delete({ where });

export const fetchStudiesQuery = async (where?: Prisma.StudyWhereInput) =>
  prisma.study.findMany({ where });

export const fetchFirstStudyQuery = async (where?: Prisma.StudyWhereInput) =>
  prisma.study.findFirst({ where });

export const fetchStudyQuery = async (where: Prisma.StudyWhereUniqueInput) =>
  prisma.study.findUnique({ where });

export const fetchStudyWithQuestionsQuery = async (
  where: Prisma.StudyWhereInput,
  whereQuestion?: Prisma.QuestionWhereInput,
) =>
  prisma.study.findFirst({
    where,
    include: {
      questions: whereQuestion ? { where: whereQuestion } : true,
    },
  });
