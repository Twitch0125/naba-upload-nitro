import { extname } from "node:path";
import { contentType } from "mime-types";
import { Readable } from "node:stream";
// import { createReadStream } from "node:fs";
export default eventHandler(async (event) => {
  let path = getRequestURL(event).pathname;
  const fileExt = extname(path);
  setResponseHeader(
    event,
    "Content-Type",
    contentType(fileExt) || "text/plain"
  );
  setResponseHeader(event, "Cache-Control", "max-age=600")
  if (path === "/") {
    return sendRedirect(event, "/index.html");
  }
  const item = await useStorage().getItemRaw(`site${path}`);
  if (!item) {
    return "404 not found";
  }
  return sendStream(event, Readable.from(item));
});
