import bcrypt from "bcryptjs";

export const encryptPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const comparePassword = (
  inputPassword: string,
  currentPassword: string
) => {
  return bcrypt.compareSync(inputPassword, currentPassword);
};
