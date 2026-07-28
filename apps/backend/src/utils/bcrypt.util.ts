import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export const bcryptCompare = async (myPass: string, hash: string) => {
  console.log(myPass, hash)
  const result = await bcrypt.compare(myPass, hash);
  console.log(result);
  return result;
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};
