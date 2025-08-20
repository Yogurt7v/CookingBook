'use server';
import saltAndHashPassword from '@/utils/password';
import prisma from '@/utils/prisma';

interface User {
  email: string;
  password: string;
  confirmPassword: string;
}

export default async function registerUser(inputData: User) {
  const { email, password, confirmPassword } = inputData;

  if (password !== confirmPassword) {
    throw new Error('Passwords do not match');
  }

  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }

  try {
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const saltedPassword = await saltAndHashPassword(password);
    const user = await prisma.user.create({
      data: {
        email: email,
        password: saltedPassword,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
  }
}
