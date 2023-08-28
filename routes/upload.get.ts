/** @param {import('h3').H3Event} event */
function createUnauthorizedResponse(event) {
  setResponseHeaders(event, {
    "WWW-Authenticate": 'Basic realm="upload", charset="UTF-8"',
  });
  setResponseStatus(event, 401);
  return send(event);
}

export default defineEventHandler(async (event) => {
  const auth = getRequestHeader(event, "Authorization");
  if (!auth) {
    return createUnauthorizedResponse(event);
  }
  const [type, token] = auth.split(" ");
  if (type !== "Basic") return createUnauthorizedResponse(event);
  const config = useRuntimeConfig(event);
  if (atob(token) !== `${config.AUTH_USERNAME}:${config.AUTH_PASSWORD}`)
    return createUnauthorizedResponse(event);

  return Upload();
});
