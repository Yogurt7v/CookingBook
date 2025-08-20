import bcrypt from 'bcryptjs';

export default async function saltAndHashPassword(password: string) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}
