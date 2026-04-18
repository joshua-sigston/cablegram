import { StreamChat } from "stream-chat";

// Validate that both our public API key and private Secret Key exist
if (!process.env.NEXT_PUBLIC_STREAM_API_KEY) {
    throw new Error("NEXT_PUBLIC_STREAM_API_KEY is not set")
}

if (!process.env.STREAM_API_SECRET_KEY) {
    throw new Error("STREAM_API_SECRET_KEY is not set")
}

// Initialize the Stream Chat BACKEND client.
// This requires the SECRET KEY, meaning it has admin privileges to create users, channels, and tokens.
// IMPORTANT: This file should only ever be imported in server-side contexts.
export const serverClient = StreamChat.getInstance(
    process.env.NEXT_PUBLIC_STREAM_API_KEY,
    process.env.STREAM_API_SECRET_KEY
)