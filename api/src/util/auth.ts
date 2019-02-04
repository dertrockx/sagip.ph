import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'sagipph';

export const generateToken = ({ maxAge = 3600 * 24, data }) => jwt.sign(
  { data },
  JWT_SECRET,
  {
    expiresIn: maxAge,
    algorithm: 'HS256'
  }
);

export const verifyToken = token => new Promise((resolve, reject) => {
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) return reject(err);

    return resolve(payload);
  });
});
