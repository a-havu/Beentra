// lib/openapi.ts
export const openApiSpec = {
  openapi: "3.1.0",
  info: {
    title: "Beentra Public API",
    version: "1.0.0",
  },
  servers: [{ url: `${process.env.NEXT_PUBLIC_URL}/api` }],
  paths: {
    "/events": {
      get: {
        operationId: "getEvents",
        summary: "List all events",
        description: "Returns all upcoming events ordered by date.",
        security: [{ ApiKeyAuth: [] }],
        responses: {
          "200": {
            description: "List of events",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/EventResponse" },
                },
              },
            },
          },
          "401": { description: "Invalid or missing API key" },
          "429": { description: "Rate limit exceeded" },
          "500": { description: "Internal server error" },
        },
      },
      post: {
        operationId: "createEvent",
        summary: "Create a new event",
        security: [{ ApiKeyAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/EventInput" },
            },
          },
        },
        responses: {
          "200": {
            description: "Created event",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/EventResponse" },
              },
            },
          },
          "400": { description: "Invalid input" },
          "401": { description: "Invalid or missing API key" },
          "429": { description: "Rate limit exceeded" },
          "500": { description: "Internal server error" },
        },
      },
    },

    "/events/{id}": {
      // ✅ fixed, was nested inside /events
      get: {
        operationId: "getEventById",
        summary: "Get a single event",
        security: [{ ApiKeyAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "The event ID",
          },
        ],
        responses: {
          "200": {
            description: "Event found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/EventResponse" },
              },
            },
          },
          "404": { description: "Event not found" },
          "429": { description: "Rate limit exceeded" },
          "500": { description: "Internal server error" },
        },
      },

      put: {
        operationId: "updateEvent",
        summary: "Update an event",
        description: "Only the event creator or an admin can update it.",
        security: [{ ApiKeyAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/EventInput" },
            },
          },
        },
        responses: {
          "200": {
            description: "Updated event",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/EventResponse" },
              },
            },
          },
          "400": { description: "Invalid input" },
          "401": { description: "Unauthorized — session required" },
          "403": { description: "Forbidden — not the creator or admin" },
          "404": { description: "Event not found" },
          "429": { description: "Rate limit exceeded" },
          "500": { description: "Internal server error" },
        },
      },

      delete: {
        operationId: "deleteEvent",
        summary: "Delete an event",
        description: "Only the event creator or an admin can delete it.",
        security: [{ ApiKeyAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Deleted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "event deleted successfully",
                    },
                  },
                },
              },
            },
          },
          "401": { description: "Unauthorized — session required" },
          "403": { description: "Forbidden — not the creator or admin" },
          "404": { description: "Event not found" },
          "429": { description: "Rate limit exceeded" },
          "500": { description: "Internal server error" },
        },
      },
    },
  },

  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: "apiKey",
        in: "header",
        name: "x-api-key",
      },
    },
    schemas: {
      EventInput: {
        type: "object",
        required: [
          "title",
          "type",
          "date",
          "timeFrom",
          "timeTo",
          "location",
          "organizer",
        ],
        properties: {
          title: { type: "string", example: "Tech Meetup Helsinki" },
          date: {
            type: "string",
            format: "date-time",
            example: "2026-06-01T00:00:00.000Z",
          },
          timeFrom: {
            type: "string",
            example: "18:00",
            description: "HH:MM format",
          },
          timeTo: {
            type: "string",
            example: "20:00",
            description: "HH:MM format",
          },
          location: { type: "string", example: "Helsinki, Finland" },
          organizer: { type: "string", example: "Beentra" },
          image: { type: "string", format: "uri", nullable: true },
          description: { type: "string", nullable: true },
          maxSpots: { type: "integer", example: 50, nullable: true },
          type: { type: "string", example: "External" },
        },
      },
      EventResponse: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          type: { type: "string" },
          date: { type: "string", format: "date-time" },
          timeFrom: { type: "string", format: "date-time" },
          timeTo: { type: "string", format: "date-time" },
          location: { type: "string" },
          organizer: { type: "string" },
          image: { type: "string", nullable: true },
          description: { type: "string" },
          maxSpots: { type: "integer" },
          creatorId: { type: "string", nullable: true },
          subscriberCount: { type: "integer" },
          isSubscribed: { type: "boolean" },
        },
      },
    },
  },
};
