import { describe, it, expect } from "vitest";
import { eventSchema, eventSchemaServer } from "./validation";

const tomorrow = new Date(Date.now() + 86_400_000).toISOString();

const validBase = {
  title: "Hive Hackathon",
  date: tomorrow,
  timeFrom: "09:00",
  timeTo: "17:00",
  location: "Hive Helsinki",
  organizer: "Staff",
  type: "Student" as const,
};

// ---------------------------------------------------------------------------
// eventSchema (frontend — image is a FileList)
// ---------------------------------------------------------------------------

describe("eventSchema (frontend)", () => {
  it("passes with valid data and no image", () => {
    expect(eventSchema.safeParse(validBase).success).toBe(true);
  });

  it("fails when title is too short", () => {
    const result = eventSchema.safeParse({ ...validBase, title: "X" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Title too short");
  });

  it("fails when title is too long", () => {
    const result = eventSchema.safeParse({ ...validBase, title: "A".repeat(31) });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Title too long");
  });

  it("fails when date is in the past", () => {
    const result = eventSchema.safeParse({ ...validBase, date: "2020-01-01" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Date cannot be in the past");
  });

  it("fails when timeFrom has invalid format", () => {
    const result = eventSchema.safeParse({ ...validBase, timeFrom: "9:00" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Invalid time format");
  });

  it("fails when timeTo is before timeFrom", () => {
    const result = eventSchema.safeParse({ ...validBase, timeFrom: "17:00", timeTo: "09:00" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("End time must be after start time");
  });

  it("fails when type is not a valid enum value", () => {
    const result = eventSchema.safeParse({ ...validBase, type: "VIP" });
    expect(result.success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// eventSchemaServer (backend — image is a string URL)
// ---------------------------------------------------------------------------

describe("eventSchemaServer (backend)", () => {
  it("passes with valid data and no image", () => {
    expect(eventSchemaServer.safeParse(validBase).success).toBe(true);
  });

  it("passes with a string image URL", () => {
    const result = eventSchemaServer.safeParse({ ...validBase, image: "https://example.com/img.png" });
    expect(result.success).toBe(true);
  });

  it("fails when image is not a string (e.g. a FileList-like object)", () => {
    const result = eventSchemaServer.safeParse({ ...validBase, image: { length: 1, 0: { size: 500 } } });
    expect(result.success).toBe(false);
  });

  it("fails when date is in the past", () => {
    const result = eventSchemaServer.safeParse({ ...validBase, date: "2020-01-01" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Date cannot be in the past");
  });

  it("fails when timeTo is before timeFrom", () => {
    const result = eventSchemaServer.safeParse({ ...validBase, timeFrom: "17:00", timeTo: "09:00" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("End time must be after start time");
  });

  it("fails when location is too short", () => {
    const result = eventSchemaServer.safeParse({ ...validBase, location: "X" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Location too short");
  });

  it("fails when organizer is too short", () => {
    const result = eventSchemaServer.safeParse({ ...validBase, organizer: "X" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Organizer too short");
  });
});
