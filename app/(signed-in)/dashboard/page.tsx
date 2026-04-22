"use client"

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { useUser } from "@clerk/nextjs"
import { ExitIcon, VideoIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import { Channel, ChannelHeader, MessageInput, MessageList, Thread, useChatContext, Window } from "stream-chat-react"


function DashboardPage() {
    const { user } = useUser()
    const router = useRouter()
    const { channel, setActiveChannel } = useChatContext()
    const { setOpen } = useSidebar()

    const handleCall = () => {
        console.log("Calling...")
        if (!channel) return
        router.push(`/dashboard/video-call/${channel.id}`)
        setOpen(false)
    }

    const handleLeaveChat = async () => {
        console.log("Leaving chat...")
        if (!channel || !user?.id) {
            console.log("No channel or user id")
            return
        }

        const confirm = window.confirm("Are you sure you want to leave the chat?")
        if (!confirm) return

        try {
            await channel.removeMembers([user.id])
            setActiveChannel(undefined)

            router.push("/dashboard")
        } catch (error) {
            console.log("Error leaving chat:", error)
        }
    }

    return (
        <main className="flex-1 flex flex-col min-h-0 bg-background">
            {channel ? (
                <Channel>
                    <Window>
                        {/* Custom Header */}
                        <div className="flex items-center justify-between border-b px-4 py-2 bg-background">
                            {channel.data?.member_count === 1 ? (
                                <ChannelHeader title="Everyone else has left this chat" />
                            ) : (
                                <ChannelHeader />
                            )}
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" onClick={handleCall}>
                                    <VideoIcon className="w-4 h-4 mr-2" />
                                    Video Call
                                </Button>
                                <Button variant="outline" size="sm" onClick={handleLeaveChat}>
                                    <ExitIcon className="w-4 h-4 mr-2" />
                                    Leave Chat
                                </Button>
                            </div>
                        </div>
                        {/* Main Chat Area */}
                        <MessageList />
                        <MessageInput />
                    </Window>
                    <Thread />
                </Channel>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <h2 className="text-2xl font-semibold mb-2">No chat selected</h2>
                    <p className="text-muted-foreground">Select a chat from the sidebar or start a new conversation</p>
                </div>
            )}
        </main>
    )
}

export default DashboardPage