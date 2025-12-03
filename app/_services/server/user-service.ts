"use server";

import { User } from "@/app/generated/prisma/client";
import { findUserQuery, updateUserQuery } from "@/app/_lib/queries/user";
import jwt from "jsonwebtoken";
import axios from "axios";
import { GoogleAccountDto } from "@/app/_lib/dtos/user/google-account,dto";

const secret = process.env.JWT_SECRET;

export const serverFindUserById = async (id: string) => findUserQuery({ id });

export const serverFindUserByEmail = async (email: string) =>
  findUserQuery({ email });

export const serverBeginFreeTest = async (userId: string) =>
  updateUserQuery({ id: userId }, { usedFreeTest: true });

export const serverSignUser = async (user: User) => {
  if (!secret) return;

  return jwt.sign(user, secret);
};

export const serverFetchGoogleAccountInfo = async (token: string) => {
  const req = await axios("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!req.data) return;

  const data = req.data as GoogleAccountDto;

  return data;
};
