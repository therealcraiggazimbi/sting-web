import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  stores: defineTable({
    name: v.string(),
    city: v.string(),
    country: v.string(),
    active: v.boolean(),
  }).index("by_active", ["active"]),
});
