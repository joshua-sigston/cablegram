import { StreamChat } from "stream-chat"

// Ensure we have our public API key available to the browser
if (!process.env.NEXT_PUBLIC_STREAM_API_KEY) {
    throw new Error("Missing Stream API key")
}

// Initialize the Stream Chat frontend client. 
// This client manages websockets, UI state, and rendering stream components without exposing secrets.
const streamClient = StreamChat.getInstance(
    process.env.NEXT_PUBLIC_STREAM_API_KEY,
)

export default streamClient