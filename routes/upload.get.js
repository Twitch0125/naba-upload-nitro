/** @param {import('h3').H3Event} event */
function createUnauthorizedResponse(event) {
  setResponseHeaders(event, {
    "WWW-Authenticate": 'Basic realm="upload", charset="UTF-8"',
  });
  setResponseStatus(event, 401);
  return send(event);
}

export default defineEventHandler(async (event) => {
  const authorization = getHeader(event, "Authorization");
  if (!authorization) {
    return createUnauthorizedResponse(event);
  }
  const credentials = authorization.split("Basic ")[1];
  if (!credentials) {
    return createUnauthorizedResponse(event);
  }
  let password;
  try {
    const [_, data] = atob(credentials).split(":");
    password = data;
  } catch {
    setResponseStatus(event, 400);
    return await send(event);
  }
  if (password !== useRuntimeConfig().AUTH_PASSWORD) {
    return createUnauthorizedResponse(event);
  }
  return Upload();
});
