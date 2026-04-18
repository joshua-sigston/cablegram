import { query, mutation } from "./_generated/server"
import { v } from "convex/values"

// Query to retrieve a user from our database using their Clerk ID
export const getUserByClerkUserId = query({
    args: { userId: v.string() },
    handler: async (ctx, { userId }) => {
        if (!userId) return null

        return await ctx.db
            .query("users")
            // Use our high-speed index to find the user immediately
            .withIndex("by_userId", (q) => q.eq("userId", userId))
            .first()
    }
})

// Mutation to insert a new user or update an existing one when they log in
export const upsertUserByEmail = mutation({
    args: {
        userId: v.string(),
        name: v.string(),
        email: v.string(),
        imageUrl: v.string()
    },
    handler: async (ctx, { userId, name, email, imageUrl }) => {
        // Check if the user already exists in our database
        const existingUser = await ctx.db
            .query("users")
            .withIndex("by_userId", (q) => q.eq("userId", userId))
            .first()

        // If they exist, update their profile information with the latest data from Clerk
        if (existingUser) {
            await ctx.db.patch(existingUser._id, { name, imageUrl })
            return existingUser._id
        }

        // If they don't exist, create a brand new record for them
        return await ctx.db.insert("users", {
            userId,
            name,
            email,
            imageUrl
        })
    }
})

// Query to search through all users by their name or email address
export const searchUsers = query({
    args: { searchTerm: v.string() },
    handler: async (ctx, { searchTerm }) => {
        if (!searchTerm.trim()) return []

        const normalizedSearch = searchTerm.toLowerCase().trim()

        // Caution: collect() fetches the entire table. In a massive production app, 
        // you would want to use Convex text search capabilities instead.
        const allUsers = await ctx.db.query("users").collect()

        return allUsers
            .filter((user) =>
                user.name.toLowerCase().includes(normalizedSearch) ||
                user.email.toLowerCase().includes(normalizedSearch)
            )
            // Limit the results to 20 to prevent sending massive payloads to the client
            .slice(0, 20)
    }
})