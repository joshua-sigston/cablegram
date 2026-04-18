"use server" // Indicates this module will only run on the secure backend server

import { serverClient } from "@/lib/streamServer"

/**
 * A Next.js Server Action that generates a JWT authentication token for a user.
 * This is incredibly important for security: Since the token generation requires 
 * the STREAM_API_SECRET_KEY, it MUST happen on the server. The client calls this 
 * securely to get permission to connect to Stream.
 */
export async function createToken(userId: string) {
    const token = serverClient.createToken(userId)
    console.log("creating token for user", userId)
    return token
}