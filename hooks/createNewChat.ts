import streamClient from "@/lib/stream"

// Define the arguments required to create a new chat
interface CreateNewChatProps {
    members: string[], // An array of the Clerk User IDs involved in the chat
    createdBy: string, // The ID of the user initiating the chat
    groupName?: string, // An optional custom name if this is a group chat
}

/**
 * A custom React hook that provides a function to create a new Stream Chat channel.
 * It automatically handles both 1-on-1 direct messages and multi-user group chats.
 */
export const useCreateNewChat = () => {
    
    // The main function returned by the hook
    const createNewChat = async ({ members, createdBy, groupName }: CreateNewChatProps) => {
        // Any chat with more than 2 members is treated as a group chat
        const isGroupChat = members.length > 2

        // If it's a 1-on-1 chat, we first want to check if a chat between these exact members already exists to avoid making duplicates.
        if (!isGroupChat) {
            // Query the Stream database for any existing "messaging" channels with exactly these members
            const existingChannel = await streamClient.queryChannels(
                {
                    type: "messaging",
                    members: { $eq: members } // $eq ensures exact match
                },
                { created_at: -1 }, // Sort by most recently created
                { limit: 1 } // We only need the first result
            )

            // If we found a potential match, verify its membership exactly
            if (existingChannel.length > 0) {
                const channel = existingChannel[0]
                const channelMembers = Object.keys(channel.state.members)

                // Confirm that both the requested members and the existing members strictly equal 2, 
                // and that all requested members are inside the existing channel.
                if (
                    channelMembers.length === 2 && 
                    members.length === 2 && 
                    members.every((member) => channelMembers.includes(member))
                ) {
                    console.log("Existing 1-1 chat found!")
                    // Instead of creating a new duplicate channel, we just return the existing one!
                    return channel
                }
            }
        }

        // If no existing chat was found, or if it's a group chat, we generate a unique ID
        // Note: Using Date.now() + a random string is a standard way to get a universally unique channel ID on the client
        const channelId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`

        try {
            // Prepare the data payload for Stream.
            const channelData: {
                members: string[],
                created_by_id: string,
                name?: string
            } = {
                members,
                created_by_id: createdBy
            }
            
            // If it's a group chat, assign it the provided name or a fallback default name.
            if (isGroupChat) {
                channelData.name = groupName || `Group chat (${members.length} members)`
            }

            // Initialize the channel locally on the client.
            // Stream uses different built-in types: "team" (group chats with extra features) or "messaging" (standard DMs).
            const channel = streamClient.channel(
                isGroupChat ? "team" : "messaging",
                channelId,
                channelData
            )

            // Return the un-watched/un-created channel instance so the UI can mount it 
            // (or call `await channel.watch()` later to actually create it on the server!)
            return channel
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    return createNewChat
}