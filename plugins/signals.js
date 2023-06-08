export default defineNitroPlugin((app) => {
  process.addListener("SIGINT", () => process.exit());
  process.addListener("SIGTERM", () => process.exit());
  process.addListener("SIGABRT", () => process.exit());
});
