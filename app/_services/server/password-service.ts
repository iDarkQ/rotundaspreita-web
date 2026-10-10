"use server";

import bcrypt from "bcryptjs";

const PASSWORD_SALT_ROUNDS = 12;

export const serverHashPassword = async (password: string) =>
    bcrypt.hash(password, PASSWORD_SALT_ROUNDS);

export const serverVerifyPassword = async (
    password: string,
    passwordHash: string,
) => bcrypt.compare(password, passwordHash);
