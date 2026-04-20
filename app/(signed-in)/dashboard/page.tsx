"use client"

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { useUser } from "@clerk/nextjs"
import { ExitIcon, VideoIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/router"
import { Channel, ChannelHeader, MessageInput, MessageList, Thread, useChatContext, Window } from "stream-chat-react"


function DashboardPage() {
    const { user } = useUser()
    const router = useRouter
    const { channel, setActiveChannel } = useChatContext()
    const { setOpen } = useSidebar()

    const handleCall = () => {
        console.log("Calling...")
    }

    const handleLeaveChat = () => {
        console.log("Leaving chat...")
    }

    return (
        <main className="mt-8">
            {channel ? (
                <Channel>
                    <Window>
                        <div className="">
                            {channel.data?.member_count === 1 ? (
                                <ChannelHeader title="Everyone else has left this chat" />
                            ) : (
                                <ChannelHeader />
                            )}
                            <div className="flex">
                                <Button variant="outline" onClick={handleCall}>
                                    <VideoIcon className="w-4 h-4" />
                                    Video Call
                                </Button>
                                <Button variant="outline" onClick={handleLeaveChat} className="">
                                    <ExitIcon className="w-4 h-4" />
                                    Leave Chat
                                </Button>
                            </div>
                            <MessageList />
                            <div className="sticky bottom-0 w-full">
                                <MessageInput />
                            </div>
                        </div>
                    </Window>
                    <Thread />
                </Channel>
            ) : (
                <div className="">
                    <h2 className="">No chat selected</h2>
                    <p className="">Select a chat from the sidebar or start a new conversation</p>
                </div>
            )}
        </main>
    )
}

export default DashboardPage