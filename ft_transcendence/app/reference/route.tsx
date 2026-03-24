import { ApiReference } from "@scalar/nextjs-api-reference";

const config = {
  url: "/api/openapi.json",
  theme: "default" as const,
  pageTitle: "Beentra API Reference",
};

export const GET = ApiReference(config);
