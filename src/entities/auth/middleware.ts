import { verifyToken, throwError } from '@util';

export const isAuthenticated = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return throwError(
    res,
    null,
    { error: 'Unauthorized action' },
    403
  );

  try {
    const [, token] = authorization.split(' ');
    const user = await verifyToken(token);

    req.user = user;
    next();
  } catch (err) {
    return throwError(res, null, { error: 'Unauthorized action' }, 403);
  }
}
