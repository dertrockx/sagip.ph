const ERROR_CODES = {
  '400': { status: 400, message: 'Bad Request' },
  '401': { status: 401, message: 'Forbidden' },
  '403': { status: 403, message: 'Not authorized' },
  '404': { status: 404, message: 'Not found' },
  '500': { status: 500, message: 'Internal server error' },
};

export const throwError = (res, err, payload?, status = 500): void => {
  payload = payload || ERROR_CODES[status];

  if (err && err.code === 'INVALID_INPUT') {
    res.status(400).json({
      ...ERROR_CODES[400],
      message: 'Invalid input',
      errors: err.errors,
    });
  } else {
    res.status(status).json(payload);
  }
};
