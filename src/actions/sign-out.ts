'use server';
import { signOut } from '@/auth/auth';

export default async function signOutFunc() {
  try {
    const result = await signOut({
      redirect: false,
    });
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
