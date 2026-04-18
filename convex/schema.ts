import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

// This file defines the structure of our backend database using Convex
export default defineSchema({
    // Define the 'users' table and its expected field types
    users: defineTable({
        userId: v.string(), // The unique Clerk user ID
        name: v.string(),
        email: v.string(),
        imageUrl: v.string()
    })
        // Create indexes to allow for extremely fast lookups instead of scanning the whole database
        .index("by_userId", ["userId"])
        .index("by_email", ["email"])
})