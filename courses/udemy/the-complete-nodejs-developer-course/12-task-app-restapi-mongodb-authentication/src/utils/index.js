import bcrypt from 'bcrypt';

export const generateHashPassword = (password) => {
	return bcrypt.hash(password, 8);
};
