import { pipeline } from "node:stream/promises";
import { extract as tarExtract } from "tar-stream";
import { Readable } from "node:stream";
export default defineEventHandler(async (event) => {
  try {
    const request = toWebRequest(event);
    const data = await request.formData();
    const file = data.get("file") as File;
    await extractSite(file.stream());
    return Upload({ message: "Upload successful!" });
  } catch (err) {
    throw err;
  }
});

async function extractSite(fileStream: ReadableStream) {
  const source = fileStream.pipeThrough(new DecompressionStream("gzip"));
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
    await pipeline(Readable.fromWeb(source), extract);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
