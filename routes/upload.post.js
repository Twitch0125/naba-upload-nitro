import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import { createGunzip } from "node:zlib";
import { extract as tarExtract } from "tar-stream";

export default defineEventHandler(async (event) => {
  try {
    const body = await readMultipartFormData(event);
    if (!body?.length) {
      return createError({
        statusCode: 400,
        message: "No files were uploaded",
      });
    }
    const file = body[0];
    await extractSite(file.data);
    return Upload({ message: "Success!" });
  } catch (err) {
    throw err;
  }
});

async function extractSite(tarBuffer) {
  const source = Readable.from(tarBuffer);
  const gunzip = createGunzip();
  const extract = tarExtract();
  extract.on("entry", async (header, stream, next) => {
    stream.on("end", () => {
      next();
    });
    const filePath = header.name.replace("news/html", "");
    await useStorage().setItemRaw(`site/${filePath}`, stream);
    stream.end();
  });
  try {
    await pipeline(source, gunzip, extract);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
