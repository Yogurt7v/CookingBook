'use server';
import prisma from '@/app/utils/prisma';

interface User {
  email: string;
  password: string;
}

export default async function createUser(inputData: User) {
  try {
    const user = await prisma.user.create({
      data: {
        email: inputData.email,
        password: inputData.password,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
  }
}
