'use server';

import { signIn } from '@/auth/auth';

export default async function signInWithCredentials(email: string, password: string) {
  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
