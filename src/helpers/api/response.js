function authenticationRequiredHandler(res) {
  res.statusCode = 401;

  return res.end(
    JSON.stringify({
      code: 'authentication_required',
      message: 'This request requires an authenticated account.',
    })
  );
}

// eslint-disable-next-line import/prefer-default-export
export { authenticationRequiredHandler };
