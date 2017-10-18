import bcrypt from 'bcryptjs';

export default function generatePasswordHash(password) {
  return bcrypt.genSalt(10).then(salt => {
    return bcrypt.hash(password, salt);
  });
}