import { defineNitroConfig } from "nitropack/config";

export default defineNitroConfig({
  imports: {
    dirs: ["./utils/*", "./templates/*"],
  },
  handlers: [{ handler: "file_server/index.js", route: "/**" }],
  storage: {
    site: {
      driver: "fs",
      base: "site",
    },
  },
  runtimeConfig: {
    AUTH_PASSWORD: process.env.AUTH_PASSWORD || 'password',
    AUTH_USERNAME: process.env.AUTH_USERNAME || 'admin',
  },
});
