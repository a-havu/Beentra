import { ApiReference } from "@scalar/nextjs-api-reference";

export const GET = ApiReference({
  url: "/api/openapi.json",
  // these go at TOP LEVEL, not inside configuration
  hideModels: true,
  hideSearch: true,
  hideDarkModeToggle: true,
  forceDarkModeState: "light",
  agent: { disabled: true },
  showDeveloperTools: "never",
  theme: "default" as const,
  pageTitle: "Beentra API Reference",
  authentication: {
    preferredSecurityScheme: "ApiKeyAuth",
    securitySchemes: {
      ApiKeyAuth: {
        name: "x-api-key",
        in: "header",
        value: "",
      },
    },
  },
    mcp: {
    name: "Beentra API",
    url: "https://beentra.fi/mcp",
    disabled: true,
  },
    hiddenClients: {
    c: true,
    clojure: true,
    csharp: true,
    dart: true,
    fsharp: true,
    go: true,
    http: true,
    java: true,
    js: true,
    kotlin: true,
    node: true,
    objc: true,
    ocaml: true,
    php: true,
    powershell: true,
    python: true,
    r: true,
    ruby: true,
    rust: true,
    shell: ['httpie', 'wget'], // keep only curl
    swift: true,
  },
  defaultHttpClient: {
    targetKey: "shell",
    clientKey: "curl",
  },
  hideClientButton: true,
});